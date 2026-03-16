import { body, validationResult } from 'express-validator';
import { sendError } from '../utils/response.js';
import { ERROR_CODES, HTTP_STATUS } from '../constants/errorCodes.js';

export const validateRegister = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('accountType')
    .isIn(['customer', 'brand', 'admin'])
    .withMessage('Invalid account type. Must be customer, brand, or admin'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendError(
        res,
        'Validation failed',
        ERROR_CODES.VALIDATION_ERROR,
        HTTP_STATUS.BAD_REQUEST,
        errors.array()
      );
    }
    next();
  },
];

export const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendError(
        res,
        'Validation failed',
        ERROR_CODES.VALIDATION_ERROR,
        HTTP_STATUS.BAD_REQUEST,
        errors.array()
      );
    }
    next();
  },
];
