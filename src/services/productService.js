import prisma from '../config/prisma.js';
import logger from '../utils/logger.js';

export const getAllProducts = async (filters = {}) => {
  try {
    const { category, search, page = 1, limit = 20 } = filters;

    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 20;
    const skip = (pageNumber - 1) * limitNumber;

    const where = {};

    if (category) {
      where.category = {
        equals: category,
        mode: 'insensitive',
      };
    }

    if (search) {
      where.OR = [
        { name_en: { contains: search, mode: 'insensitive' } },
        { name_es: { contains: search, mode: 'insensitive' } },
        { description_en: { contains: search, mode: 'insensitive' } },
        { description_es: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limitNumber,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.product.count({ where }),
    ]);

    return {
      success: true,
      data: products,
      pagination: {
        page: pageNumber,
        limit: limitNumber,
        total,
        pages: Math.ceil(total / limitNumber),
      },
    };
  } catch (error) {
    logger.error('Get products error:', error);
    return { success: false, error: 'INTERNAL_ERROR', message: 'Failed to fetch products' };
  }
};

export const getProductById = async (productId) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(productId) },
    });

    if (!product) {
      return { success: false, error: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
    }

    return { success: true, data: product };
  } catch (error) {
    logger.error('Get product error:', error);
    return { success: false, error: 'INTERNAL_ERROR', message: 'Failed to fetch product' };
  }
};

export const createProduct = async (productData) => {
  try {
    const product = await prisma.product.create({
      data: {
        name_en: productData.name_en,
        name_es: productData.name_es,
        description_en: productData.description_en || null,
        description_es: productData.description_es || null,
        category: productData.category || null,
        price: parseFloat(productData.price),
        imageUrl: productData.imageUrl || null,
      },
    });

    logger.info(`Product created: ${product.id} - ${product.name_en}`);
    return { success: true, data: product };
  } catch (error) {
    logger.error('Create product error:', error);
    return { success: false, error: 'INTERNAL_ERROR', message: 'Failed to create product' };
  }
};

export const updateProduct = async (productId, productData) => {
  try {
    const existingProduct = await prisma.product.findUnique({
      where: { id: parseInt(productId) },
    });

    if (!existingProduct) {
      return { success: false, error: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
    }

    const updateData = {};
    if (productData.name_en !== undefined) updateData.name_en = productData.name_en;
    if (productData.name_es !== undefined) updateData.name_es = productData.name_es;
    if (productData.description_en !== undefined) updateData.description_en = productData.description_en;
    if (productData.description_es !== undefined) updateData.description_es = productData.description_es;
    if (productData.category !== undefined) updateData.category = productData.category;
    if (productData.price !== undefined) updateData.price = parseFloat(productData.price);
    if (productData.imageUrl !== undefined) updateData.imageUrl = productData.imageUrl;

    const product = await prisma.product.update({
      where: { id: parseInt(productId) },
      data: updateData,
    });

    logger.info(`Product updated: ${product.id}`);
    return { success: true, data: product };
  } catch (error) {
    logger.error('Update product error:', error);
    return { success: false, error: 'INTERNAL_ERROR', message: 'Failed to update product' };
  }
};

export const deleteProduct = async (productId) => {
  try {
    const existingProduct = await prisma.product.findUnique({
      where: { id: parseInt(productId) },
    });

    if (!existingProduct) {
      return { success: false, error: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
    }

    await prisma.product.delete({
      where: { id: parseInt(productId) },
    });

    logger.info(`Product deleted: ${productId}`);
    return { success: true, message: 'Product deleted successfully' };
  } catch (error) {
    logger.error('Delete product error:', error);
    return { success: false, error: 'INTERNAL_ERROR', message: 'Failed to delete product' };
  }
};
