import express from 'express';
import { get, add, update, remove } from '../controllers/cartController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validateAddToCart, validateUpdateCartItem, validateRemoveFromCart } from '../validators/cartValidator.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', get);
router.post('/add', validateAddToCart, add);
router.put('/update', validateUpdateCartItem, update);
router.delete('/remove/:id', validateRemoveFromCart, remove);

export default router;
