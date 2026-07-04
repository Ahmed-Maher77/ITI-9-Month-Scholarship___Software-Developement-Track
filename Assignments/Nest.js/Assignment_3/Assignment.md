# NestJS Course – Lab 3 (TechXpress)

## Objective

Build a secure RESTful API using **NestJS**, **TypeORM**, **PostgreSQL**, **TypeORM Migrations**, and **JWT Authentication** while implementing entity relationships and protecting endpoints with authentication.

---

# Project Name

**TechXpress**

---

# Tech Stack

- NestJS
- TypeORM
- PostgreSQL
- TypeORM Migrations
- Swagger (OpenAPI)
- Passport.js
- JWT
- bcrypt
- class-validator
- class-transformer

---

# 1. Database Schema

Implement the following entities.

## User

| Field | Type |
|-------|------|
| id | UUID |
| username | string |
| email | string (unique) |
| password | string (hashed) |

Relationship:

- One User can create many Orders.

---

## Product

| Field | Type |
|-------|------|
| id | UUID |
| name | string |
| price | number |

Relationship:

- One Product can belong to many Orders.

---

## Order

| Field | Type |
|-------|------|
| id | UUID |
| amount | number |
| longitude | number |
| latitude | number |
| paymentMethod | Cash \| Visa |

Relationships:

- Belongs to one User (Client)
- Contains many Products

---

# 2. Entity Relationships

## User ↔ Order

One-to-Many

```text
User (1)
   │
   │
   ▼
Order (∞)
```

- One User can have many Orders.
- Each Order belongs to one User.

---

## Order ↔ Product

Many-to-Many

```text
Order (∞)
    │
    │
    ▼
Product (∞)
```

- One Order contains many Products.
- One Product can exist in many Orders.

---

# 3. Database Migrations

Use **TypeORM Migrations**.

Tasks:

- Configure migrations
- Generate migration
- Apply migration to PostgreSQL

Do **not** rely on automatic schema synchronization.

---

# 4. Swagger

Configure Swagger documentation.

Requirements:

- Swagger UI
- OpenAPI JSON
- Document all endpoints
- Document DTOs
- Support Bearer Authentication

Swagger URL:

```text
/api
```

---

# 5. Authentication

Implement JWT Authentication using Passport.js.

## Signup

```http
POST /auth/signup
```

Requirements:

- Create new user
- Email must be unique
- Hash password before saving

---

## Signin

```http
POST /auth/signin
```

Requirements:

- Validate email/password
- Generate JWT access token

Example response:

```json
{
  "access_token": "..."
}
```

---

# 6. Protect Endpoints

Protect all Product and Order endpoints using JWT Authentication.

Authenticated users only.

---

# 7. Current User

After JWT validation,

make the authenticated user available inside controllers.

Example:

```ts
req.user
```

or

```ts
@CurrentUser()
```

---

# 8. DTO Validation

Create DTOs with validation for:

- Signup
- Signin
- Create Product
- Create Order

Enable global ValidationPipe:

- whitelist
- transform
- forbidNonWhitelisted

---

# 9. REST Endpoints

## Products

### Get All Products

```http
GET /products
```

---

### Create Product

```http
POST /products
```

---

## Orders

### Create Order

```http
POST /orders
```

The authenticated user becomes the client automatically.

The request body should include:

- amount
- longitude
- latitude
- paymentMethod
- array of Product IDs

---

### Get Order Details

```http
GET /orders/:id
```

Return:

- Order information
- Client information
- Ordered products

---

# 10. Architecture

Use **3-Tier Architecture**.

```text
HTTP Request
      │
      ▼
Controller
      │
      ▼
Service
      │
      ▼
Repository
      │
      ▼
PostgreSQL Database
```

Responsibilities:

- **Controller** → Handle HTTP requests/responses
- **Service** → Business logic
- **Repository** → Database operations

---

# 11. Error Handling

Use appropriate NestJS exceptions.

Examples:

| Exception | Status Code |
|----------|-------------|
| BadRequestException | 400 |
| UnauthorizedException | 401 |
| NotFoundException | 404 |
| ConflictException | 409 |

---

# 12. HTTP Status Codes

Return appropriate responses.

| Code | Meaning |
|------|---------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 409 | Conflict |

---

# 13. Best Practices

- Follow NestJS conventions.
- Use Dependency Injection.
- Keep controllers thin.
- Place business logic inside services.
- Use repositories for database access.
- Use DTO validation.
- Hash passwords with bcrypt.
- Secure endpoints with JWT guards.
- Keep code clean, modular, and readable.

---

# 14. Deliverables

The final project should include:

- NestJS project named **TechXpress**
- PostgreSQL integration
- TypeORM entities
- Entity relationships
- TypeORM migrations
- Swagger documentation
- JWT authentication
- Passport.js integration
- Password hashing
- Protected endpoints
- Current authenticated user access
- DTO validation
- CRUD functionality for Products and Orders
- Proper error handling
- Clean 3-tier architecture