const express = require("express");
const authRoutes = require("./modules/auth/auth.routes");
const courseRoutes = require("./modules/course/course.routes");
const userRoutes = require("./modules/user/user.routes");
const rateLimiter = require("./middleware/rateLimit.middleware");

const app = express();

app.use(express.json());
app.use(rateLimiter);

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/users", userRoutes);

module.exports = app;
