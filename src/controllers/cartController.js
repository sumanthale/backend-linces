import { sendSuccess, sendError } from '../utils/response.js';
import { getCart, addToCart, updateCartItem, removeFromCart } from '../services/cartService.js';
import { ERROR_CODES, HTTP_STATUS } from '../constants/errorCodes.js';

export const get = async (req, res, next) => {
  try {
    const result = await getCart(req.user.userId);

    if (!result.success) {
      return sendError(res, result.message, result.error, HTTP_STATUS.INTERNAL_ERROR);
    }

    return sendSuccess(res, result.data, 'Cart fetched successfully', HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};

export const add = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const result = await addToCart(req.user.userId, productId, quantity);

    if (!result.success) {
      return sendError(
        res,
        result.message,
        result.error,
        result.error === 'PRODUCT_NOT_FOUND' ? HTTP_STATUS.NOT_FOUND : HTTP_STATUS.INTERNAL_ERROR
      );
    }

    const message = result.isNew ? 'Item added to cart' : 'Cart item quantity updated';
    return sendSuccess(res, result.data, message, HTTP_STATUS.CREATED);
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const { cartItemId, quantity } = req.body;
    const result = await updateCartItem(req.user.userId, cartItemId, quantity);

    if (!result.success) {
      return sendError(
        res,
        result.message,
        result.error,
        result.error === 'CART_ITEM_NOT_FOUND' ? HTTP_STATUS.NOT_FOUND : HTTP_STATUS.INTERNAL_ERROR
      );
    }

    return sendSuccess(res, result.data, 'Cart item updated successfully', HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const result = await removeFromCart(req.user.userId, parseInt(req.params.id));

    if (!result.success) {
      return sendError(
        res,
        result.message,
        result.error,
        result.error === 'CART_ITEM_NOT_FOUND' ? HTTP_STATUS.NOT_FOUND : HTTP_STATUS.INTERNAL_ERROR
      );
    }

    return sendSuccess(res, null, result.message, HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};
