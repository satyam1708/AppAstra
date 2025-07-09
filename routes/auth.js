const express = require("express");
const router = express.Router();
const { requestOTP, verifyOTP } = require("../controllers/authController");

router.post("/request-otp", requestOTP);
router.post("/verify-otp", verifyOTP);
router.post("/resend-otp", resendOTP); 

module.exports = router;
