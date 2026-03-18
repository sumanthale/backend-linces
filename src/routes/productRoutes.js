import express from 'express';
import {
  list,
  getById,
  create,
  update,
  remove,
} from '../controllers/productController.js';

import {
  validateGetAllProducts,
  validateGetProduct,
  validateCreateProduct,
  validateUpdateProduct,
  validateDeleteProduct,
} from '../validators/productValidator.js';
import { authMiddleware, isAdmin } from '../middleware/authMiddleware.js';

// OPTIONAL: Admin middleware (add later)

const router = express.Router();

// PUBLIC ROUTES
router.get('/', validateGetAllProducts, list);
router.get('/:id', validateGetProduct, getById);

// ADMIN ROUTES
router.post('/', authMiddleware, isAdmin, validateCreateProduct, create);
router.put('/:id', authMiddleware, isAdmin, validateUpdateProduct, update);
router.delete('/:id', authMiddleware, isAdmin, validateDeleteProduct, remove);

export default router;