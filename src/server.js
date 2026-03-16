import app from './app.js';
import prisma from './config/prisma.js';

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║          Linces'CKF Backend Server Started               ║
║                                                          ║
║  Server running on: http://localhost:${PORT}              ║
║  Environment: ${process.env.NODE_ENV || 'development'}                          ║
║                                                          ║
║  API Endpoints:                                          ║
║  - Auth:     /api/auth                                   ║
║  - Products: /api/products                               ║
║  - Admin:    /api/admin                                  ║
║  - Cart:     /api/cart                                   ║
║  - Orders:   /api/orders                                 ║
║  - Quotes:   /api/quotes                                 ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
  `);
});

process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(async () => {
    console.log('HTTP server closed');
    await prisma.$disconnect();
    process.exit(0);
  });
});

process.on('SIGINT', async () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(async () => {
    console.log('HTTP server closed');
    await prisma.$disconnect();
    process.exit(0);
  });
});

export default server;
