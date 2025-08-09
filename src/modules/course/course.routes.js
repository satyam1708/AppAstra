// src/modules/course/course.routes.js
const express = require("express");
const router = express.Router();
const courseController = require("./course.controller");
const authenticate = require("../../middleware/auth.middleware");

router.get("/", authenticate, courseController.getCourses);

module.exports = router;
