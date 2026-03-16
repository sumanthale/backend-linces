# Linces'CKF Backend

Production-quality Node.js backend for the Linces'CKF e-commerce application.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: SQLite (via Prisma ORM)
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt

## Features

- User authentication (register, login, JWT-based auth)
- Product catalog management
- Shopping cart functionality
- Order processing and checkout
- B2B quote requests
- Role-based access control (customer, brand, admin)
- Admin-only product management

## Project Structure

```
src/
├── config/
│   └── prisma.js           # Prisma client instance
├── controllers/
│   ├── authController.js   # Authentication logic
│   ├── cartController.js   # Shopping cart logic
│   ├── orderController.js  # Order processing logic
│   ├── productController.js # Product management logic
│   └── quoteController.js  # Quote request logic
├── middleware/
│   ├── authMiddleware.js       # JWT verification & role checks
│   ├── errorMiddleware.js      # Error handling
│   └── validationMiddleware.js # Request validation
├── routes/
│   ├── adminRoutes.js      # Admin endpoints
│   ├── authRoutes.js       # Auth endpoints
│   ├── cartRoutes.js       # Cart endpoints
│   ├── orderRoutes.js      # Order endpoints
│   ├── productRoutes.js    # Product endpoints
│   └── quoteRoutes.js      # Quote endpoints
├── utils/
│   └── jwt.js              # JWT token generation
├── app.js                  # Express app configuration
└── server.js               # Server initialization

prisma/
├── schema.prisma           # Database schema
├── seed.js                 # Database seeding script
└── migrations/             # Migration history
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env`:
```
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="7d"
PORT=3000
NODE_ENV="development"
```

3. Run database migration:
```bash
npm run migrate
```

4. Seed the database with admin user and sample products:
```bash
npm run seed
```

## Usage

### Development Mode

```bash
npm run dev
```

The server will start on `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run migrate` - Run Prisma migrations
- `npm run generate` - Generate Prisma client
- `npm run seed` - Seed database with initial data
- `npm run studio` - Open Prisma Studio (database GUI)

## API Endpoints

### Authentication

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "accountType": "customer"
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Get Current User
```
GET /api/auth/me
Authorization: Bearer <token>
```

### Products

#### Get All Products
```
GET /api/products
Query params:
  - category (optional)
  - search (optional)
```

#### Get Product by ID
```
GET /api/products/:id
```

### Shopping Cart (Protected)

#### Get Cart
```
GET /api/cart
Authorization: Bearer <token>
```

#### Add to Cart
```
POST /api/cart/add
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": 1,
  "quantity": 2
}
```

#### Update Cart Item
```
PUT /api/cart/update
Authorization: Bearer <token>
Content-Type: application/json

{
  "cartItemId": 1,
  "quantity": 3
}
```

#### Remove from Cart
```
DELETE /api/cart/remove/:id
Authorization: Bearer <token>
```

### Orders (Protected)

#### Checkout
```
POST /api/orders/checkout
Authorization: Bearer <token>
```

#### Get All Orders
```
GET /api/orders
Authorization: Bearer <token>
```

#### Get Order by ID
```
GET /api/orders/:id
Authorization: Bearer <token>
```

### Quotes

#### Create Quote Request
```
POST /api/quotes
Content-Type: application/json

{
  "brandName": "Company Name",
  "email": "contact@company.com",
  "message": "I would like to request a quote for..."
}
```

### Admin (Protected - Admin Only)

#### Create Product
```
POST /api/admin/products
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name_en": "Product Name",
  "name_es": "Nombre del Producto",
  "description_en": "Description",
  "description_es": "Descripción",
  "category": "chicken",
  "price": 9.99,
  "imageUrl": "https://example.com/image.jpg"
}
```

#### Update Product
```
PUT /api/admin/products/:id
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "price": 12.99
}
```

#### Delete Product
```
DELETE /api/admin/products/:id
Authorization: Bearer <admin-token>
```

#### Get All Quote Requests
```
GET /api/admin/quotes
Authorization: Bearer <admin-token>
```

## Database Schema

### User
- id (Int, Primary Key)
- email (String, Unique)
- password (String, Hashed)
- accountType (String: "customer" | "brand" | "admin")
- createdAt (DateTime)

### Product
- id (Int, Primary Key)
- name_en (String)
- name_es (String)
- description_en (String, Optional)
- description_es (String, Optional)
- category (String, Optional)
- price (Float)
- imageUrl (String, Optional)
- createdAt (DateTime)

### CartItem
- id (Int, Primary Key)
- userId (Int, Foreign Key)
- productId (Int, Foreign Key)
- quantity (Int)

### Order
- id (Int, Primary Key)
- userId (Int, Foreign Key)
- totalAmount (Float)
- createdAt (DateTime)

### OrderItem
- id (Int, Primary Key)
- orderId (Int, Foreign Key)
- productId (Int, Foreign Key)
- quantity (Int)
- price (Float)

### QuoteRequest
- id (Int, Primary Key)
- brandName (String)
- email (String)
- message (String)
- createdAt (DateTime)

## Default Admin Credentials

After running the seed script:

```
Email: admin@lincesckf.com
Password: admin123456
```

**IMPORTANT**: Change these credentials in production!

## User Roles

- **customer**: Can browse products, manage cart, and place orders
- **brand**: Same as customer (can be extended for B2B features)
- **admin**: Full access including product management and quote requests

## Security Features

- Password hashing with bcrypt (10 rounds)
- JWT-based authentication
- Protected routes with authentication middleware
- Role-based access control
- Request validation
- SQL injection prevention (via Prisma)

## Error Handling

All endpoints return consistent error responses:

```json
{
  "error": "Error message here"
}
```

HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 409: Conflict
- 500: Internal Server Error

## Development Notes

- The backend uses SQLite for easy setup and portability
- Prisma handles all database operations
- All passwords are hashed before storage
- JWT tokens expire after 7 days by default
- CORS is enabled for all origins in development

## Production Deployment

Before deploying to production:

1. Change JWT_SECRET to a strong, random value
2. Update admin credentials
3. Configure proper CORS settings
4. Set NODE_ENV to "production"
5. Consider migrating to PostgreSQL or MySQL for production use
6. Set up proper logging and monitoring
7. Implement rate limiting
8. Add HTTPS/SSL certificates

## License

ISC
