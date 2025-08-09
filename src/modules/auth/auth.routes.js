// src/modules/auth/auth.routes.js
const express = require("express");
const router = express.Router();
const authController = require("./auth.controller");

router.post("/request-otp", authController.requestOtp);
router.post("/verify-otp", authController.verifyOtp);
router.post("/resend-otp", authController.resendOtp);

module.exports = router;
