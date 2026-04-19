import express from 'express';
import { register, login, getMe, changePassword, updateProfile } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validateRegister, validateLogin } from '../validators/authValidator.js';

const router = express.Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.get('/me', authMiddleware, getMe);


router.post('/change-password', authMiddleware, changePassword);
router.put('/profile', authMiddleware, updateProfile);





export default router;
