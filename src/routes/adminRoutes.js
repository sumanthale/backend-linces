import express from 'express';
import { create, update, remove } from '../controllers/productController.js';
import { list } from '../controllers/quoteController.js';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js';
import { validateCreateProduct, validateUpdateProduct, validateDeleteProduct } from '../validators/productValidator.js';

const router = express.Router();

router.use(authMiddleware);
router.use(adminMiddleware);

router.post('/products', validateCreateProduct, create);
router.put('/products/:id', validateUpdateProduct, update);
router.delete('/products/:id', validateDeleteProduct, remove);

router.get('/quotes', list);

export default router;
