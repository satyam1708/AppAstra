const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const { generateOTP, sendOTP } = require("../utils/otpService");
const { sendResponse } = require("../utils/response");

const db = new PrismaClient();

exports.requestOTP = async (req, res) => {
  const { email } = req.body;
  if (!email) return sendResponse(res, 400, "fail", "Email is required");

  const otp = generateOTP();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  try {
    await db.otp.create({ data: { email, otp, expiresAt } });
    await sendOTP(email, otp);

    return sendResponse(res, 200, "success", "OTP sent to your email");
  } catch (err) {
    return sendResponse(res, 500, "error", "Failed to generate OTP", {
      error: err.message,
    });
  }
};

exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp)
    return sendResponse(res, 400, "fail", "Email and OTP are required");

  try {
    const record = await db.otp.findFirst({
      where: {
        email,
        otp,
        expiresAt: { gt: new Date() },
      },
    });

    if (!record)
      return sendResponse(res, 401, "fail", "Invalid or expired OTP");

    let user = await db.user.findUnique({ where: { email } });
    if (!user) user = await db.user.create({ data: { email } });

    const token = jwt.sign({ userId: user.id, email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    await db.otp.deleteMany({ where: { email } });

    return sendResponse(res, 200, "success", "OTP verified", { token });
  } catch (err) {
    return sendResponse(res, 500, "error", "OTP verification failed", {
      error: err.message,
    });
  }
};
