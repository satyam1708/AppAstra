require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();
const authRoutes = require("./routes/auth");

// === Middlewares ===
app.use(express.json());
app.use(cors()); // Allow all origins or configure as needed
app.use(helmet()); // Secure HTTP headers

// Rate limiter: max 100 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// === Routes ===
app.use("/api/auth", authRoutes);

// === Health Check ===
app.get("/", (req, res) => {
  res.send("✅ AppAstra Backend is Running");
});

// === Start Server ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

