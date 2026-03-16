import { sendSuccess, sendError } from '../utils/response.js';
import { registerUser, loginUser, getUserProfile } from '../services/authService.js';
import { ERROR_CODES, HTTP_STATUS } from '../constants/errorCodes.js';

export const register = async (req, res, next) => {
  try {
    const { email, password, accountType } = req.body;
    const result = await registerUser(email, password, accountType);

    if (!result.success) {
      return sendError(
        res,
        result.message,
        result.error,
        result.error === 'USER_ALREADY_EXISTS' ? HTTP_STATUS.CONFLICT : HTTP_STATUS.INTERNAL_ERROR
      );
    }

    return sendSuccess(res, result.data, 'User registered successfully', HTTP_STATUS.CREATED);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);

    if (!result.success) {
      return sendError(
        res,
        result.message,
        result.error,
        result.error === 'INVALID_CREDENTIALS' ? HTTP_STATUS.UNAUTHORIZED : HTTP_STATUS.INTERNAL_ERROR
      );
    }

    return sendSuccess(res, result.data, 'Login successful', HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const result = await getUserProfile(req.user.userId);

    if (!result.success) {
      return sendError(
        res,
        result.message,
        result.error,
        HTTP_STATUS.NOT_FOUND
      );
    }

    return sendSuccess(res, result.data, 'User profile fetched successfully', HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};
