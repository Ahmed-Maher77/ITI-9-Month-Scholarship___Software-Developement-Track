# GraphQL API Lab

A GraphQL API built with Apollo Server, Express, and MongoDB. Features user authentication, posts, and comments with full CRUD operations and authorization guards.

## Tech Stack

- **Runtime:** Node.js
- **Server:** Express + Apollo Server (`@apollo/server`, `@as-integrations/express4`)
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JSON Web Tokens (`jsonwebtoken`) + `bcryptjs` for password hashing
- **GraphQL:** Built with the core `graphql` library (GraphQLObjectType, GraphQLSchema, etc.)

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance (local or remote)

### Installation

```bash
npm install
```

### Configuration

Create a `.env` file in the project root (a sample is already provided):

```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/graphql_task_2
JWT_SECRET=supersecretkey123
```

### Run the Server

```bash
npm start
```

Server starts at `http://localhost:4000/graphql`.

## GraphQL Schema

### Types

```
User { id, name, email, posts }
Post { id, title, content, user, comments }
Comment { id, text, user, post }
AuthPayload { token, user }
```

### Queries (Public)

| Query | Returns | Description |
|---|---|---|
| `getAllUsers` | `[User]` | List all users |
| `getUserById(id)` | `User` | Get a single user by ID |
| `getAllPosts` | `[Post]` | List all posts |
| `getPostById(id)` | `Post` | Get a single post by ID |
| `getAllComments` | `[Comment]` | List all comments |
| `getCommentById(id)` | `Comment` | Get a single comment by ID |

### Mutations

#### Authentication (No auth required)

| Mutation | Args | Description |
|---|---|---|
| `signup(name, email, password)` | All required | Register a new user, returns JWT |
| `login(email, password)` | All required | Authenticate, returns JWT |

#### Users (Auth required for update/delete)

| Mutation | Access | Description |
|---|---|---|
| `addUser(name, email, password?)` | Public | Create a user (password defaults to `password123`) |
| `updateUser(id, name?, email?)` | Owner only | Update own profile |
| `deleteUser(id)` | Owner only | Delete own account + associated posts/comments |

#### Posts (Auth required)

| Mutation | Access | Description |
|---|---|---|
| `addPost(title, content)` | Authenticated | Create a post as the logged-in user |
| `updatePost(id, title?, content?)` | Owner only | Update own post |
| `deletePost(id)` | Owner only | Delete own post + its comments |

#### Comments (Auth required)

| Mutation | Access | Description |
|---|---|---|
| `addComment(text, postId)` | Authenticated | Comment on any post |
| `updateComment(id, text?)` | Owner only | Update own comment |
| `deleteComment(id)` | Owner only | Delete own comment |

## Authentication

Include the JWT in the `Authorization` header:

```
Authorization: Bearer <token>
```

The server extracts the user context from the token and passes it to every resolver via the GraphQL context. Protected resolvers check `context.isAuth` and verify entity ownership.

## Project Structure

```
├── server.js          # Express + Apollo Server setup, JWT middleware
├── schema.js          # GraphQL types, queries, and mutations
├── data.js            # (Legacy) In-memory data — no longer used
├── .env               # Environment variables
├── package.json
├── models/
│   ├── User.js        # Mongoose User model
│   ├── Post.js        # Mongoose Post model
│   └── Comment.js     # Mongoose Comment model
└── README.md
```
