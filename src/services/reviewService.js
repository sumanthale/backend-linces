import prisma from '../config/prisma.js';
import logger from '../utils/logger.js';

export const createReview = async (productId, userId, rating, title, comment) => {
  try {
    if (rating < 1 || rating > 5) {
      return { success: false, error: 'INVALID_RATING', message: 'Rating must be between 1 and 5' };
    }

    if (!title?.trim() || !comment?.trim()) {
      return { success: false, error: 'MISSING_FIELDS', message: 'Title and comment are required' };
    }

    const existing = await prisma.review.findUnique({
      where: { productId_userId: { productId, userId } },
    });

    if (existing) {
      const updated = await prisma.review.update({
        where: { id: existing.id },
        data: {
          rating,
          title: title.trim(),
          comment: comment.trim(),
          updatedAt: new Date(),
        },
        include: { user: { select: { id: true, name: true } } },
      });
      logger.info(`Review updated - Product: ${productId}, User: ${userId}`);
      return { success: true, data: updated, isUpdate: true };
    }

    const review = await prisma.review.create({
      data: {
        productId,
        userId,
        rating,
        title: title.trim(),
        comment: comment.trim(),
      },
      include: { user: { select: { id: true, name: true } } },
    });

    logger.info(`Review created - Product: ${productId}, User: ${userId}`);
    return { success: true, data: review };
  } catch (error) {
    logger.error('Create review error:', error);
    return { success: false, error: 'INTERNAL_ERROR', message: 'Failed to create review' };
  }
};

export const getProductReviews = async (productId, page = 1, limit = 10) => {
  try {
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      return { success: false, error: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
    }

    const skip = (page - 1) * limit;

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where: { productId },
        include: { user: { select: { id: true, name: true } } },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.review.count({ where: { productId } }),
    ]);

    const avgRating = reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : 0;

    return {
      success: true,
      data: reviews,
      stats: {
        averageRating: parseFloat(avgRating),
        totalReviews: total,
      },
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  } catch (error) {
    logger.error('Get product reviews error:', error);
    return { success: false, error: 'INTERNAL_ERROR', message: 'Failed to fetch reviews' };
  }
};

export const getUserReview = async (productId, userId) => {
  try {
    const review = await prisma.review.findUnique({
      where: { productId_userId: { productId, userId } },
      include: { user: { select: { id: true, name: true } } },
    });

    return {
      success: true,
      data: review,
    };
  } catch (error) {
    logger.error('Get user review error:', error);
    return { success: false, error: 'INTERNAL_ERROR', message: 'Failed to fetch review' };
  }
};

export const deleteReview = async (reviewId, userId, accountType) => {
  try {
    const review = await prisma.review.findUnique({ where: { id: reviewId } });

    if (!review) {
      return { success: false, error: 'REVIEW_NOT_FOUND', message: 'Review not found' };
    }

    if (accountType !== 'admin' && review.userId !== userId) {
      return { success: false, error: 'FORBIDDEN', message: 'Cannot delete other users reviews' };
    }

    await prisma.review.delete({ where: { id: reviewId } });

    logger.info(`Review deleted - Review: ${reviewId}, User: ${userId}`);
    return { success: true, message: 'Review deleted successfully' };
  } catch (error) {
    logger.error('Delete review error:', error);
    return { success: false, error: 'INTERNAL_ERROR', message: 'Failed to delete review' };
  }
};

export const updateReview = async (reviewId, userId, accountType, rating, title, comment) => {
  try {
    const review = await prisma.review.findUnique({ where: { id: reviewId } });

    if (!review) {
      return { success: false, error: 'REVIEW_NOT_FOUND', message: 'Review not found' };
    }

    if (accountType !== 'admin' && review.userId !== userId) {
      return { success: false, error: 'FORBIDDEN', message: 'Cannot update other users reviews' };
    }

    if (rating < 1 || rating > 5) {
      return { success: false, error: 'INVALID_RATING', message: 'Rating must be between 1 and 5' };
    }

    const updated = await prisma.review.update({
      where: { id: reviewId },
      data: {
        rating,
        title: title?.trim(),
        comment: comment?.trim(),
      },
      include: { user: { select: { id: true, name: true } } },
    });

    logger.info(`Review updated - Review: ${reviewId}, User: ${userId}`);
    return { success: true, data: updated };
  } catch (error) {
    logger.error('Update review error:', error);
    return { success: false, error: 'INTERNAL_ERROR', message: 'Failed to update review' };
  }
};

export const getReviewStats = async (productId) => {
  try {
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      return { success: false, error: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
    }

    const reviews = await prisma.review.findMany({ where: { productId } });

    const ratingCounts = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    reviews.forEach(r => {
      ratingCounts[r.rating]++;
    });

    const avgRating = reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : 0;

    return {
      success: true,
      data: {
        averageRating: parseFloat(avgRating),
        totalReviews: reviews.length,
        ratingDistribution: ratingCounts,
      },
    };
  } catch (error) {
    logger.error('Get review stats error:', error);
    return { success: false, error: 'INTERNAL_ERROR', message: 'Failed to fetch stats' };
  }
};
