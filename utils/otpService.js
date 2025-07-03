const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
}

async function sendOTP(email, otp) {
  try {
    const { data, error } = await resend.emails.send({
      from: "AppAstra <no-reply@opsolve.in>",
      to: email,
      subject: "Your OTP for AppAstra",
      html: `<p>Your OTP is: <strong>${otp}</strong></p><p>It is valid for 5 minutes.</p>`,
    });

    if (error) throw error;

    console.log("OTP sent to email:", data);
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Failed to send OTP");
  }
}

module.exports = { generateOTP, sendOTP };
