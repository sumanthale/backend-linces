import { body, param, query, validationResult } from 'express-validator';
import { sendError } from '../utils/response.js';
import { ERROR_CODES, HTTP_STATUS } from '../constants/errorCodes.js';

export const validateCreateProduct = [
  body('name_en')
    .trim()
    .notEmpty()
    .withMessage('Product name (English) is required')
    .isLength({ min: 2, max: 255 })
    .withMessage('Product name must be between 2 and 255 characters'),
  body('name_es')
    .trim()
    .notEmpty()
    .withMessage('Product name (Spanish) is required')
    .isLength({ min: 2, max: 255 })
    .withMessage('Product name must be between 2 and 255 characters'),
  body('price')
    .isFloat({ min: 0.01 })
    .withMessage('Price must be a positive number greater than 0'),
  body('description_en')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('English description cannot exceed 1000 characters'),
  body('description_es')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Spanish description cannot exceed 1000 characters'),
  body('category')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Category cannot exceed 100 characters'),
  body('imageUrl')
    .optional()
    .isURL()
    .withMessage('Invalid image URL'),
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

export const validateUpdateProduct = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Invalid product ID'),
  body('name_en')
    .optional()
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage('Product name must be between 2 and 255 characters'),
  body('name_es')
    .optional()
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage('Product name must be between 2 and 255 characters'),
  body('price')
    .optional()
    .isFloat({ min: 0.01 })
    .withMessage('Price must be a positive number greater than 0'),
  body('description_en')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('English description cannot exceed 1000 characters'),
  body('description_es')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Spanish description cannot exceed 1000 characters'),
  body('category')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Category cannot exceed 100 characters'),
  body('imageUrl')
    .optional()
    .isURL()
    .withMessage('Invalid image URL'),
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

export const validateDeleteProduct = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Invalid product ID'),
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

export const validateGetProduct = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Invalid product ID'),
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

export const validateGetAllProducts = [
  query('category')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Category cannot exceed 100 characters'),
  query('search')
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage('Search query cannot exceed 255 characters'),
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
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
