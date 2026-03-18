import { sendSuccess, sendError, sendPaginatedSuccess } from '../utils/response.js';
import { createQuoteRequest, getAllQuoteRequests, getAllQuoteRequestsForAdmin, getQuoteRequestById, getQuoteRequestByIdForAdmin, updateQuoteStatusService } from '../services/quoteService.js';
import { HTTP_STATUS } from '../constants/errorCodes.js';


export const create = async (req, res, next) => {
  try {

    const { brandName, email, message } = req.body;

    const userId = req.user.userId;

    const result = await createQuoteRequest(userId, brandName, email, message);

    if (!result.success) {
      return sendError(res, result.message, result.error, HTTP_STATUS.INTERNAL_ERROR);
    }

    return sendSuccess(
      res,
      result.data,
      'Quote request submitted successfully',
      HTTP_STATUS.CREATED
    );

  } catch (error) {
    next(error);
  }
};


export const list = async (req, res, next) => {
  try {

    const { page = 1, limit = 20 } = req.query;

    const userId = req.user.userId;

    const result = await getAllQuoteRequests(
      userId,
      parseInt(page),
      parseInt(limit)
    );

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

    const userId = req.user.userId;

    const result = await getQuoteRequestById(parseInt(id), userId);

    if (!result.success) {
      return sendError(res, result.message, result.error, HTTP_STATUS.NOT_FOUND);
    }

    return sendSuccess(
      res,
      result.data,
      'Quote request fetched successfully',
      HTTP_STATUS.OK
    );

  } catch (error) {
    next(error);
  }
};


export const getAllQuotes = async (req, res, next) => {
  try {
    const result = await getAllQuoteRequestsForAdmin();

    if (!result.success) {
      return sendError(res, result.message, result.error, HTTP_STATUS.INTERNAL_ERROR);
    }

    return sendSuccess(
      res,
      result.data,
      'All quote requests fetched successfully',
      HTTP_STATUS.OK
    );

  } catch (error) {
    next(error);
  }
};



export const getAdminQuoteById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await getQuoteRequestByIdForAdmin(parseInt(id));

    if (!result.success) {
      return sendError(res, result.message, result.error, HTTP_STATUS.NOT_FOUND);
    }
    
    return sendSuccess( 
      res,
      result.data,
      'Quote request fetched successfully',
      HTTP_STATUS.OK
    );
    
  } catch (error) {
    next(error);
  }
}


export const updateQuoteStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, adminResponse } = req.body;

    const result = await updateQuoteStatusService(
      parseInt(id),
      status,
      adminResponse
    );

    if (!result.success) {
      return sendError(
        res,
        result.message,
        result.error,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    return sendSuccess(
      res,
      result.data,
      "Quote status updated successfully",
      HTTP_STATUS.OK
    );

  } catch (error) {
    next(error);
  }
};