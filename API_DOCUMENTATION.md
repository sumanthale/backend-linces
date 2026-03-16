# Linces'CKF API Documentation

Production-ready backend API for the Linces'CKF e-commerce application.

## Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Installation](#installation)
4. [Environment Variables](#environment-variables)
5. [Running the Server](#running-the-server)
6. [Response Format](#response-format)
7. [API Endpoints](#api-endpoints)
8. [Error Handling](#error-handling)
9. [Authentication](#authentication)

---

## Overview

Linces'CKF Backend is a production-quality Node.js REST API for managing:
- User authentication and authorization
- Product catalog (bilingual: English/Spanish)
- Shopping cart management
- Order processing
- B2B quote requests
- Admin product management

**Base URL:** `http://localhost:3000`

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** SQLite (Prisma ORM)
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** express-validator
- **Password Hashing:** bcrypt
- **Logging:** Winston

---

## Installation

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Steps

```bash
# Clone the repository
git clone <repository-url>
cd lincesckf-backend

# Install dependencies
npm install

# Setup database
npm run migrate

# Seed initial data
npm run seed
```

---

## Environment Variables

Create a `.env` file in the project root:

```env
# Database
DATABASE_URL="file:./dev.db"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="7d"

# Server
PORT=3000
NODE_ENV="development"

# Logging
LOG_LEVEL="info"
```

---

## Running the Server

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

### Database Commands
```bash
npm run migrate     # Run migrations
npm run generate    # Generate Prisma client
npm run seed        # Seed database
npm run studio      # Open Prisma Studio (GUI)
```

---

## Response Format

### Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": 1,
    "email": "user@example.com"
  }
}
```

### Paginated Success Response

```json
{
  "success": true,
  "message": "Products fetched successfully",
  "data": [
    { "id": 1, "name_en": "Product 1" },
    { "id": 2, "name_en": "Product 2" }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Validation failed",
  "error": "VALIDATION_ERROR"
}
```

---

## API Endpoints

### Authentication

#### Register User

**POST** `/api/auth/register`

Create a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123",
  "accountType": "customer"
}
```

**Account Types:**
- `customer` - Regular customer
- `brand` - Brand/wholesale customer
- `admin` - Administrator

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "email": "user@example.com",
      "accountType": "customer"
    }
  }
}
```

**Error Responses:**
- `400` - Validation error (invalid email, weak password, etc.)
- `409` - User already exists
- `500` - Server error

**Validation Rules:**
- Email must be valid format
- Password must be at least 6 characters
- Account type must be: customer, brand, or admin

---

#### Login

**POST** `/api/auth/login`

Authenticate and receive JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "email": "user@example.com",
      "accountType": "customer"
    }
  }
}
```

**Error Responses:**
- `400` - Validation error
- `401` - Invalid credentials
- `500` - Server error

---

#### Get Current User Profile

**GET** `/api/auth/me`

Retrieve authenticated user's profile.

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "User profile fetched successfully",
  "data": {
    "id": 1,
    "email": "user@example.com",
    "accountType": "customer",
    "createdAt": "2024-03-08T10:30:00Z"
  }
}
```

**Error Responses:**
- `401` - Unauthorized (missing/invalid token)
- `404` - User not found
- `500` - Server error

---

### Products

#### Get All Products

**GET** `/api/products`

Retrieve all products with optional filtering.

**Query Parameters:**
- `category` (optional) - Filter by category
- `search` (optional) - Search in name/description
- `page` (optional, default: 1) - Page number
- `limit` (optional, default: 20) - Items per page (max: 100)

**Example Request:**
```
GET /api/products?category=chicken&search=fillet&page=1&limit=20
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Products fetched successfully",
  "data": [
    {
      "id": 1,
      "name_en": "Premium Chicken Fillet",
      "name_es": "Filete de Pollo Premium",
      "description_en": "High-quality chicken breast fillet",
      "description_es": "Filete de pechuga de pollo de alta calidad",
      "category": "chicken",
      "price": 8.99,
      "imageUrl": "https://...",
      "createdAt": "2024-03-08T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 50,
    "pages": 3
  }
}
```

**Error Responses:**
- `400` - Validation error
- `500` - Server error

---

#### Get Single Product

**GET** `/api/products/:id`

Retrieve a single product by ID.

**Path Parameters:**
- `id` (required) - Product ID (integer)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Product fetched successfully",
  "data": {
    "id": 1,
    "name_en": "Premium Chicken Fillet",
    "name_es": "Filete de Pollo Premium",
    "description_en": "High-quality chicken breast fillet",
    "description_es": "Filete de pechuga de pollo de alta calidad",
    "category": "chicken",
    "price": 8.99,
    "imageUrl": "https://...",
    "createdAt": "2024-03-08T10:30:00Z"
  }
}
```

**Error Responses:**
- `400` - Invalid product ID
- `404` - Product not found
- `500` - Server error

---

### Shopping Cart

All cart endpoints require authentication with valid JWT token in Authorization header.

#### Get Cart

**GET** `/api/cart`

Retrieve current user's shopping cart.

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Cart fetched successfully",
  "data": {
    "items": [
      {
        "id": 1,
        "userId": 1,
        "productId": 1,
        "quantity": 2,
        "product": {
          "id": 1,
          "name_en": "Premium Chicken Fillet",
          "price": 8.99
        }
      }
    ],
    "total": 17.98,
    "itemCount": 1
  }
}
```

**Error Responses:**
- `401` - Unauthorized
- `500` - Server error

---

#### Add to Cart

**POST** `/api/cart/add`

Add product to cart or update quantity if already in cart.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "productId": 1,
  "quantity": 2
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Item added to cart",
  "data": {
    "id": 1,
    "userId": 1,
    "productId": 1,
    "quantity": 2,
    "product": {
      "id": 1,
      "name_en": "Premium Chicken Fillet",
      "price": 8.99
    }
  }
}
```

