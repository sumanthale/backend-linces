import { body, validationResult } from 'express-validator';
import { sendError } from '../utils/response.js';
import { ERROR_CODES, HTTP_STATUS } from '../constants/errorCodes.js';

export const validateCreateQuote = [
  body('brandName')
    .trim()
    .notEmpty()
    .withMessage('Brand name is required')
    .isLength({ min: 2, max: 255 })
    .withMessage('Brand name must be between 2 and 255 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10, max: 5000 })
    .withMessage('Message must be between 10 and 5000 characters'),
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
