// src/modules/course/course.service.js
const prisma = require("../../config/db");

async function getAllCourses() {
  return await prisma.course.findMany();
}

module.exports = { getAllCourses };
