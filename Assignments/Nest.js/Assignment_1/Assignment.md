# NestJS Course – Lab 1

## Objective

Build a RESTful Web API using **NestJS** while following the **Layered Architecture** pattern (Controller → Service).

---

## Project Name

**TechXpress**

---

## Requirements

### 1. Create the Project

Create a new NestJS project named:

```text
TechXpress
```

---

### 2. Create the Order Entity

The `Order` entity should contain the following properties:

| Property      | Type            |
| ------------- | --------------- |
| id            | string (UUID)   |
| amount        | number          |
| longitude     | number          |
| latitude      | number          |
| clientId      | number          |
| paymentMethod | "Cash" | "Visa" |

---

### 3. Create Sample Data

Create a data file containing sample orders.

Example:

```ts
import { randomUUID } from 'crypto';

export const orders = [
  {
    id: randomUUID(),
    amount: 1230.5,
    longitude: 23.21,
    latitude: 31.01,
    clientId: 1,
    paymentMethod: 'Cash',
  },
];
```

Use an in-memory array only (no database).

---

### 4. Implement REST Endpoints

#### Get All Orders

```http
GET /orders
```

Supports optional query parameters:

* `clientId`
* `paymentMethod`

Examples:

```http
GET /orders
GET /orders?clientId=1
GET /orders?paymentMethod=Cash
GET /orders?clientId=2&paymentMethod=Visa
```

---

#### Get Order by ID

```http
GET /orders/:id
```

---

#### Create Order

```http
POST /orders
```

---

#### Update Order

```http
PUT /orders/:id
```

---

#### Delete Order

```http
DELETE /orders/:id
```

---

### 5. HTTP Status Codes

Return appropriate status codes:

| Status | Meaning     |
| ------ | ----------- |
| 200    | OK          |
| 201    | Created     |
| 204    | No Content  |
| 400    | Bad Request |
| 404    | Not Found   |

---

### 6. Architecture

Use NestJS Layered Architecture:

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
In-Memory Data
      │
      ▼
HTTP Response
```

Business logic should reside in the **Service**, while the **Controller** should only handle HTTP requests and responses.

---

## Technical Requirements

* Use TypeScript.
* Follow NestJS best practices.
* Use Dependency Injection.
* Validate request bodies using DTOs.
* Enable a global `ValidationPipe`.
* Use `class-validator` and `class-transformer`.
* Use `PartialType()` for the Update DTO.
* Generate IDs using `randomUUID()`.
* Handle errors using NestJS exceptions.
* Do not use a database.
* Do not implement authentication.
* Keep the project clean, readable, and well-structured.

---

## Deliverables

The final project should include:

* NestJS project named **TechXpress**
* Layered Architecture (Controller → Service)
* Order entity/interface
* DTOs with validation
* Sample in-memory data
* CRUD endpoints
* Query parameter filtering
* Proper HTTP status codes
* Exception handling
* Clean, maintainable TypeScript code
