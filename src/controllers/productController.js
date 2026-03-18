import {
  sendSuccess,
  sendError,
  sendPaginatedSuccess,
} from "../utils/response.js";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService.js";
import { ERROR_CODES, HTTP_STATUS } from "../constants/errorCodes.js";

export const list = async (req, res, next) => {
  try {
    const { category, search, page = 1, limit = 20 } = req.query;
    const result = await getAllProducts({
      category,
      search,
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 20,
    });

    if (!result.success) {
      return sendError(
        res,
        result.message,
        result.error,
        HTTP_STATUS.INTERNAL_ERROR,
      );
    }

    return sendPaginatedSuccess(
      res,
      result.data,
      result.pagination,
      "Products fetched successfully",
      HTTP_STATUS.OK,
    );
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const result = await getProductById(req.params.id);

    if (!result.success) {
      return sendError(
        res,
        result.message,
        result.error,
        HTTP_STATUS.NOT_FOUND,
      );
    }

    return sendSuccess(
      res,
      result.data,
      "Product fetched successfully",
      HTTP_STATUS.OK,
    );
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const result = await createProduct(req.body);

    if (!result.success) {
      return sendError(
        res,
        result.message,
        result.error,
        HTTP_STATUS.INTERNAL_ERROR,
      );
    }

    return sendSuccess(
      res,
      result.data,
      "Product created successfully",
      HTTP_STATUS.CREATED,
    );
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const result = await updateProduct(req.params.id, req.body);

    if (!result.success) {
      return sendError(
        res,
        result.message,
        result.error,
        result.error === "PRODUCT_NOT_FOUND"
          ? HTTP_STATUS.NOT_FOUND
          : HTTP_STATUS.INTERNAL_ERROR,
      );
    }

    return sendSuccess(
      res,
      result.data,
      "Product updated successfully",
      HTTP_STATUS.OK,
    );
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const result = await deleteProduct(req.params.id);

    if (!result.success) {
      return sendError(
        res,
        result.message,
        result.error,
        result.error === "PRODUCT_NOT_FOUND"
          ? HTTP_STATUS.NOT_FOUND
          : HTTP_STATUS.INTERNAL_ERROR,
      );
    }

    return sendSuccess(res, null, result.message, HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};
