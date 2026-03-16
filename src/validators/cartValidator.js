import { body, param, validationResult } from 'express-validator';
import { sendError } from '../utils/response.js';
import { ERROR_CODES, HTTP_STATUS } from '../constants/errorCodes.js';

export const validateAddToCart = [
  body('productId')
    .isInt({ min: 1 })
    .withMessage('Valid product ID is required'),
  body('quantity')
    .isInt({ min: 1, max: 999 })
    .withMessage('Quantity must be a positive integer between 1 and 999'),
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

export const validateUpdateCartItem = [
  body('cartItemId')
    .isInt({ min: 1 })
    .withMessage('Valid cart item ID is required'),
  body('quantity')
    .isInt({ min: 1, max: 999 })
    .withMessage('Quantity must be a positive integer between 1 and 999'),
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

export const validateRemoveFromCart = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Invalid cart item ID'),
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
