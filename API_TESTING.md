# API Testing Guide

This document provides examples for testing all API endpoints using curl or any HTTP client.

## Base URL
```
http://localhost:3000
```

## 1. Health Check

```bash
curl http://localhost:3000/health
```

## 2. Authentication

### Register a Customer
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "customer@test.com",
    "password": "password123",
    "accountType": "customer"
  }'
```

### Register a Brand
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "brand@test.com",
    "password": "password123",
    "accountType": "brand"
  }'
```

### Login (Customer)
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "customer@test.com",
    "password": "password123"
  }'
```

### Login (Admin)
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@lincesckf.com",
    "password": "admin123456"
  }'
```

**Save the token from the response for authenticated requests!**

### Get Current User Info
```bash
curl http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 3. Products

### Get All Products
```bash
curl http://localhost:3000/api/products
```

### Get Products by Category
```bash
curl "http://localhost:3000/api/products?category=chicken"
```

### Search Products
```bash
curl "http://localhost:3000/api/products?search=fillet"
```

### Get Single Product
```bash
curl http://localhost:3000/api/products/1
```

## 4. Shopping Cart (Requires Authentication)

### Get Cart
```bash
curl http://localhost:3000/api/cart \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Add Item to Cart
```bash
curl -X POST http://localhost:3000/api/cart/add \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "productId": 1,
    "quantity": 2
  }'
```

### Update Cart Item
```bash
curl -X PUT http://localhost:3000/api/cart/update \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "cartItemId": 1,
    "quantity": 5
  }'
```

### Remove Item from Cart
```bash
curl -X DELETE http://localhost:3000/api/cart/remove/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 5. Orders (Requires Authentication)

### Checkout (Create Order from Cart)
```bash
curl -X POST http://localhost:3000/api/orders/checkout \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Get All Orders
```bash
curl http://localhost:3000/api/orders \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Get Single Order
```bash
curl http://localhost:3000/api/orders/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 6. Quote Requests

### Submit Quote Request
```bash
curl -X POST http://localhost:3000/api/quotes \
  -H "Content-Type: application/json" \
  -d '{
    "brandName": "Test Company LLC",
    "email": "quotes@testcompany.com",
    "message": "We are interested in bulk orders for our restaurant chain."
  }'
```

## 7. Admin Endpoints (Requires Admin Token)

First, login as admin and get the token:

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@lincesckf.com",
    "password": "admin123456"
  }'
```

### Create Product
```bash
curl -X POST http://localhost:3000/api/admin/products \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name_en": "Spicy Chicken Tenders",
    "name_es": "Tiras de Pollo Picantes",
    "description_en": "Crispy and spicy chicken tenders",
    "description_es": "Tiras de pollo crujientes y picantes",
    "category": "chicken",
    "price": 7.99,
    "imageUrl": "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg"
  }'
```

### Update Product
```bash
curl -X PUT http://localhost:3000/api/admin/products/1 \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "price": 9.99,
    "description_en": "Updated description"
  }'
```

### Delete Product
```bash
curl -X DELETE http://localhost:3000/api/admin/products/5 \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE"
```

### Get All Quote Requests
```bash
curl http://localhost:3000/api/admin/quotes \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE"
```

## Complete Workflow Example

### 1. Register and Login
```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123456",
    "accountType": "customer"
  }'

# Login (save the token)
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123456"
  }'
```

### 2. Browse Products
```bash
curl http://localhost:3000/api/products
```

### 3. Add Items to Cart
```bash
TOKEN="your_token_here"

curl -X POST http://localhost:3000/api/cart/add \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"productId": 1, "quantity": 2}'

curl -X POST http://localhost:3000/api/cart/add \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"productId": 2, "quantity": 1}'
```

### 4. View Cart
```bash
curl http://localhost:3000/api/cart \
  -H "Authorization: Bearer $TOKEN"
```

### 5. Checkout
```bash
curl -X POST http://localhost:3000/api/orders/checkout \
  -H "Authorization: Bearer $TOKEN"
```

### 6. View Orders
```bash
curl http://localhost:3000/api/orders \
  -H "Authorization: Bearer $TOKEN"
```

## Testing with Postman

1. Import the following endpoints into Postman
2. Create an environment variable called `token`
3. After login, save the token to the environment variable
4. Use `{{token}}` in the Authorization header

## Expected Response Formats

### Success Response (200/201)
```json
{
  "message": "Success message",
  "data": {}
}
```

### Error Response (4xx/5xx)
```json
{
  "error": "Error message"
}
```

## Common HTTP Status Codes

- `200 OK` - Request succeeded
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Missing or invalid token
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `409 Conflict` - Resource already exists
- `500 Internal Server Error` - Server error

## Tips

1. Always include `Content-Type: application/json` header for POST/PUT requests
2. Include `Authorization: Bearer <token>` header for protected endpoints
3. Admin token is required for admin endpoints
4. Cart operations require user authentication
5. Tokens expire after 7 days by default
