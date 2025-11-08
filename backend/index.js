require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const { GridFsStorage } = require("multer-gridfs-storage");
const multer = require("multer");
const Grid = require("gridfs-stream");

const app = express();
const PORT = process.env.PORT || 5050;

// ✅ Dynamic CORS setup
const allowedOrigins = [process.env.CLIENT_URL, "http://localhost:3000"];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// ✅ Routes
app.get("/api/test", (req, res) =>
  res.json({ message: "Backend is working!" })
);

// ✅ Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// ==================== 🧩 GRIDFS SETUP ==================== //
const mongoURI = process.env.MONGO_URI;
const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs;
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
  console.log("✅ GridFS initialized and ready");
});

const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return {
      filename: `${Date.now()}-${file.originalname}`,
      bucketName: "uploads", // collection name
    };
  },
});
const upload = multer({ storage });

// ==================== 🧩 GRIDFS ROUTES ==================== //
const Blog = require("./models/Blog");

// Upload blog with image
app.post("/api/blogs", upload.single("image"), async (req, res) => {
  try {
    const { title, content } = req.body;
    const file = req.file;

    const newBlog = new Blog({
      title,
      content,
      imageFileName: file.filename,
    });

    await newBlog.save();
    res.status(201).json({ message: "Blog created", blog: newBlog });
  } catch (err) {
    console.error("Error uploading blog:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Fetch all blogs
app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Fetch image from GridFS
app.get("/api/blogs/image/:filename", async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });

    if (!file || !file.contentType.startsWith("image/")) {
      return res.status(404).json({ error: "Image not found" });
    }

    const readstream = gfs.createReadStream(file.filename);
    res.set("Content-Type", file.contentType);
    readstream.pipe(res);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Delete blog and its image
app.delete("/api/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // Delete image from GridFS if exists
    if (blog.imageFileName) {
      const file = await gfs.files.findOne({ filename: blog.imageFileName });
      if (file) {
        await gfs.db
          .collection("uploads.files")
          .deleteOne({ filename: blog.imageFileName });
        await gfs.db
          .collection("uploads.chunks")
          .deleteMany({ files_id: file._id });
      }
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog and image deleted successfully" });
  } catch (err) {
    console.error("Error deleting blog:", err);
    res.status(500).json({ error: "Server error" });
  }
});
// ========================================================= //

// ✅ Other existing routes (untouched)
app.use("/api/blog", require("./routes/blog"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/media", require("./routes/media"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/youtube", require("./routes/youtube"));
app.use("/api/blogpagecontent", require("./routes/blogPageContent"));
app.use("/api/membership", require("./routes/membership"));
app.use("/api/users", require("./routes/users"));

// ✅ Graceful CORS error handler
app.use((err, req, res, next) => {
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({ error: "CORS policy: Access denied" });
  }
  next(err);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
