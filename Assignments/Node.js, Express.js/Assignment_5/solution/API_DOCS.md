# API Documentation

## Overview

This is a Node.js REST API built with Express.js, featuring JWT-based authentication, role-based authorization, and product management capabilities. The API uses MongoDB for data persistence and supports secure password reset via email.

---

## Base URL

```
http://localhost:3000/api
```

---

## Authentication

### JWT Token

- **Location**: `ITI_ACCESS_TOKEN` cookie or `Authorization: Bearer <token>` header
- **Expiry**: 1 hour
- **Secured with**: httpOnly, SameSite=Strict
- **Payload**: `{ userId, email, role }`

### Roles

- `user` - Standard user (default role)
- `admin` - Administrator with elevated privileges

---

## Error Handling

All errors follow a consistent format:

```json
{
    "message": "Error description",
    "statusCode": 400
}
```

### Common Status Codes

| Code | Meaning               |
| ---- | --------------------- |
| 200  | OK                    |
| 201  | Created               |
| 400  | Bad Request           |
| 401  | Unauthorized          |
| 403  | Forbidden             |
| 404  | Not Found             |
| 500  | Internal Server Error |

---

## Authentication Endpoints

### Register User

Create a new user account

```http
POST /auth/register
```

**Request Body:**

```json
{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "securePassword123"
}
```

**Validation Rules:**

- Username: 3-50 characters, alphanumeric with single spaces allowed
- Email: Valid email format
- Password: 6-100 characters
- Role: Force set to `user` (cannot be overridden)

**Response (201):**

