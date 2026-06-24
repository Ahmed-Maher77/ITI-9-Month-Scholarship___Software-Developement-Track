# GraphQL Assignment - Lab 1

## Student Information

* Name: YOUR_NAME
* Course: GraphQL
* Assignment: Lab 1
* Topic: GraphQL API using Node.js and Express

---

# Objective

The objective of this assignment is to design and implement a GraphQL API that manages three related entities:

1. User
2. Post
3. Comment

The project demonstrates:

* GraphQL schema design
* Relationships between entities
* Queries
* Mutations
* Resolver functions
* In-memory data handling using JavaScript arrays

---

# Technologies Used

* Node.js
* Express.js
* GraphQL
* express-graphql

---

# Important Note

This project does NOT use a real database.

Instead, all data is stored in static JavaScript arrays inside `data.js`.

This approach helps focus on:

* GraphQL schema design
* Relationship handling
* Resolver logic

---

# Project Structure

```bash
project/
│
├── server.js
├── schema.js
├── data.js
├── package.json
└── Assignments.md
```

---

# Data Models

## 1. User

Represents application users.

Fields:

* id
* name
* email

Relationship:

* One user can create many posts.

---

## 2. Post

Represents posts created by users.

Fields:

* id
* title
* content
* userId

Relationships:

* Each post belongs to one user.
* One post can have many comments.

---

## 3. Comment

Represents comments on posts.

Fields:

* id
* text
* postId
* userId

Relationships:

* Each comment belongs to one post.
* Each comment is created by one user.

---

# GraphQL Queries

The following queries were implemented:

## User Queries

* getAllUsers
* getUserById

## Post Queries

* getAllPosts
* getPostById

## Comment Queries

* getAllComments
* getCommentById

---

# Relationship Queries

The API supports nested relationships:

* Get all posts created by a user
* Get the user of a post
* Get all comments of a post
* Get the post of a comment

Example:

```graphql
{
  getAllPosts {
    title

    user {
      name
    }

    comments {
      text
    }
  }
}
```

---

# GraphQL Mutations

## User Mutations

* addUser
* updateUser
* deleteUser

## Post Mutations

* addPost
* updatePost
* deletePost

## Comment Mutations

* addComment
* updateComment
* deleteComment

---

# Example Queries

## Get All Users

```graphql
{
  getAllUsers {
    id
    name
    email
  }
}
```

---

## Get Posts with Users

```graphql
{
  getAllPosts {
    title

    user {
      name
    }
  }
}
```

---

# Example Mutations

## Add User

```graphql
mutation {
  addUser(
    name: "Ali",
    email: "ali@test.com"
  ) {
    id
    name
  }
}
```

---

## Delete Comment

```graphql
mutation {
  deleteComment(id: "1") {
    id
    text
  }
}
```

---

# How the API Works

## Queries

Queries are used to retrieve data from the API.

Example:

* Get all users
* Get a specific post

Queries do NOT modify data.

---

## Mutations

Mutations are used to modify data.

Operations include:

* Add
* Update
* Delete

---

# Resolvers

Resolvers contain the logic that fetches or modifies data.

Example:

```js
resolve(parent) {
  return posts.filter(post => post.userId === parent.id);
}
```

This resolver gets all posts belonging to a specific user.

---

# Why GraphQL?

GraphQL provides several advantages over REST APIs:

* Clients request only needed fields
* Supports nested relationships easily
* Uses a single endpoint
* Reduces over-fetching of data

---

# Running the Project

## Install Dependencies

```bash
npm install
```

## Start Server

```bash
node server.js
```

## Open GraphQL Playground

```bash
http://localhost:4000/graphql
```

---

# Conclusion

This assignment successfully demonstrates:

* GraphQL schema creation
* Relationship management
* Query and mutation operations
* Resolver implementation
* In-memory data storage

The project provides a strong foundation for understanding how GraphQL APIs work before integrating real databases such as MongoDB or PostgreSQL.
