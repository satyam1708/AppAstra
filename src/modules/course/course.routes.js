// src/modules/course/course.routes.js
const express = require("express");
const router = express.Router();
const {getCourses} = require("./course.controller");
const authenticate = require("../../middleware/auth.middleware");

router.get("/", authenticate, getCourses);

module.exports = router;
