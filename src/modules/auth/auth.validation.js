// src/modules/auth/auth.validation.js
const Joi = require("joi");

const requestOtpSchema = Joi.object({
  email: Joi.string().email().required(),
});

const verifyOtpSchema = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.string().length(6).required(),
});

module.exports = {
  requestOtpSchema,
  verifyOtpSchema,
};
