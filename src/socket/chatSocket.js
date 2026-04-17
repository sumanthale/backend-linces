import { saveMessage } from '../services/chatService.js';
import logger from '../utils/logger.js';

export const registerChatSocket = (io) => {
  io.on('connection', (socket) => {
    logger.info(`Socket connected: ${socket.id}`);

    socket.on('join_chat', ({ chatId }) => {
      const room = `chat_${chatId}`;
      socket.join(room);
      logger.info(`Socket ${socket.id} joined room ${room}`);
    });

    socket.on('send_message', async ({ chatId, senderId, text }) => {
      if (!chatId || !senderId || !text?.trim()) {
        socket.emit('error', { message: 'chatId, senderId, and text are required' });
        return;
      }

      const result = await saveMessage(chatId, senderId, text.trim());

      if (!result.success) {
        socket.emit('error', { message: result.message });
        return;
      }

      io.to(`chat_${chatId}`).emit('receive_message', result.data);
      logger.info(`Message sent - Chat: ${chatId}, Sender: ${senderId}`);
    });

    socket.on('disconnect', () => {
      logger.info(`Socket disconnected: ${socket.id}`);
    });
  });
};
