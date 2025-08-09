const express = require("express");
const router = express.Router();
const { requestOtp, verifyOtp, resendOtp } = require("./auth.controller");

router.post("/request-otp", requestOtp);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);

module.exports = router;
