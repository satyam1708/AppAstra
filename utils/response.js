function sendResponse(res, statusCode, status, message, data = null) {
    return res.status(statusCode).json({
      status,
      code: statusCode,
      message,
      data,
    });
  }
  
  module.exports = { sendResponse };
  