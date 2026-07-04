# NestJS Course Labs

A comprehensive hands-on backend development journey using **NestJS**, progressing from building a simple REST API to implementing a production-inspired architecture with **PostgreSQL**, **TypeORM**, **Migrations**, **JWT Authentication**, and **Swagger**.

The labs are designed to teach the core concepts of modern backend development by gradually introducing new technologies and architectural patterns while reinforcing clean code principles and NestJS best practices.

---

## 🎯 Course Objectives

Throughout this course, you will learn how to:

* Build RESTful APIs using NestJS
* Design scalable backend applications
* Apply layered and 3-tier architectures
* Work with PostgreSQL using TypeORM
* Design relational database schemas
* Create and execute database migrations
* Validate incoming requests using DTOs
* Generate interactive API documentation with Swagger
* Implement secure authentication using JWT and Passport.js
* Protect routes with Guards
* Model entity relationships
* Apply dependency injection and modular architecture
* Follow clean code and NestJS best practices

---

# Course Roadmap

## Lab 1 — REST API Fundamentals

### Objective

Build a basic RESTful API using NestJS without a database while understanding the framework's architecture.

### Topics Covered

* NestJS Project Structure
* Modules
* Controllers
* Services
* Dependency Injection
* Layered Architecture (Controller → Service)
* CRUD Operations
* Query Parameters
* DTO Validation
* ValidationPipe
* HTTP Status Codes
* Exception Handling
* UUID Generation
* In-memory Data Storage

### Implemented Features

* Complete CRUD operations
* Filtering using query parameters
* Request validation
* Proper HTTP responses
* Error handling
* Clean project structure

---

## Lab 2 — Database Integration

### Objective

Replace the in-memory data store with PostgreSQL and implement a scalable 3-tier architecture.

### Topics Covered

* PostgreSQL
* TypeORM
* Entity Mapping
* Repository Pattern
* Custom Repositories
* 3-Tier Architecture
* Swagger Documentation
* DTO Validation
* Dependency Injection
* Database CRUD Operations

### Implemented Features

* PostgreSQL integration
* TypeORM configuration
* Order entity mapping
* Custom repository implementation
* Interactive Swagger UI
* OpenAPI documentation
* CRUD operations using a database
* Query filtering
* Validation and exception handling

---

## Lab 3 — Database Design & Authentication

### Objective

Build a secure backend application by introducing relational database design, migrations, and authentication.

### Topics Covered

### Database

* Entity Relationships
* One-to-Many
* Many-to-One
* Many-to-Many
* Join Tables
* Database Schema Design

### TypeORM

* Migrations
* Schema Versioning
* Entity Relations
* Loading Related Data

### Authentication

* Passport.js
* JWT Authentication
* Access Tokens
* Password Hashing
* bcrypt
* Guards
* Strategies
* Protected Routes

### API Security

* Authentication Guards
* User Context
* Authorization Preparation

### Implemented Features

* User registration
* User login
* Password hashing
* JWT access tokens
* Protected endpoints
* Product management
* Order management
* User–Order relationship
* Order–Product relationship
* Database migrations
* Authenticated user context
* Secure API endpoints

---

# Technologies Used

## Backend Framework

* NestJS

## Language

* TypeScript

## Database

* PostgreSQL

## ORM

* TypeORM

## Authentication

* Passport.js
* JWT
* bcrypt

## Validation

* class-validator
* class-transformer

## API Documentation

* Swagger (OpenAPI)

---

# Architecture Evolution

## Lab 1

```text
Controller
      │
      ▼
Service
```

---

## Lab 2

```text
Controller
      │
      ▼
Service
      │
      ▼
Repository
```

---

## Lab 3

```text
HTTP Request
        │
        ▼
Authentication Guard
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
PostgreSQL
```

---

# Core NestJS Concepts Learned

* Modules
* Controllers
* Services
* Providers
* Dependency Injection
* Decorators
* Pipes
* Guards
* DTOs
* Validation
* Exception Filters (built-in exceptions)
* Repositories
* Entity Relationships
* Migrations
* Authentication
* Authorization foundations
* Swagger
* Environment Configuration

---

# Database Concepts

* Entity Design
* Primary Keys
* UUIDs
* Foreign Keys
* One-to-Many Relationships
* Many-to-Many Relationships
* Join Tables
* Database Normalization Basics
* Schema Migrations

---

# Security Concepts

* Password Hashing
* JWT Access Tokens
* Authentication Flow
* Passport Strategy
* Route Protection
* Secure API Design

---

# API Features

* CRUD Operations
* Filtering
* Validation
* Error Handling
* Interactive API Documentation
* Authentication
* Protected Endpoints
* Relational Data Retrieval

---

# Best Practices Applied

* Clean Architecture
* Separation of Concerns
* Thin Controllers
* Business Logic in Services
* Repository Pattern
* Dependency Injection
* DTO-based Validation
* Meaningful HTTP Status Codes
* Exception-based Error Handling
* Modular Project Structure
* Strong TypeScript Typing
* RESTful API Design

---

# Learning Outcomes

By completing these labs, you will be able to:

* Develop RESTful APIs with NestJS
* Structure backend applications using scalable architectures
* Integrate PostgreSQL with TypeORM
* Design and implement relational database schemas
* Manage schema changes using migrations
* Secure APIs using JWT and Passport.js
* Document APIs with Swagger
* Validate and sanitize incoming requests
* Build maintainable, modular, and production-ready backend applications

---

# Project Progression

| Lab       | Focus                    | Main Concepts                                                     |
| --------- | ------------------------ | ----------------------------------------------------------------- |
| **Lab 1** | REST API Fundamentals    | Controllers, Services, CRUD, DTOs, Validation                     |
| **Lab 2** | Database Integration     | PostgreSQL, TypeORM, Repositories, Swagger                        |
| **Lab 3** | Security & Relationships | Migrations, Entity Relationships, JWT Authentication, Passport.js |

---

## Conclusion

This course provides a progressive learning path from the fundamentals of NestJS to building secure, database-driven REST APIs following modern backend development practices. By the end of the labs, students gain practical experience with application architecture, database design, API documentation, authentication, and clean software engineering principles that form the foundation of enterprise-grade NestJS applications.
