# Node.js Lesson 5 Notes

Based on the contents of `day5 node js.pptx`.

## Topics Covered

- Hashing and encryption
- `bcryptjs`
- JWT authentication
- `dotenv`
- Authentication vs authorization

## Hashing and Encryption

### Encryption

- Two-way process.
- Data is scrambled with a key and can be decrypted later with the correct key.
- Used to protect data so only authorized people can read it.

Example:

- Plaintext: `Hello`
- Encrypted: `U2FsdGVkX1/...`
- With the correct key, the original text can be restored.

### Hashing

- One-way process.
- Any input is converted into a fixed-length string.
- The original value cannot be recovered from the hash.
- Commonly used for password storage and integrity checks.

Example:

- Input: `Hello`
- Hash: `185f8db32271fe25f561a6fc938b2e264306ec304eda518007d1764826381969`

## `bcryptjs`

`bcryptjs` is a JavaScript library that implements the bcrypt password hashing algorithm.

- It is used to store passwords securely.
- It generates irreversible hashes.
- It automatically adds a unique salt for each password.
- Even identical passwords produce different hashes because of the salt.

Install:

```bash
npm i bcryptjs
```

## JWT

JWT stands for JSON Web Token.

- It is a secure way to send information between a client and a server.
- It is commonly used in web apps and APIs to verify users and prevent unauthorized access.
- A JWT is a string made of three parts separated by dots.

Install:

```bash
npm install jsonwebtoken
```

## How JWT Works

1. User logs in.
2. Server generates a JWT and signs it with a secret or private key.
3. The token is sent to the client in a response body, cookie, or header.
4. The client stores the token in memory, localStorage, or a cookie.
5. The client sends the token with every subsequent request.
6. The server verifies the token by checking the signature, expiration, and payload.
7. If valid, the server processes the request and uses the user info inside the payload.

## `dotenv`

`dotenv` is a zero-dependency Node.js module that loads environment variables from a `.env` file into `process.env`.

- It helps keep sensitive configuration out of source code.
- Typical values include API keys, database passwords, and JWT secrets.

Install:

```bash
npm install dotenv
```

## Authentication vs Authorization

| Authentication             | Authorization                       |
| -------------------------- | ----------------------------------- |
| Who are you?               | What can you do?                    |
| Login step                 | Access control step                 |
| Returns a token or session | Uses the token to check permissions |
| Happens first              | Happens after authentication        |

Authentication always comes first.

## Session Summary

- Use hashing for password storage, not reversible encryption.
- Use `bcryptjs` to hash passwords securely.
- Use JWTs to authenticate users across requests.
- Use `dotenv` to store secrets and config outside the source code.
- Authenticate first, then authorize.
