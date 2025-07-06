const jwt = require("jsonwebtoken");
const { sendResponse } = require("../utils/response");

exports.verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return sendResponse(res, 401, "fail", "Access Denied. No token provided");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return sendResponse(res, 400, "fail", "Invalid Token");
  }
};