**Error Responses:**
- `400` - Validation error (invalid quantity, etc.)
- `401` - Unauthorized
- `404` - Product not found
- `500` - Server error

**Validation Rules:**
- `productId` must be positive integer
- `quantity` must be integer between 1 and 999

---

#### Update Cart Item

**PUT** `/api/cart/update`

Update quantity of item in cart.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "cartItemId": 1,
  "quantity": 5
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Cart item updated successfully",
  "data": {
    "id": 1,
    "userId": 1,
    "productId": 1,
    "quantity": 5,
    "product": {
      "id": 1,
      "name_en": "Premium Chicken Fillet",
      "price": 8.99
    }
  }
}
```

**Error Responses:**
- `400` - Validation error
- `401` - Unauthorized
- `404` - Cart item not found
- `500` - Server error

---

#### Remove from Cart

**DELETE** `/api/cart/remove/:id`

Remove item from cart.

**Headers:**
```
Authorization: Bearer <token>
```

**Path Parameters:**
- `id` (required) - Cart item ID

**Success Response (200):**
```json
{
  "success": true,
  "message": "Item removed from cart",
  "data": null
}
```

**Error Responses:**
- `400` - Invalid cart item ID
- `401` - Unauthorized
- `404` - Cart item not found
- `500` - Server error

---

### Orders

All order endpoints require authentication.

#### Checkout (Create Order)

**POST** `/api/orders/checkout`

Create order from cart and clear cart.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
None

**Success Response (201):**
```json
{
  "success": true,
  "message": "Order placed successfully",
  "data": {
    "id": 1,
    "userId": 1,
    "totalAmount": 17.98,
    "createdAt": "2024-03-08T10:30:00Z",
    "orderItems": [
      {
        "id": 1,
        "orderId": 1,
        "productId": 1,
        "quantity": 2,
        "price": 8.99,
        "product": {
          "id": 1,
          "name_en": "Premium Chicken Fillet"
        }
      }
    ]
  }
}
```

**Error Responses:**
- `400` - Cart is empty
- `401` - Unauthorized
- `500` - Server error

---

#### Get User Orders

**GET** `/api/orders`

Retrieve all orders for authenticated user.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` (optional, default: 1)
- `limit` (optional, default: 20)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Orders fetched successfully",
  "data": [
    {
      "id": 1,
      "userId": 1,
      "totalAmount": 17.98,
      "createdAt": "2024-03-08T10:30:00Z",
      "orderItems": [...]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 10,
    "pages": 1
  }
}
```

**Error Responses:**
- `401` - Unauthorized
- `500` - Server error

---

#### Get Order by ID

**GET** `/api/orders/:id`

Retrieve specific order details.

**Headers:**
```
Authorization: Bearer <token>
```

**Path Parameters:**
- `id` (required) - Order ID

**Success Response (200):**
```json
{
  "success": true,
  "message": "Order fetched successfully",
  "data": {
    "id": 1,
    "userId": 1,
    "totalAmount": 17.98,
    "createdAt": "2024-03-08T10:30:00Z",
    "orderItems": [
      {
        "id": 1,
        "orderId": 1,
        "productId": 1,
        "quantity": 2,
        "price": 8.99,
        "product": { ... }
      }
    ]
  }
}
```

**Error Responses:**
- `401` - Unauthorized
- `404` - Order not found
- `500` - Server error

---

### Quotes

#### Create Quote Request

**POST** `/api/quotes`

Submit B2B quote request (public endpoint).

**Request Body:**
```json
{
  "brandName": "My Restaurant Chain",
  "email": "contact@myrestaurant.com",
  "message": "We are interested in bulk orders for our 50 restaurant locations across the country."
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Quote request submitted successfully",
  "data": {
    "id": 1,
    "brandName": "My Restaurant Chain",
    "email": "contact@myrestaurant.com",
    "message": "We are interested in bulk orders...",
    "createdAt": "2024-03-08T10:30:00Z"
  }
}
```

**Error Responses:**
- `400` - Validation error
- `500` - Server error

**Validation Rules:**
- `brandName` - 2 to 255 characters
- `email` - Valid email format
- `message` - 10 to 5000 characters

---

### Admin Endpoints

All admin endpoints require both authentication and admin role.

#### Create Product

**POST** `/api/admin/products`

Create new product (admin only).

**Headers:**
```
Authorization: Bearer <admin-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name_en": "Product Name (English)",
  "name_es": "Nombre del Producto (Español)",
  "description_en": "English description...",
  "description_es": "Descripción en español...",
  "category": "chicken",
  "price": 9.99,
  "imageUrl": "https://example.com/image.jpg"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "id": 5,
    "name_en": "Product Name (English)",
    "name_es": "Nombre del Producto (Español)",
    "price": 9.99,
    "category": "chicken",
    "imageUrl": "https://...",
    "createdAt": "2024-03-08T10:30:00Z"
  }
}
```

**Error Responses:**
- `400` - Validation error
- `401` - Unauthorized
- `403` - Forbidden (not admin)
- `500` - Server error

**Required Fields:**
- `name_en` - Product name in English
- `name_es` - Product name in Spanish
- `price` - Price (positive number)

**Optional Fields:**
- `description_en`
- `description_es`
- `category`
- `imageUrl`

---

#### Update Product

**PUT** `/api/admin/products/:id`

Update existing product (admin only).

**Headers:**
```
Authorization: Bearer <admin-token>
Content-Type: application/json
```

**Path Parameters:**
- `id` (required) - Product ID

**Request Body:**
```json
{
  "price": 12.99,
  "description_en": "Updated description"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    "id": 5,
    "name_en": "Product Name",
    "price": 12.99,
    "description_en": "Updated description",
    "createdAt": "2024-03-08T10:30:00Z"
  }
}
```

**Error Responses:**
- `400` - Validation error
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Product not found
- `500` - Server error

---

#### Delete Product

**DELETE** `/api/admin/products/:id`

Delete product (admin only).

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Path Parameters:**
- `id` (required) - Product ID

**Success Response (200):**
```json
{
  "success": true,
  "message": "Product deleted successfully",
  "data": null
}
```

**Error Responses:**
- `400` - Invalid product ID
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Product not found
- `500` - Server error

---

#### Get All Quote Requests

**GET** `/api/admin/quotes`

Retrieve all quote requests (admin only).

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Query Parameters:**
- `page` (optional, default: 1)
- `limit` (optional, default: 20)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Quote requests fetched successfully",
  "data": [
    {
      "id": 1,
      "brandName": "Company Name",
      "email": "contact@company.com",
      "message": "Quote message...",
      "createdAt": "2024-03-08T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 5,
    "pages": 1
  }
}
```

