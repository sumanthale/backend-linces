import bcrypt from 'bcrypt';
import prisma from '../config/prisma.js';
import { generateToken } from '../utils/jwt.js';
import logger from '../utils/logger.js';

export const registerUser = async (email, password, accountType, name) => {
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return { success: false, error: 'USER_ALREADY_EXISTS', message: 'User already exists' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, accountType, name },
    });

    const token = generateToken(user);
    logger.info(`User registered: ${email}`);

    return {
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          accountType: user.accountType,
          name: user.name,
        },
      },
    };
  } catch (error) {
    logger.error('Register error:', error);
    return { success: false, error: 'INTERNAL_ERROR', message: 'Failed to register user' };
  }
};

export const loginUser = async (email, password) => {
  
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user) {
      return { success: false, error: 'INVALID_CREDENTIALS', message: 'Invalid credentials' };
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return { success: false, error: 'INVALID_CREDENTIALS', message: 'Invalid credentials' };
    }

    const token = generateToken(user);
    logger.info(`User logged in: ${email}`);

    return {
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          accountType: user.accountType,
          name: user.name,
        },
      },
    };
  } catch (error) {
    logger.error('Login error:', error);
    return { success: false, error: 'INTERNAL_ERROR', message: 'Failed to login' };
  }
};

export const getUserProfile = async (userId) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        accountType: true,
        createdAt: true,
        name: true,
      },
    });

    if (!user) {
      return { success: false, error: 'USER_NOT_FOUND', message: 'User not found' };
    }

    return { success: true, data: user };
  } catch (error) {
    logger.error('Get profile error:', error);
    return { success: false, error: 'INTERNAL_ERROR', message: 'Failed to fetch user profile' };
  }
};
