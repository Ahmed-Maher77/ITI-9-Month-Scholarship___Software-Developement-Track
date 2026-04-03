# Authentication & Authorization Assignment (JWT + bcryptjs + dotenv)

## 1. User Model

Each user must have:

- `id` (auto-increment)
- `username` (string)
- `email` (string, unique)
- `password` (string, hashed)
- `role` (string: `"user"` or `"admin"`)

## 2. Routes to Implement

### POST /auth/register

- Accept `username`, `email`, `password`, `role` (role is optional, default `"user"`).
- Check if email already exists.
- Hash the password using `bcryptjs` (salt rounds = 10).
- Store the new user.
- Generate a JWT token (payload: `userId`, `email`, `role`, expires in 1h).
- Respond with the token and user info (excluding password).

### POST /auth/login

- Accept `email`, `password`.
- Find user by email.
- Compare the provided password with the stored hash using `bcryptjs`.
- If valid, generate a JWT token (same payload as above) and return it with user info.
- If invalid, return appropriate error (401).

### GET /products (protected route)

- Must be accessible **only** to authenticated users (any role).
- If no valid JWT token is provided → 401.
- If token is invalid/expired → 403.
- On success, return a **pre-defined list of products** (e.g., `[{ id, name, price, category }]`).
- The response should also include the logged-in user's `username` and `role`.
