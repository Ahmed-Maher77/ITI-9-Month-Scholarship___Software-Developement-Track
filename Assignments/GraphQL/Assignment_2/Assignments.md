# GraphQL Assignment 2 — Full-Stack GraphQL API with MongoDB & JWT Authentication

## Overview

Build a production-grade GraphQL API using Apollo Server, Express, and MongoDB. The API supports full CRUD operations across three entities (**Users**, **Posts**, **Comments**) with JWT-based authentication and authorization guards.

---

## Learning Objectives

- Design a GraphQL schema using the core `graphql` library (SDL types, queries, mutations)
- Integrate Apollo Server with Express via `@as-integrations/express4`
- Model data with Mongoose ODM and persist to MongoDB
- Implement password hashing with bcryptjs
- Issue and verify JSON Web Tokens (JWT) for authentication
- Enforce resource ownership for authorized mutations

---

## Tech Stack

| Layer          | Technology                                     |
|----------------|------------------------------------------------|
| Runtime        | Node.js 18+                                    |
| Server         | Express + Apollo Server                        |
| Database       | MongoDB + Mongoose ODM                         |
| Authentication | JWT (`jsonwebtoken`) + bcryptjs                |
| GraphQL        | Core `graphql` package (v16)                   |

---

## Project Structure

```
solution/
├── server.js            # Express + Apollo Server setup, JWT middleware
├── schema.js            # GraphQL types, queries, and mutations
├── data.js              # (Legacy) In-memory data — no longer used
├── .env                 # Environment variables (PORT, MONGODB_URI, JWT_SECRET)
├── .gitignore
├── package.json
├── README.md
└── models/
    ├── User.js          # Mongoose User model
    ├── Post.js          # Mongoose Post model
    └── Comment.js       # Mongoose Comment model
```

---

## Schema Design

### Types

| Type          | Fields                                    |
|---------------|-------------------------------------------|
| `User`        | `id`, `name`, `email`, `posts`            |
| `Post`        | `id`, `title`, `content`, `user`, `comments` |
| `Comment`     | `id`, `text`, `user`, `post`              |
| `AuthPayload` | `token`, `user`                           |

Relationships are resolved via database lookups (e.g., `Post.user` fetches the author, `User.posts` fetches all posts by that user).

### Queries (Public — no authentication required)

| Query                 | Returns     | Description              |
|-----------------------|-------------|--------------------------|
| `getAllUsers`         | `[User]`    | List all users           |
| `getUserById(id)`     | `User`      | Get a single user by ID  |
| `getAllPosts`         | `[Post]`    | List all posts           |
| `getPostById(id)`     | `Post`      | Get a single post by ID  |
| `getAllComments`      | `[Comment]` | List all comments        |
| `getCommentById(id)`  | `Comment`   | Get a single comment by ID |

### Mutations

#### Authentication (Public)

| Mutation                 | Args                         | Description                         |
|--------------------------|------------------------------|-------------------------------------|
| `signup(name, email, password)` | All required       | Register a new user, returns JWT    |
| `login(email, password)`      | All required          | Authenticate existing user, returns JWT |

#### Users

| Mutation                         | Access  | Description                                          |
|----------------------------------|---------|------------------------------------------------------|
| `addUser(name, email, password?)`| Public  | Create a user manually (password defaults to `password123`) |
| `updateUser(id, name?, email?)`  | Owner   | Update own profile                                   |
| `deleteUser(id)`                 | Owner   | Delete own account + cascading posts/comments        |

#### Posts

| Mutation                           | Access | Description                              |
|------------------------------------|--------|------------------------------------------|
| `addPost(title, content)`          | Auth   | Create a post as the logged-in user      |
| `updatePost(id, title?, content?)` | Owner  | Update own post                          |
| `deletePost(id)`                   | Owner  | Delete own post + its comments           |

#### Comments

| Mutation                      | Access | Description                        |
|-------------------------------|--------|------------------------------------|
| `addComment(text, postId)`    | Auth   | Add a comment to any post          |
| `updateComment(id, text?)`   | Owner  | Update own comment                 |
| `deleteComment(id)`           | Owner  | Delete own comment                 |

---

## Authentication Flow

1. **Signup / Login** — user provides email + password; server hashes the password (bcryptjs, 12 rounds) and returns a signed JWT.
2. **Request context** — every incoming request passes through a middleware that extracts the `Authorization: Bearer <token>` header, verifies it with `jsonwebtoken.verify()`, and attaches `{ user, isAuth }` to the GraphQL context.
3. **Authorization** — protected resolvers check `context.isAuth`. Mutations that modify or delete resources additionally verify that `context.user.id` matches the resource owner.

---

## Setup & Running

### Prerequisites

- Node.js 18+
- MongoDB instance running locally or remotely

### Installation

```bash
cd solution
npm install
```

### Configuration (`.env`)

```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/graphql_task_2
JWT_SECRET=supersecretkey123
```

### Start the Server

```bash
npm start
```

Server is available at `http://localhost:4000/graphql`.

---

## Example Queries & Mutations

### Signup

```graphql
mutation {
  signup(name: "John Doe", email: "john@example.com", password: "secret123") {
    token
    user { id name email }
  }
}
```

### Login

```graphql
mutation {
  login(email: "john@example.com", password: "secret123") {
    token
    user { id name email }
  }
}
```

### Create a Post (Authenticated)

```graphql
mutation {
  addPost(title: "Hello World", content: "My first post") {
    id title content
  }
}
```

### Query Posts with Related Data

```graphql
query {
  getAllPosts {
    id title content
    user { id name email }
    comments { id text user { name } }
  }
}
```

### Update Own Post (Owner only)

```graphql
mutation {
  updatePost(id: "POST_ID", title: "Updated Title") {
    id title content
  }
}
```

### Delete Own Account (Owner only)

```graphql
mutation {
  deleteUser(id: "USER_ID") {
    id name
  }
}
```

---

## Security & Edge Cases Handled

| Concern                    | Implementation                                                                 |
|----------------------------|--------------------------------------------------------------------------------|
| Duplicate email            | Checked before signup/addUser; unique index in Mongoose schema                 |
| Weak / missing JWT         | Middleware sets `isAuth = false`; protected resolvers reject with `Unauthenticated` |
| Expired / invalid JWT      | `jwt.verify()` throws; caught by middleware → `isAuth = false`                 |
| Cross-resource ownership   | Every update/delete mutation verifies `resource.userId === context.user.id`    |
| Cascading deletes          | Deleting a user removes their posts and comments; deleting a post removes its comments |
| Missing optional fields    | Mutation resolvers check `!== undefined` before overwriting                    |

---

## Key Dependencies

```json
{
  "@apollo/server": "^5.5.1",
  "@as-integrations/express4": "^1.1.2",
  "bcryptjs": "^3.0.3",
  "cors": "^2.8.6",
  "dotenv": "^17.4.2",
  "express": "^4.18.2",
  "graphql": "^16.14.2",
  "jsonwebtoken": "^9.0.3",
  "mongoose": "^9.7.1"
}
```

---

## Notes

- The file `data.js` contains legacy in-memory seed data and is **not** used by the current MongoDB-backed implementation.
- All queries are **public**; all mutations (except `signup`, `login`, and `addUser`) require authentication.
- The `addUser` mutation is provided as a convenience for seeding users without going through signup (no JWT returned).
