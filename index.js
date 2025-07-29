require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { sendResponse } = require("./utils/response");
const courseRoutes = require("./routes/course");

const app = express();
app.use("/api/courses", courseRoutes);
const authRoutes = require("./routes/auth");

// === Middlewares ===
app.use(express.json());
app.use(cors());
app.use(helmet());

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
  return sendResponse(res, 200, "success", "✅ AppAstra Backend is Running");
});

// === 404 Handler ===
app.use((req, res) => {
  sendResponse(res, 404, "fail", "Route not found");
});

// === Global Error Handler ===
app.use((err, req, res, next) => {
  console.error(err.stack);
  sendResponse(res, 500, "error", "Something went wrong", {
    error: err.message,
  });
});

// === Start Server ===
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
