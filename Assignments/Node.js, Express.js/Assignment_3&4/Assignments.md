# Task 1: Create Models

## 1) Category Model

Fields:

- name (String, required, unique)
- description (String, optional)

## 2) Product Model

Fields:

- name (String, required)
- price (Number, required)
- category (ObjectId, reference to Category, required)
- createdAt
- updateAt

# Task 2: Controllers & CRUD

## 1) Category Controller

- Create Category
- Get All Categories
- Get All Products Under a Category

## 2) Product Controller

- Create Product
- Get All Products
- Get Product by ID
- Update Product
- Delete Product

# Task 3: Routes

| Resource   | Method | Route                    | Description                     |
| ---------- | ------ | ------------------------ | ------------------------------- |
| Categories | POST   | /categories              | Create a new category           |
| Categories | GET    | /categories              | Get all categories              |
| Categories | GET    | /categories/:id/products | Get all products under category |
| Products   | POST   | /products                | Create a new product            |
| Products   | GET    | /products                | Get all products                |
| Products   | GET    | /products/:id            | Get product by ID               |
| Products   | PATCH  | /products/:id            | Update product                  |
| Products   | DELETE | /products/:id            | Delete product                  |