**Error Responses:**
- `401` - Unauthorized
- `403` - Forbidden
- `500` - Server error

---

## Error Handling

### Error Codes

All errors include a standardized error code:

| Error Code | HTTP Status | Description |
|-----------|-------------|-------------|
| `VALIDATION_ERROR` | 400 | Request validation failed |
| `UNAUTHORIZED` | 401 | Authentication required or invalid token |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `CONFLICT` | 409 | Resource already exists |
| `INVALID_CREDENTIALS` | 401 | Invalid email/password |
| `USER_ALREADY_EXISTS` | 409 | User account already exists |
| `PRODUCT_NOT_FOUND` | 404 | Product doesn't exist |
| `CART_ITEM_NOT_FOUND` | 404 | Cart item doesn't exist |
| `ORDER_NOT_FOUND` | 404 | Order doesn't exist |
| `EMPTY_CART` | 400 | Cannot checkout with empty cart |
| `INTERNAL_ERROR` | 500 | Server error |

---

## Authentication

### JWT Authentication

1. **Register or Login** to receive JWT token
2. **Include token** in Authorization header: `Authorization: Bearer <token>`
3. **Token expires** after 7 days (configurable)

### Default Admin Account

After seeding database:
- **Email:** `admin@lincesckf.com`
- **Password:** `admin123456`
- **Account Type:** admin

