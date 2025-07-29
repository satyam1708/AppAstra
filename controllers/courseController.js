const { PrismaClient } = require("@prisma/client");
const { sendResponse } = require("../utils/response");

const db = new PrismaClient();

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await db.course.findMany({
      orderBy: { name: "asc" },
    });
    return sendResponse(res, 200, "success", "Courses fetched successfully", courses);
  } catch (err) {
    return sendResponse(res, 500, "error", "Failed to fetch courses", {
      error: err.message,
    });
  }
};

// Optional: Create a course (admin use only or via seed)
exports.createCourse = async (req, res) => {
  const { name, medium, duration } = req.body;
  if (!name || !medium || !duration) {
    return sendResponse(res, 400, "fail", "All fields are required");
  }

  try {
    const course = await db.course.create({ data: { name, medium, duration } });
    return sendResponse(res, 201, "success", "Course created", course);
  } catch (err) {
    return sendResponse(res, 500, "error", "Failed to create course", {
      error: err.message,
    });
  }
};
