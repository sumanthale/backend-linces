import { sendSuccess, sendError, sendPaginatedSuccess } from '../utils/response.js';
import {
  createReview,
  getProductReviews,
  getUserReview,
  deleteReview,
  updateReview,
  getReviewStats,
} from '../services/reviewService.js';
import { HTTP_STATUS } from '../constants/errorCodes.js';

export const addReview = async (req, res, next) => {
  try {
    const { productId, rating, title, comment } = req.body;

    if (!productId || rating === undefined) {
      return sendError(
        res,
        'productId and rating are required',
        'INVALID_INPUT',
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const result = await createReview(
      productId,
      req.user.userId,
      rating,
      title,
      comment
    );

    if (!result.success) {
      const status = result.error === 'INVALID_RATING' ? HTTP_STATUS.BAD_REQUEST
        : result.error === 'MISSING_FIELDS' ? HTTP_STATUS.BAD_REQUEST
        : HTTP_STATUS.INTERNAL_ERROR;
      return sendError(res, result.message, result.error, status);
    }

    const statusCode = result.isUpdate ? HTTP_STATUS.OK : HTTP_STATUS.CREATED;
    const message = result.isUpdate ? 'Review updated successfully' : 'Review created successfully';
    return sendSuccess(res, result.data, message, statusCode);
  } catch (error) {
    next(error);
  }
};

export const getProductReviewsHandler = async (req, res, next) => {
  try {
    const productId = parseInt(req.params.productId);
    const { page = 1, limit = 10 } = req.query;

    const result = await getProductReviews(productId, parseInt(page), parseInt(limit));

    if (!result.success) {
      return sendError(
        res,
        result.message,
        result.error,
        result.error === 'PRODUCT_NOT_FOUND' ? HTTP_STATUS.NOT_FOUND : HTTP_STATUS.INTERNAL_ERROR
      );
    }

    return sendPaginatedSuccess(
      res,
      result.data,
      {
        ...result.pagination,
        stats: result.stats,
      },
      'Reviews fetched successfully',
      HTTP_STATUS.OK
    );
  } catch (error) {
    next(error);
  }
};

export const getMyReview = async (req, res, next) => {
  try {
    const productId = parseInt(req.params.productId);
    const result = await getUserReview(productId, req.user.userId);

    if (!result.success) {
      return sendError(res, result.message, result.error, HTTP_STATUS.INTERNAL_ERROR);
    }

    return sendSuccess(res, result.data, 'Review fetched successfully', HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};

export const deleteReviewHandler = async (req, res, next) => {
  try {
    const reviewId = parseInt(req.params.reviewId);

    const result = await deleteReview(reviewId, req.user.userId, req.user.accountType);

    if (!result.success) {
      const status = result.error === 'REVIEW_NOT_FOUND' ? HTTP_STATUS.NOT_FOUND
        : result.error === 'FORBIDDEN' ? HTTP_STATUS.FORBIDDEN
        : HTTP_STATUS.INTERNAL_ERROR;
      return sendError(res, result.message, result.error, status);
    }

    return sendSuccess(res, null, result.message, HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};

export const updateReviewHandler = async (req, res, next) => {
  try {
    const reviewId = parseInt(req.params.reviewId);
    const { rating, title, comment } = req.body;

    if (rating === undefined) {
      return sendError(
        res,
        'rating is required',
        'INVALID_INPUT',
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const result = await updateReview(
      reviewId,
      req.user.userId,
      req.user.accountType,
      rating,
      title,
      comment
    );

    if (!result.success) {
      const status = result.error === 'REVIEW_NOT_FOUND' ? HTTP_STATUS.NOT_FOUND
        : result.error === 'FORBIDDEN' ? HTTP_STATUS.FORBIDDEN
        : result.error === 'INVALID_RATING' ? HTTP_STATUS.BAD_REQUEST
        : HTTP_STATUS.INTERNAL_ERROR;
      return sendError(res, result.message, result.error, status);
    }

    return sendSuccess(res, result.data, 'Review updated successfully', HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};

export const getReviewStatsHandler = async (req, res, next) => {
  try {
    const productId = parseInt(req.params.productId);

    const result = await getReviewStats(productId);

    if (!result.success) {
      return sendError(
        res,
        result.message,
        result.error,
        result.error === 'PRODUCT_NOT_FOUND' ? HTTP_STATUS.NOT_FOUND : HTTP_STATUS.INTERNAL_ERROR
      );
    }

    return sendSuccess(res, result.data, 'Stats fetched successfully', HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};
