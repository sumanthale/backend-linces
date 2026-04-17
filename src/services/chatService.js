import prisma from '../config/prisma.js';
import logger from '../utils/logger.js';

export const getOrCreateChat = async (userId) => {
  try {
    const existing = await prisma.chat.findUnique({ where: { userId } });
    if (existing) {
      return { success: true, data: existing };
    }

    const admin = await prisma.user.findFirst({ where: { accountType: 'admin' } });
    if (!admin) {
      return { success: false, error: 'ADMIN_NOT_FOUND', message: 'No admin user found' };
    }

    const chat = await prisma.chat.create({
      data: { userId, adminId: admin.id },
    });

    logger.info(`Chat created - User: ${userId}, Admin: ${admin.id}`);
    return { success: true, data: chat };
  } catch (error) {
    logger.error('Init chat error:', error);
    return { success: false, error: 'INTERNAL_ERROR', message: 'Failed to initialize chat' };
  }
};

export const getChatForUser = async (userId) => {
  try {
    const chat = await prisma.chat.findUnique({
      where: { userId },
      include: { admin: { select: { id: true, name: true, email: true } } },
    });

    if (!chat) {
      return { success: false, error: 'CHAT_NOT_FOUND', message: 'Chat not found' };
    }

    return { success: true, data: chat };
  } catch (error) {
    logger.error('Get chat error:', error);
    return { success: false, error: 'INTERNAL_ERROR', message: 'Failed to fetch chat' };
  }
};

export const getAllChats = async () => {
  try {
    const chats = await prisma.chat.findMany({
      include: {
        user: { select: { id: true, name: true, email: true, accountType: true } },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return { success: true, data: chats };
  } catch (error) {
    logger.error('Get all chats error:', error);
    return { success: false, error: 'INTERNAL_ERROR', message: 'Failed to fetch chats' };
  }
};

export const getChatMessages = async (chatId, userId, accountType, page = 1, limit = 30) => {
  try {
    const chat = await prisma.chat.findUnique({ where: { id: chatId } });
    if (!chat) {
      return { success: false, error: 'CHAT_NOT_FOUND', message: 'Chat not found' };
    }

    if (accountType !== 'admin' && chat.userId !== userId) {
      return { success: false, error: 'FORBIDDEN', message: 'Access denied' };
    }

    const skip = (page - 1) * limit;

    const [messages, total] = await Promise.all([
      prisma.message.findMany({
        where: { chatId },
        include: { sender: { select: { id: true, name: true, accountType: true } } },
        orderBy: { createdAt: 'asc' },
        skip,
        take: limit,
      }),
      prisma.message.count({ where: { chatId } }),
    ]);

    return {
      success: true,
      data: messages,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  } catch (error) {
    logger.error('Get messages error:', error);
    return { success: false, error: 'INTERNAL_ERROR', message: 'Failed to fetch messages' };
  }
};

export const saveMessage = async (chatId, senderId, text) => {
  try {
    const message = await prisma.message.create({
      data: { chatId, senderId, text },
      include: { sender: { select: { id: true, name: true, accountType: true } } },
    });

    return { success: true, data: message };
  } catch (error) {
    logger.error('Save message error:', error);
    return { success: false, error: 'INTERNAL_ERROR', message: 'Failed to save message' };
  }
};
