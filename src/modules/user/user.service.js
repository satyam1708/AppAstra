// src/modules/user/user.service.js
const prisma = require("../../config/db");

async function getUserById(id) {
  return await prisma.user.findUnique({ where: { id } });
}

module.exports = { getUserById };
