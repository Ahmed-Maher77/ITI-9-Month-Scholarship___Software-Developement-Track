require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@as-integrations/express4");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const schema = require("./schema");

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/graphql_task_2";
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB successfully."))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// JWT Authentication Middleware
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  const token = authHeader.split(" ")[1]; // Expected format: Bearer <token>
  if (!token || token === "") {
    req.isAuth = false;
    return next();
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "supersecretkey123");
    req.isAuth = true;
    req.user = decoded; // { id, email }
    next();
  } catch (err) {
    req.isAuth = false;
    next();
  }
};

app.use(authMiddleware);

async function startServer() {
  const server = new ApolloServer({
    schema,
  });

  await server.start();

  app.use(
    "/graphql",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({
        user: req.user,
        isAuth: req.isAuth,
      }),
    })
  );

  app.listen(PORT, () => {
    console.log(`GraphQL API server running at http://localhost:${PORT}/graphql`);
  });
}

startServer().catch((err) => {
  console.error("Error starting Apollo Server:", err);
});
