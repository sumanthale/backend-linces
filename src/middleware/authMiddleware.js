import jwt from 'jsonwebtoken';
import { sendError } from '../utils/response.js';
import { ERROR_CODES, HTTP_STATUS } from '../constants/errorCodes.js';
import logger from '../utils/logger.js';

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return sendError(
        res,
        'Authentication token required',
        ERROR_CODES.UNAUTHORIZED,
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    logger.warn('Invalid token attempt');
    return sendError(
      res,
      'Invalid or expired token',
      ERROR_CODES.UNAUTHORIZED,
      HTTP_STATUS.UNAUTHORIZED
    );
  }
};

export const adminMiddleware = (req, res, next) => {
  
  if (req.user?.accountType !== 'admin') {
    logger.warn(`Unauthorized admin access attempt - User: ${req.user?.userId}`);
    return sendError(
      res,
      'Admin access required',
      ERROR_CODES.FORBIDDEN,
      HTTP_STATUS.FORBIDDEN
    );
  }
  next();
};
export const isAdmin = (req, res, next) => {
  try {
    // assuming user is attached via JWT middleware
    if (!req.user || req.user.accountType !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin only.',
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Authorization error',
    });
  }
};