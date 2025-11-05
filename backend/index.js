require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

const blogRoutes = require("./routes/blog");
const mediaRoutes = require("./routes/media");
const authRoutes = require("./routes/auth");
const youtubeRoutes = require("./routes/youtube");
const blogPageContentRoutes = require("./routes/blogPageContent");
const membershipRoutes = require("./routes/membership");
const userRoutes = require("./routes/users");

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working!" });
});

// MongoDB connection (placeholder URI)

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api/blog", require("./routes/blog"));
app.use("/uploads", express.static(require("path").join(__dirname, "uploads")));
app.use("/api/media", mediaRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/youtube", youtubeRoutes);
app.use("/api/blogpagecontent", blogPageContentRoutes);
app.use("/api/membership", membershipRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
