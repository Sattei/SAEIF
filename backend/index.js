require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

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

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

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
