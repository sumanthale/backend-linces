import { sendSuccess, sendError, sendPaginatedSuccess } from '../utils/response.js';
import { checkout, getUserOrders, getOrderById } from '../services/orderService.js';
import { ERROR_CODES, HTTP_STATUS } from '../constants/errorCodes.js';

export const checkoutOrder = async (req, res, next) => {
  try {
    const result = await checkout(req.user.userId);

    if (!result.success) {
      return sendError(
        res,
        result.message,
        result.error,
        result.error === 'EMPTY_CART' ? HTTP_STATUS.BAD_REQUEST : HTTP_STATUS.INTERNAL_ERROR
      );
    }

    return sendSuccess(res, result.data, 'Order placed successfully', HTTP_STATUS.CREATED);
  } catch (error) {
    next(error);
  }
};

export const list = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const result = await getUserOrders(req.user.userId, parseInt(page), parseInt(limit));

    if (!result.success) {
      return sendError(res, result.message, result.error, HTTP_STATUS.INTERNAL_ERROR);
    }

    return sendPaginatedSuccess(
      res,
      result.data,
      result.pagination,
      'Orders fetched successfully',
      HTTP_STATUS.OK
    );
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const result = await getOrderById(req.user.userId, req.params.id);

    if (!result.success) {
      return sendError(
        res,
        result.message,
        result.error,
        result.error === 'ORDER_NOT_FOUND' ? HTTP_STATUS.NOT_FOUND : HTTP_STATUS.INTERNAL_ERROR
      );
    }

    return sendSuccess(res, result.data, 'Order fetched successfully', HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};
