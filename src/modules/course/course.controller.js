// src/modules/course/course.controller.js
const courseService = require("./course.service");
const { sendResponse, errorResponse } = require("../../utils/response");

async function getCourses(req, res) {
  try {
    const courses = await courseService.getAllCourses();
    return sendResponse(res, 200, "success", "Courses fetched successfully", courses);
  } catch (err) {
    return errorResponse(res, 500, err.message);
  }
}

module.exports = { getCourses };
