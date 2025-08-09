function errorResponse(res, statusCode, message, data = {}) {
    return res.status(statusCode).json({
      status: "fail",
      code: statusCode,
      message,
      data,
    });
  }
  
  function sendResponse(res, statusCode, status, message, data = {}) {
    return res.status(statusCode).json({
      status,
      code: statusCode,
      message,
      data,
    });
  }
  
  module.exports = {
    sendResponse,
    errorResponse,
  };
  