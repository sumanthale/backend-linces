import express from 'express';
import { list, getById } from '../controllers/productController.js';
import { validateGetAllProducts, validateGetProduct } from '../validators/productValidator.js';

const router = express.Router();

router.get('/', validateGetAllProducts, list);
router.get('/:id', validateGetProduct, getById);

export default router;
