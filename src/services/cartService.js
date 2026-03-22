import prisma from '../config/prisma.js';
import logger from '../utils/logger.js';

export const getCart = async (userId) => {
  try {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });

    const total = cartItems.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);

    return {
      success: true,
      data: {
        items: cartItems,
        total: Math.round(total * 100) / 100,
        itemCount: cartItems.length,
      },
    };
  } catch (error) {
    logger.error('Get cart error:', error);
    return { success: false, error: 'INTERNAL_ERROR', message: 'Failed to fetch cart' };
  }
};

export const addToCart = async (userId, productId, quantity) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId, isDeleted: false },    });

    if (!product) {
      return { success: false, error: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
    }

    const existingCartItem = await prisma.cartItem.findFirst({
      where: { userId, productId },
    });

    let cartItem;
    if (existingCartItem) {
      cartItem = await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + quantity },
        include: { product: true },
      });
    } else {
      cartItem = await prisma.cartItem.create({
        data: { userId, productId, quantity },
        include: { product: true },
      });
    }

    logger.info(`Item added to cart - User: ${userId}, Product: ${productId}, Qty: ${quantity}`);
    return {
      success: true,
      data: cartItem,
      isNew: !existingCartItem,
    };
  } catch (error) {
    logger.error('Add to cart error:', error);
    return { success: false, error: 'INTERNAL_ERROR', message: 'Failed to add item to cart' };
  }
};

export const updateCartItem = async (userId, cartItemId, quantity) => {
  try {
    const cartItem = await prisma.cartItem.findFirst({
      where: { id: cartItemId, userId },
    });

    if (!cartItem) {
      return { success: false, error: 'CART_ITEM_NOT_FOUND', message: 'Cart item not found' };
    }

    const updatedItem = await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
      include: { product: true },
    });

    logger.info(`Cart item updated - User: ${userId}, CartItem: ${cartItemId}, Qty: ${quantity}`);
    return { success: true, data: updatedItem };
  } catch (error) {
    logger.error('Update cart error:', error);
    return { success: false, error: 'INTERNAL_ERROR', message: 'Failed to update cart item' };
  }
};

export const removeFromCart = async (userId, cartItemId) => {
  try {
    const cartItem = await prisma.cartItem.findFirst({
      where: { id: cartItemId, userId },
    });

    if (!cartItem) {
      return { success: false, error: 'CART_ITEM_NOT_FOUND', message: 'Cart item not found' };
    }

    await prisma.cartItem.delete({
      where: { id: cartItemId },
    });

    logger.info(`Item removed from cart - User: ${userId}, CartItem: ${cartItemId}`);
    return { success: true, message: 'Item removed from cart' };
  } catch (error) {
    logger.error('Remove from cart error:', error);
    return { success: false, error: 'INTERNAL_ERROR', message: 'Failed to remove item from cart' };
  }
};
