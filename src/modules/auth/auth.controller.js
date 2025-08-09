const authService = require("./auth.service");
const { sendResponse, errorResponse } = require("../../utils/response");

async function requestOtp(req, res) {
  try {
    const { email } = req.body;
    await authService.requestOtp(email);
    return sendResponse(res, 200, "success", "OTP sent to your email");
  } catch (err) {
    return errorResponse(res, 500, err.message);
  }
}

async function verifyOtp(req, res) {
  try {
    const { email, otp } = req.body;
    const token = await authService.verifyOtp(email, otp);
    return sendResponse(res, 200, "success", "OTP verified", { token });
  } catch (err) {
    return errorResponse(res, 400, err.message);
  }
}

async function resendOtp(req, res) {
  try {
    const { email } = req.body;
    await authService.resendOtp(email);
    return sendResponse(res, 200, "success", "OTP resent to your email");
  } catch (err) {
    return errorResponse(res, 500, err.message);
  }
}

module.exports = {
  requestOtp,
  verifyOtp,
  resendOtp,
};
