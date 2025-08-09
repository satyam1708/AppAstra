// src/modules/course/course.controller.js
const courseService = require("./course.service");
const { successResponse, errorResponse } = require("../../utils/response");

async function getCourses(req, res) {
  try {
    const courses = await courseService.getAllCourses();
    return res.status(200).json(successResponse("Courses fetched successfully", courses));
  } catch (err) {
    return res.status(500).json(errorResponse(err.message));
  }
}

module.exports = { getCourses };
