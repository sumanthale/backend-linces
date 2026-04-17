import { sendSuccess, sendError, sendPaginatedSuccess } from '../utils/response.js';
import { getOrCreateChat, getChatForUser, getAllChats, getChatMessages } from '../services/chatService.js';
import { HTTP_STATUS } from '../constants/errorCodes.js';

export const initChat = async (req, res, next) => {
  try {
    const result = await getOrCreateChat(req.user.userId);

    if (!result.success) {
      const status = result.error === 'ADMIN_NOT_FOUND' ? HTTP_STATUS.NOT_FOUND : HTTP_STATUS.INTERNAL_ERROR;
      return sendError(res, result.message, result.error, status);
    }

    return sendSuccess(res, result.data, 'Chat initialized', HTTP_STATUS.CREATED);
  } catch (error) {
    next(error);
  }
};

export const getMyChat = async (req, res, next) => {
  try {
    const result = await getChatForUser(req.user.userId);

    if (!result.success) {
      return sendError(res, result.message, result.error, HTTP_STATUS.NOT_FOUND);
    }

    return sendSuccess(res, result.data, 'Chat fetched successfully', HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};

export const listAllChats = async (req, res, next) => {
  try {
    const result = await getAllChats();

    if (!result.success) {
      return sendError(res, result.message, result.error, HTTP_STATUS.INTERNAL_ERROR);
    }

    return sendSuccess(res, result.data, 'All chats fetched successfully', HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const chatId = parseInt(req.params.chatId);
    const { page = 1, limit = 30 } = req.query;

    const result = await getChatMessages(
      chatId,
      req.user.userId,
      req.user.accountType,
      parseInt(page),
      parseInt(limit)
    );

    if (!result.success) {
      const status = result.error === 'FORBIDDEN' ? HTTP_STATUS.FORBIDDEN
        : result.error === 'CHAT_NOT_FOUND' ? HTTP_STATUS.NOT_FOUND
        : HTTP_STATUS.INTERNAL_ERROR;
      return sendError(res, result.message, result.error, status);
    }

    return sendPaginatedSuccess(res, result.data, result.pagination, 'Messages fetched successfully', HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};
