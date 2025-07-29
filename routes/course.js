const express = require("express");
const router = express.Router();
const { getAllCourses, createCourse } = require("../controllers/courseController");
const { verifyToken } = require("../middleware/authMiddleware");

router.get("/", verifyToken, getAllCourses);         // GET /api/courses
router.post("/", verifyToken, createCourse);         // Optional POST /api/courses

module.exports = router;
