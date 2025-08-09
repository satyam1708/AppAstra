// src/modules/user/user.controller.js
const userService = require("./user.service");
const { successResponse, errorResponse } = require("../../utils/response");

async function getProfile(req, res) {
  try {
    const user = await userService.getUserById(req.user.userId);
    return res.status(200).json(successResponse("User profile fetched", user));
  } catch (err) {
    return res.status(500).json(errorResponse(err.message));
  }
}

module.exports = { getProfile };
