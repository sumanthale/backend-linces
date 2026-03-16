import { sendSuccess, sendError, sendPaginatedSuccess } from '../utils/response.js';
import { createQuoteRequest, getAllQuoteRequests, getQuoteRequestById } from '../services/quoteService.js';
import { ERROR_CODES, HTTP_STATUS } from '../constants/errorCodes.js';

export const create = async (req, res, next) => {
  try {
    const { brandName, email, message } = req.body;
    const result = await createQuoteRequest(brandName, email, message);

    if (!result.success) {
      return sendError(res, result.message, result.error, HTTP_STATUS.INTERNAL_ERROR);
    }

    return sendSuccess(res, result.data, 'Quote request submitted successfully', HTTP_STATUS.CREATED);
  } catch (error) {
    next(error);
  }
};

export const list = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const result = await getAllQuoteRequests(parseInt(page), parseInt(limit));

    if (!result.success) {
      return sendError(res, result.message, result.error, HTTP_STATUS.INTERNAL_ERROR);
    }

    return sendPaginatedSuccess(
      res,
      result.data,
      result.pagination,
      'Quote requests fetched successfully',
      HTTP_STATUS.OK
    );
  } catch (error) {
    next(error);
  }
};


export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getQuoteRequestById(parseInt(id));

    if (!result.success) {
      return sendError(res, result.message, result.error, HTTP_STATUS.INTERNAL_ERROR);
    }

    return sendSuccess(res, result.data, 'Quote request fetched successfully', HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};