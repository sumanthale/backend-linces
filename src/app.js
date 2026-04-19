import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import quoteRoutes from './routes/quoteRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

import { errorHandler, notFoundHandler } from './middleware/errorMiddleware.js';
import { sendSuccess } from './utils/response.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  return sendSuccess(res, {
    endpoints: {
      auth: '/api/auth',
      products: '/api/products',
      admin: '/api/admin',
      cart: '/api/cart',
      orders: '/api/orders',
      quotes: '/api/quotes',
      chat: '/api/chat',
      reviews: '/api/reviews',
    },
  }, 'Welcome to Linces\'CKF API');
});

app.get('/health', (req, res) => {
  return sendSuccess(res, { timestamp: new Date().toISOString() }, 'Health check passed');
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/reviews', reviewRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
