const prisma = require("@prisma/client").PrismaClient;
const jwt = require("jsonwebtoken");
const { generateOTP, sendOTP } = require("../utils/otpService");

const db = new prisma();

exports.requestOTP = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required" });

  const otp = generateOTP();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  try {
    await db.oTP.create({ data: { email, otp, expiresAt } });
    await sendOTP(email, otp);

    res.status(200).json({ message: "OTP sent to your email" });
  } catch (err) {
    res.status(500).json({ message: "Failed to generate OTP", error: err.message });
  }
};

exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) return res.status(400).json({ message: "Email and OTP required" });

  const record = await db.oTP.findFirst({
    where: {
      email,
      otp,
      expiresAt: {
        gt: new Date(),
      },
    },
  });

  if (!record) return res.status(401).json({ message: "Invalid or expired OTP" });

  let user = await db.user.findUnique({ where: { email } });
  if (!user) user = await db.user.create({ data: { email } });

  const token = jwt.sign({ userId: user.id, email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  await db.oTP.deleteMany({ where: { email } });

  res.status(200).json({ message: "OTP verified", token });
};
