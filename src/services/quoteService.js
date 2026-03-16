import prisma from '../config/prisma.js';
import logger from '../utils/logger.js';

export const createQuoteRequest = async (brandName, email, message) => {
  try {
    const quote = await prisma.quoteRequest.create({
      data: { brandName, email, message },
    });

    logger.info(`Quote created - ID: ${quote.id}, Email: ${email}`);
    return { success: true, data: quote };
  } catch (error) {
    logger.error('Create quote error:', error);
    return { success: false, error: 'INTERNAL_ERROR', message: 'Failed to submit quote request' };
  }
};

export const getAllQuoteRequests = async (page = 1, limit = 20) => {
  try {
    const skip = (page - 1) * limit;

    const [quotes, total] = await Promise.all([
      prisma.quoteRequest.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.quoteRequest.count(),
    ]);

    return {
      success: true,
      data: quotes,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    logger.error('Get quotes error:', error);
    return { success: false, error: 'INTERNAL_ERROR', message: 'Failed to fetch quote requests' };
  }
};


export const getQuoteRequestById = async (id) => {
  try {
    const quote = await prisma.quoteRequest.findUnique({
      where: { id },
    });

    if (!quote) {
      return { success: false, error: 'QUOTE_NOT_FOUND', message: 'Quote request not found' };
    }

    return { success: true, data: quote };
  } catch (error) {
    logger.error('Get quote by ID error:', error);
    return { success: false, error: 'INTERNAL_ERROR', message: 'Failed to fetch quote request' };
  }
};