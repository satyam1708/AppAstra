// src/modules/auth/auth.controller.js
const authService = require("./auth.service");
const { successResponse, errorResponse } = require("../../utils/response");

async function requestOtp(req, res) {
  try {
    const { email } = req.body;
    await authService.requestOtp(email);
    return res.status(200).json(successResponse("OTP sent to your email"));
  } catch (err) {
    return res.status(500).json(errorResponse(err.message));
  }
}

async function verifyOtp(req, res) {
  try {
    const { email, otp } = req.body;
    const token = await authService.verifyOtp(email, otp);
    return res.status(200).json(successResponse("OTP verified", { token }));
  } catch (err) {
    return res.status(400).json(errorResponse(err.message));
  }
}

async function resendOtp(req, res) {
  try {
    const { email } = req.body;
    await authService.resendOtp(email);
    return res.status(200).json(successResponse("OTP resent to your email"));
  } catch (err) {
    return res.status(500).json(errorResponse(err.message));
  }
}

module.exports = {
  requestOtp,
  verifyOtp,
  resendOtp,
};
