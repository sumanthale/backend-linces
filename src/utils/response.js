export const sendSuccess = (res, data, message = 'Request successful', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const sendError = (res, message = 'An error occurred', errorCode = 'INTERNAL_ERROR', statusCode = 500, details = null) => {
  const response = {
    success: false,
    message,
    error: errorCode,
  };

  if (details && process.env.NODE_ENV === 'development') {
    response.details = details;
  }

  return res.status(statusCode).json(response);
};

export const sendPaginatedSuccess = (res, data, pagination, message = 'Request successful', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    pagination,
  });
};
