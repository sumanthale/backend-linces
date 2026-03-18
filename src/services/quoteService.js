import prisma from "../config/prisma.js";
import logger from "../utils/logger.js";

export const createQuoteRequest = async (userId, brandName, email, message) => {
  try {
    const quote = await prisma.quoteRequest.create({
      data: {
        brandName,
        email,
        message,
        userId,
        status: "PENDING",
      },
    });

    logger.info(`Quote created - ID: ${quote.id}, UserID: ${userId}`);

    return { success: true, data: quote };
  } catch (error) {
    logger.error("Create quote error:", error);

    return {
      success: false,
      error: "INTERNAL_ERROR",
      message: "Failed to submit quote request",
    };
  }
};

export const getAllQuoteRequests = async (userId, page = 1, limit = 20) => {
  try {
    const skip = (page - 1) * limit;

    const [quotes, total] = await Promise.all([
      prisma.quoteRequest.findMany({
        where: { userId },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),

      prisma.quoteRequest.count({
        where: { userId },
      }),
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
    logger.error("Get quotes error:", error);

    return {
      success: false,
      error: "INTERNAL_ERROR",
      message: "Failed to fetch quote requests",
    };
  }
};

export const getQuoteRequestById = async (id, userId) => {
  try {
    const quote = await prisma.quoteRequest.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!quote) {
      return {
        success: false,
        error: "QUOTE_NOT_FOUND",
        message: "Quote request not found",
      };
    }

    return { success: true, data: quote };
  } catch (error) {
    logger.error("Get quote by ID error:", error);

    return {
      success: false,
      error: "INTERNAL_ERROR",
      message: "Failed to fetch quote request",
    };
  }
};

export const getAllQuoteRequestsForAdmin = async (page = 1, limit = 20) => {
  try {
    const skip = (page - 1) * limit;

    const [quotes, total] = await Promise.all([
      prisma.quoteRequest.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
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
    logger.error("Admin get quotes error:", error);

    return {
      success: false,
      error: "INTERNAL_ERROR",
      message: "Failed to fetch quote requests",
    };
  }
};

export const getQuoteRequestByIdForAdmin = async (id) => {
  try {
    const quote = await prisma.quoteRequest.findUnique({
      where: { id },
    });

    if (!quote) {
      return {
        success: false,
        error: "QUOTE_NOT_FOUND",
        message: "Quote request not found",
      };
    }

    return { success: true, data: quote };
  } catch (error) {
    logger.error("Admin get quote by ID error:", error);

    return {
      success: false,
      error: "INTERNAL_ERROR",
      message: "Failed to fetch quote request",
    };
  }
};


export const updateQuoteStatusService = async (id, status, adminResponse) => {
  try {

    const validStatuses = ["PENDING", "IN_REVIEW", "APPROVED", "REJECTED"];

    if (!validStatuses.includes(status)) {
      return {
        success: false,
        error: "INVALID_STATUS",
        message: "Invalid status value",
      };
    }

    const existingQuote = await prisma.quoteRequest.findUnique({
      where: { id },
    });

    if (!existingQuote) {
      return {
        success: false,
        error: "QUOTE_NOT_FOUND",
        message: "Quote request not found",
      };
    }

    const updatedQuote = await prisma.quoteRequest.update({
      where: { id },
      data: {
        status,
        adminResponse,
      },
    });

    logger.info(`Quote updated - ID: ${id}, Status: ${status}`);

    return {
      success: true,
      data: updatedQuote,
    };

  } catch (error) {
    logger.error("Update quote status error:", error);

    return {
      success: false,
      error: "INTERNAL_ERROR",
      message: "Failed to update quote request",
    };
  }
};