**⚠️ Change these credentials in production!**

### Token Payload

JWT tokens contain:
```json
{
  "userId": 1,
  "email": "user@example.com",
  "accountType": "customer",
  "iat": 1704892200,
  "exp": 1705497000
}
```

---

## Usage Examples

### Example 1: Register and Login

```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePassword123",
    "accountType": "customer"
  }'

# Response includes token
```

### Example 2: Browse Products and Add to Cart

```bash
# Get products
curl http://localhost:3000/api/products

# Add to cart (requires token)
curl -X POST http://localhost:3000/api/cart/add \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "productId": 1,
    "quantity": 2
  }'
```

### Example 3: Checkout

```bash
# Checkout
curl -X POST http://localhost:3000/api/orders/checkout \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Example 4: Admin - Create Product

```bash
curl -X POST http://localhost:3000/api/admin/products \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name_en": "New Product",
    "name_es": "Nuevo Producto",
    "price": 15.99,
    "category": "chicken"
  }'
```

---

## API Endpoints Summary

| Method | Endpoint | Auth | Admin | Description |
|--------|----------|------|-------|-------------|
| POST | `/api/auth/register` | No | No | Register new user |
| POST | `/api/auth/login` | No | No | Login user |
| GET | `/api/auth/me` | Yes | No | Get user profile |
| GET | `/api/products` | No | No | List products |
| GET | `/api/products/:id` | No | No | Get product by ID |
| GET | `/api/cart` | Yes | No | Get cart |
| POST | `/api/cart/add` | Yes | No | Add to cart |
| PUT | `/api/cart/update` | Yes | No | Update cart item |
| DELETE | `/api/cart/remove/:id` | Yes | No | Remove from cart |
| POST | `/api/orders/checkout` | Yes | No | Checkout |
| GET | `/api/orders` | Yes | No | Get user orders |
| GET | `/api/orders/:id` | Yes | No | Get order by ID |
| POST | `/api/quotes` | No | No | Create quote |
| POST | `/api/admin/products` | Yes | Yes | Create product |
| PUT | `/api/admin/products/:id` | Yes | Yes | Update product |
| DELETE | `/api/admin/products/:id` | Yes | Yes | Delete product |
| GET | `/api/admin/quotes` | Yes | Yes | Get all quotes |

---

## Notes

- All timestamps are in ISO 8601 format (UTC)
- Prices are stored and returned as floating-point numbers
- Cart totals are rounded to 2 decimal places
- Pagination limit maximum is 100
- All requests must include valid JSON
- CORS is enabled for all origins in development mode
