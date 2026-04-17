import express from 'express';
import { initChat, getMyChat, listAllChats, getMessages } from '../controllers/chatController.js';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/init', initChat);
router.get('/me', getMyChat);
router.get('/all', adminMiddleware, listAllChats);
router.get('/:chatId/messages', getMessages);

export default router;
