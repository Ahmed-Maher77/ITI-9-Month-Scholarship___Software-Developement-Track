# Node.js Session 3 Summary

This README summarizes the content from the presentation file **day3 node js.pptx**.

## Topics Covered

- Middleware in Express.js
- Mongoose
- MVC pattern
- Project structure

## 1) Middleware in Express.js

Middleware are functions that run during the request-response lifecycle.

### What middleware can do

- Execute any code
- Read or modify `req` and `res`
- Send a response and end the cycle
- Call `next()` to pass control to the next middleware

### Types of middleware

1. Application-level middleware
2. Router-level middleware
3. Error-handling middleware
4. Built-in middleware
5. Third-party middleware

### Application-level middleware

- Attached to the app instance using `app.use()` or `app.METHOD()` like `app.get()` / `app.post()`
- `app.use()` can run on a specific path or all requests if no path is provided

### Built-in middleware examples

- `express.static` for serving static files
- `express.json` for parsing JSON request bodies

### Error-handling middleware

- Always has 4 arguments: `(err, req, res, next)`
- Should be placed after all routes and other middleware

### Router-level middleware

- Split routes into separate files instead of putting all routes in one file

## 2) Mongoose

Mongoose is a popular ODM (Object Data Modeling) library for MongoDB.

### Core ideas

- Schema definition for document structure, field types, and validation
- Model layer as a wrapper around MongoDB collections
- Promise-based async operations (`async/await`)
- Built-in validation support
- Middleware/hooks before and after database operations
- Easier querying and data relationships

### Steps to use Mongoose

1. Install package:

```bash
npm i mongoose
```

2. Connect to MongoDB database
3. Define schema
4. Create model

## 3) CRUD Operations in Mongoose

### Create

- `new Model() + save()`
- `Model.create()`

### Read

- `find()`
- `findOne()`
- `findById()`

### Update

- `updateOne()`
- `updateMany()`
- `findOneAndUpdate()`
- `findByIdAndUpdate()`

### Delete

- `deleteOne()`
- `deleteMany()`
- `findOneAndDelete()`
- `findByIdAndDelete()`

## 4) MVC Pattern

MVC is an architectural pattern that separates the app into:

- Model: Handles data and business logic (schemas, database operations)
- View: Handles presentation/UI
- Controller: Handles requests, applies logic, interacts with model, sends responses

## 5) Suggested Project Structure (MVC)

```text
project/
  controllers/
  models/
  routes/
  middleware/
  views/
  app.js
```

## Quick Recap

This session focused on structuring Express applications with middleware and MVC, and using Mongoose effectively for MongoDB data modeling and CRUD operations.
