import prisma from '../config/prisma.js';
import logger from '../utils/logger.js';

export const checkout = async (userId) => {
  try {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });

    if (cartItems.length === 0) {
      return { success: false, error: 'EMPTY_CART', message: 'Cart is empty' };
    }

    const totalAmount = cartItems.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);

    const order = await prisma.order.create({
      data: {
        userId,
        totalAmount: Math.round(totalAmount * 100) / 100,
        orderItems: {
          create: cartItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
      include: {
        orderItems: {
          include: { product: true },
        },
      },
    });

    await prisma.cartItem.deleteMany({ where: { userId } });

    logger.info(`Order created - User: ${userId}, Order: ${order.id}, Total: ${order.totalAmount}`);
    return { success: true, data: order };
  } catch (error) {
    logger.error('Checkout error:', error);
    return { success: false, error: 'INTERNAL_ERROR', message: 'Failed to process checkout' };
  }
};

export const getUserOrders = async (userId, page = 1, limit = 20) => {
  try {
    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: { userId },
        include: {
          orderItems: {
            include: { product: true },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.order.count({ where: { userId } }),
    ]);

    return {
      success: true,
      data: orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    logger.error('Get orders error:', error);
    return { success: false, error: 'INTERNAL_ERROR', message: 'Failed to fetch orders' };
  }
};

export const getOrderById = async (userId, orderId) => {
  try {
    const order = await prisma.order.findFirst({
      where: { id: parseInt(orderId), userId },
      include: {
        orderItems: {
          include: { product: true },
        },
      },
    });

    if (!order) {
      return { success: false, error: 'ORDER_NOT_FOUND', message: 'Order not found' };
    }

    return { success: true, data: order };
  } catch (error) {
    logger.error('Get order error:', error);
    return { success: false, error: 'INTERNAL_ERROR', message: 'Failed to fetch order' };
  }
};
