// src/modules/auth/auth.service.js
const prisma = require("../../config/db");
const resend = require("../../config/mail");
const { generateToken } = require("../../config/jwt");
const { generateOtp } = require("../../utils/otpService");

async function requestOtp(email) {
  const otp = generateOtp();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min expiry
  console.log(`Generated OTP for ${email}: ${otp}`);

  // Save OTP in DB (overwrite existing)
  await prisma.otp.upsert({
    where: { email },
    update: { otp, expiresAt },
    create: { email, otp, expiresAt },
  });
  console.log(`Saved OTP for ${email} in DB`);

  try {
    const sendResult = await resend.emails.send({
      from: "AppAstra <no-reply@opsolve.in>",
      to: email,
      subject: "Your OTP for AppAstra",
      html: `<p>Your OTP is <strong>${otp}</strong>. It expires in 5 minutes.</p>`,
    });
    console.log("Email send result:", sendResult);
  } catch (error) {
    console.error("Failed to send OTP email:", error);
    throw new Error("Failed to send OTP email");
  }
}


async function verifyOtp(email, otp) {
  const record = await prisma.otp.findUnique({ where: { email } });
  if (!record) throw new Error("OTP not found");
  if (record.otp !== otp) throw new Error("Invalid OTP");
  if (record.expiresAt < new Date()) throw new Error("OTP expired");

  // Find or create user
  let user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    user = await prisma.user.create({ data: { email } });
  }

  // Delete used OTP
  await prisma.otp.delete({ where: { email } });

  // Generate JWT token
  return generateToken({ userId: user.id, email: user.email });
}

async function resendOtp(email) {
  // Delete existing OTP first
  await prisma.otp.deleteMany({ where: { email } });
  return requestOtp(email);
}

module.exports = {
  requestOtp,
  verifyOtp,
  resendOtp,
};
