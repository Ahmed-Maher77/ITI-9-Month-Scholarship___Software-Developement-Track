# Lesson 1 - Node.js Fundamentals

## Overview

This lesson introduces Node.js and the core ideas you need before building backend applications.

## Learning Objectives

By the end of this lesson, you should be able to:

- Explain what Node.js is and why it is used.
- Describe the difference between web server and app server roles.
- Understand blocking vs non-blocking behavior.
- Use Node REPL for quick experiments.
- Work with process arguments using `process.argv`.
- Understand Node.js modules (core, local, third-party).
- Use the `fs` core module for basic file operations.

## Lesson Agenda

1. Introduction
2. Client-side web architecture (high-level)
3. App server vs web server
4. What is Node.js?
5. Node.js vs browser JavaScript environment
6. Event loop concept
7. Blocking vs non-blocking
8. Global objects, REPL, and process
9. Modules
10. File system module (`fs`)

## 1) What Is Node.js?

Node.js is a runtime environment that executes JavaScript outside the browser.

Key points:

- Built on Chrome's V8 JavaScript engine.
- Created by Ryan Dahl in 2009.
- Free, open-source, and cross-platform (Windows, macOS, Linux).
- Not a programming language, framework, or library.
- Event-driven, non-blocking I/O model.
- Single-threaded event loop model for handling many concurrent requests.

Common use cases:

- Web APIs
- Real-time applications (chat, live updates)
- Streaming applications
- Command line tools and scripts

Companies using Node.js include PayPal, Netflix, LinkedIn, Uber, and NASA.

## 2) Why Use Node.js?

- High performance with V8.
- Event-driven and non-blocking architecture.
- JavaScript on both frontend and backend.
- Huge package ecosystem through npm.
- Strong fit for real-time applications.
- Cross-platform support.

## 3) App Server vs Web Server (Concept)

- Web server: often responsible for serving static assets (HTML, CSS, JS, images).
- App server: runs business logic, APIs, authentication, data processing.

In many Node.js projects (for example with Express), both responsibilities can exist in one application.

## 4) Blocking vs Non-Blocking

### Blocking (Synchronous)

- Code runs step by step.
- If one operation takes 5 seconds, next lines wait.

### Non-Blocking (Asynchronous)

- Starts a task and continues to next lines immediately.
- Long-running tasks continue in background.
- Event-driven model improves responsiveness and scalability.

## 5) Node.js Environment Setup

Install Node.js from the official website:

- https://nodejs.org/en/download

After installation, verify:

```bash
node -v
npm -v
```

## 6) npm Basics

`npm` stands for Node Package Manager.

Important notes:

- Installed automatically with Node.js.
- Largest software package registry.
- Command-line tool for installing and managing packages.

Useful commands:

```bash
npm init -y
npm install <package-name>
npm install
```

## 7) Node REPL

REPL = Read, Eval, Print, Loop.

How it works:

- Read: accepts your JavaScript input.
- Eval: executes it.
- Print: outputs the result.
- Loop: waits for the next command.

Start REPL:

```bash
node
```

Exit REPL:

```bash
.exit
```

## 8) process.argv

`process.argv` gives command-line arguments passed to a Node script.

Example script:

```js
console.log(process.argv);
```

Run:

```bash
node app.js hello 123
```

Expected idea:

- First values are Node executable path and script path.
- Following values are user-provided arguments (`hello`, `123`).

## 9) Modules in Node.js

Modules are reusable code blocks split into separate files.

Benefits:

- Better organization
- Reusability
- Easier maintenance

Types of modules:

1. Core modules: built into Node.js (for example `fs`, `http`, `os`, `path`)
2. Local modules: your own files
3. Third-party modules: installed from npm

Two module systems:

- CommonJS (CJS): uses `require()` and `module.exports`
- ES Modules (ESM): uses `import` and `export`

## 10) Core Module: fs (File System)

`fs` is a built-in module for file and directory operations.

It supports:

- Synchronous methods (blocking)
- Asynchronous methods (non-blocking, preferred for scalable apps)

Example (read file asynchronously):

```js
const fs = require("fs");

fs.readFile("notes.txt", "utf8", (err, data) => {
    if (err) {
        console.error("Read error:", err.message);
        return;
    }
    console.log(data);
});
```

## In-Class Demo Suggestions

1. Open REPL and evaluate simple expressions.
2. Create `app.js` and print `process.argv`.
3. Compare sync vs async file reads using `fs.readFileSync` and `fs.readFile`.
4. Create a local module and import it.

## Practice Tasks

1. Build a script that reads two numbers from `process.argv` and prints their sum.
2. Create a local module with math functions and use it in another file.
3. Read a text file asynchronously and print word count.
4. Install one npm package and use it in a small script.

## Homework

Create a small CLI app:

- Input: user name and age from command line.
- Output: a welcome message and age after 5 years.
- Bonus: save the output to a file using `fs`.

## Quick Recap

Today you covered:

- Node.js basics and ecosystem
- Event-driven non-blocking model
- npm and package management
- REPL and process arguments
- Modules and file system operations
