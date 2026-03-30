# Day 2 - Node.js Lecture Notes

Instructor: Shimaa Ismail

## Content

- Custom (local) modules
- NPM (`node_modules`, `package.json`)
- HTTP request and HTTP response
- Express.js
- RESTful API
- Nodemon

## 1. Local (Custom) Modules

Local modules are user-defined modules you create inside your project.

- They encapsulate specific functionality.
- They improve code organization and reusability.
- They make projects easier to maintain.
- In Node.js, each file can be treated as a local module.

### Common Node.js globals used with modules

- `module.exports`: exports variables/functions from a module.
- `require()`: imports a module and returns what it exports.
- `__dirname`: absolute path of the current directory.
- `__filename`: absolute path of the current file.

## 2. Starting a Node.js Project with NPM

### Initialize project

```bash
npm init
npm init -y
```

This creates a `package.json` file.

### `package.json` basics

Contains project metadata such as:

- `name`
- `version`
- `description`
- `main` (entry point)
- `scripts`
- `author`
- `license`

Also manages dependencies:

- `dependencies`: packages required to run the app.
- `devDependencies`: packages used during development only.

### `package-lock.json`

`package-lock.json` is auto-generated and stores exact dependency versions for reproducible installs.

## 3. Third-Party Modules and Package Management

Third-party modules are installed from NPM and stored in `node_modules`.

Examples: `express`, `axios`, `mongoose`.

### Install/Uninstall commands

```bash
# install latest
npm install <package-name>

# install specific version
npm install <package-name>@<version>

# install as dev dependency
npm install -D <package-name>

# uninstall package
npm uninstall <package-name>

# install all dependencies from package.json
npm install
```

## 4. Semantic Versioning

Version format: `MAJOR.MINOR.PATCH`

- MAJOR: breaking changes (`1.0.0 -> 2.0.0`)
- MINOR: backward-compatible features (`1.0.0 -> 1.1.0`)
- PATCH: bug fixes (`1.0.0 -> 1.0.1`)

## 5. HTTP Basics

### HTTP request methods

Typical methods used in APIs:

- `GET`
- `POST`
- `PUT`
- `PATCH`
- `DELETE`

### HTTP response status codes

- `200 OK`: successful `GET`, `PUT`, `PATCH`, or `DELETE`.
- `201 Created`: successful `POST` that creates a resource.
- `204 No Content`: successful request with no response body.
- `400 Bad Request`: invalid request syntax.
- `401 Unauthorized`: authentication required/failed.
- `403 Forbidden`: authenticated but not allowed.
- `404 Not Found`: resource does not exist.
- `500 Internal Server Error`: server-side error.

## 6. Express.js

Express.js is a popular Node.js web framework for building web applications and APIs.

Key characteristics:

- Easy and flexible
- Unopinionated (you choose project structure)
- Lightweight and fast
- Middleware support
- Large plugin ecosystem

### Basic routing pattern

```js
app.METHOD(PATH, HANDLER);
```

## 7. `res.send()` vs `res.json()`

### `res.json()`

- Sends JSON response.
- Content-Type is always `application/json`.
- Commonly used in REST APIs.

### `res.send()`

- Sends many response types (text, HTML, JSON, files, etc.).
- Content-Type is auto-detected.
- Useful for mixed/HTML responses.

## 8. RESTful API

An API defines rules for communication between software systems.

REST (Representational State Transfer) is an architectural style for designing web APIs.

Main REST principles:

- Resources: everything is a resource identified by a URL.
- Stateless: each request is independent.
- Client-Server separation: frontend and backend responsibilities are separated.
- Uniform interface: standard use of URLs, HTTP verbs, and data formats.
- Representation: resources are usually transferred as JSON.

## 9. Nodemon

Nodemon is typically used during development to automatically restart your Node.js app when file changes are detected.
