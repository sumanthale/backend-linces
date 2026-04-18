import express from 'express';
import {
  addReview,
  getProductReviewsHandler,
  getMyReview,
  deleteReviewHandler,
  updateReviewHandler,
  getReviewStatsHandler,
} from '../controllers/reviewController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, addReview);
router.get('/product/:productId', getProductReviewsHandler);
router.get('/product/:productId/stats', getReviewStatsHandler);
router.get('/product/:productId/my-review', authMiddleware, getMyReview);
router.put('/:reviewId', authMiddleware, updateReviewHandler);
router.delete('/:reviewId', authMiddleware, deleteReviewHandler);

export default router;
