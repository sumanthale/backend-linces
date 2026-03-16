import logger from '../utils/logger.js';
import { sendError } from '../utils/response.js';
import { HTTP_STATUS, ERROR_CODES } from '../constants/errorCodes.js';

export const errorHandler = (err, req, res, next) => {
  logger.error('Unhandled error:', err);

  const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_ERROR;
  const message = err.message || 'Internal Server Error';
  const errorCode = err.errorCode || ERROR_CODES.INTERNAL_ERROR;

  sendError(
    res,
    message,
    errorCode,
    statusCode,
    process.env.NODE_ENV === 'development' ? err.stack : null
  );
};

export const notFoundHandler = (req, res) => {
  sendError(
    res,
    'Route not found',
    ERROR_CODES.NOT_FOUND,
    HTTP_STATUS.NOT_FOUND
  );
};

export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
