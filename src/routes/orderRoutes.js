import express from 'express';
import { checkoutOrder, list, getById } from '../controllers/orderController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/checkout', checkoutOrder);
router.get('/', list);
router.get('/:id', getById);

export default router;