```json
{
    "message": "User registered successfully",
    "user": {
        "_id": "6123ef45a1b2c3d4e5f6g7h8",
        "username": "john_doe",
        "email": "john@example.com",
        "role": "user"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Errors:**

- `400` - Email already registered
- `400` - Validation error

---

### Login User

Authenticate and receive JWT token

```http
POST /auth/login
```

**Request Body:**

```json
{
    "email": "john@example.com",
    "password": "securePassword123"
}
```

**Response (201):**

```json
{
    "message": "User logged in successfully",
    "user": {
        "_id": "6123ef45a1b2c3d4e5f6g7h8",
        "username": "john_doe",
        "email": "john@example.com",
        "role": "user"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Cookie Set:**

- `ITI_ACCESS_TOKEN` (httpOnly, SameSite=Strict, secure)

**Errors:**

- `401` - Invalid credentials
- `400` - Validation error

---

### Logout User

Clear authentication and session

```http
POST /auth/logout
```

**Authentication:** Required ✔️

**Response (200):**

```json
{
    "message": "User logged out successfully"
}
```

**Cookie Cleared:**

- `ITI_ACCESS_TOKEN`

**Errors:**

- `401` - Not authenticated

---

### Forgot Password

Request password reset token via email

```http
POST /auth/forgot-password
```

**Request Body:**

```json
{
    "email": "john@example.com"
}
```

**Response (200):**

```json
{
    "message": "Password reset link sent to your email",
    "tokenExpiry": "15 minutes"
}
```

**Email Sent With:**

- Reset link: `http://localhost:3000/api/auth/reset-password/{token}`
- Valid for 15 minutes
- Can only be used once

**Errors:**

- `404` - User not found
- `400` - Validation error

---

### Reset Password

Update password using reset token

```http
POST /auth/reset-password/:resetPasswordToken
```

**URL Parameters:**

- `resetPasswordToken` - Token received in email (64 hex characters)

**Request Body:**

```json
{
    "newPassword": "newSecurePassword456"
}
```

**Validation Rules:**

- New password: 6-100 characters

**Response (200):**

```json
{
    "message": "Password reset successfully"
}
```

**Errors:**

- `400` - Invalid or expired token
- `404` - User not found
- `400` - Validation error

---

## Product Endpoints

### Create Product (Admin Only)

Add a new product to the catalog

```http
POST /products
```

**Authentication:** Required ✔️  
**Authorization:** Admin role required

**Request Body:**

```json
{
    "name": "Wireless Headphones",
    "description": "Premium noise-cancelling headphones",
    "price": 199.99,
    "category": "Electronics",
    "image": "https://example.com/image.jpg"
}
```

**Validation Rules:**

- Name: Required, string
- Description: Required, string
- Price: Required, minimum 0.01
- Category: Required, string
- Image: Required, URL string

**Response (201):**

```json
{
    "message": "Product added successfully",
    "product": {
        "_id": "6234ab89c1d2e3f4g5h6i7j8",
        "name": "Wireless Headphones",
        "description": "Premium noise-cancelling headphones",
        "price": 199.99,
        "category": "Electronics",
        "image": "https://example.com/image.jpg",
        "publishedBy": "6123ef45a1b2c3d4e5f6g7h8",
        "createdAt": "2024-04-04T10:30:00Z",
        "updatedAt": "2024-04-04T10:30:00Z"
    }
}
```

**Errors:**

- `401` - Not authenticated
- `403` - Insufficient permissions (not admin)
- `400` - Validation error
- `404` - Publisher user not found

---

### Get All Products

Retrieve all products in the catalog

```http
GET /products
```

**Authentication:** Required ✔️

**Query Parameters:** None

**Response (200):**

```json
{
    "message": "Products retrieved successfully",
    "products": [
        {
            "_id": "6234ab89c1d2e3f4g5h6i7j8",
            "name": "Wireless Headphones",
            "description": "Premium noise-cancelling headphones",
            "price": 199.99,
            "category": "Electronics",
            "image": "https://example.com/image.jpg",
            "publishedBy": {
                "_id": "6123ef45a1b2c3d4e5f6g7h8",
                "username": "admin_user",
                "email": "admin@example.com"
            },
            "createdAt": "2024-04-04T10:30:00Z",
            "updatedAt": "2024-04-04T10:30:00Z"
        }
    ]
}
```

**Errors:**

- `401` - Not authenticated

---

### Get Product by ID

Retrieve a specific product

```http
GET /products/:productId
```

**Authentication:** Required ✔️

**URL Parameters:**

- `productId` - MongoDB ObjectId (24 hex characters)

**Response (200):**

```json
{
    "message": "Product retrieved successfully",
    "product": {
        "_id": "6234ab89c1d2e3f4g5h6i7j8",
        "name": "Wireless Headphones",
        "description": "Premium noise-cancelling headphones",
        "price": 199.99,
        "category": "Electronics",
        "image": "https://example.com/image.jpg",
        "publishedBy": {
            "_id": "6123ef45a1b2c3d4e5f6g7h8",
            "username": "admin_user",
            "email": "admin@example.com"
        },
        "createdAt": "2024-04-04T10:30:00Z",
        "updatedAt": "2024-04-04T10:30:00Z"
    }
}
```

**Errors:**

- `401` - Not authenticated
- `400` - Invalid product ID format
- `404` - Product not found

---

### Get Products by Admin

Retrieve all products published by a specific admin

```http
GET /products/admin/:adminId
```

**Authentication:** Required ✔️  
**Authorization:** Admin role required

**URL Parameters:**

- `adminId` - MongoDB ObjectId of admin user (24 hex characters)

**Response (200):**

```json
{
    "message": "Admin products retrieved successfully",
    "products": [
        {
            "_id": "6234ab89c1d2e3f4g5h6i7j8",
            "name": "Wireless Headphones",
            "price": 199.99,
            "category": "Electronics",
            "publishedBy": "6123ef45a1b2c3d4e5f6g7h8",
            "createdAt": "2024-04-04T10:30:00Z"
        }
    ]
}
```

**Errors:**

- `401` - Not authenticated
- `403` - Insufficient permissions (not admin)
- `400` - Invalid admin ID format
- `404` - Admin user not found or admin has no products
