# Day 4 - Node.js Session Notes

Instructor: Shimaa Ismail  
Session: Day 4

## Session Content

- Views and template engines
- CORS (Cross-Origin Resource Sharing)
- Serving static files in Express
- File uploads using Multer

## 1) Template Engine

A template engine lets you use template files and inject dynamic values at runtime, then send rendered HTML to the client.

Common options covered:

- EJS
- Pug
- Handlebars

Quick comparison:

- EJS: HTML-like with `<% %>` tags
- Pug: indentation-based syntax (no closing tags)
- Handlebars: uses placeholders like `{{title}}`

## 2) CORS

CORS is a browser security mechanism that blocks requests between different origins (domain/protocol/port) unless allowed by the server.

Example scenario:

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`
- Browser blocks frontend requests to backend unless CORS is enabled.

Install and enable in Express:

```bash
npm i cors
```

```js
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
```

## 3) Serve Static Files

Express can serve static assets (images, CSS, JavaScript, HTML) using built-in middleware.

```js
app.use(express.static("public"));
```

Example access path:

- `http://localhost:3000/images/<fileName>`

## 4) Multer (File Uploads)

Multer is an npm package for handling multipart/form-data (file uploads) in Node.js/Express.

Install:

```bash
npm install multer
```

### Multer configuration example

```js
import multer from "multer";

export const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/gif", "application/pdf"];
    if (allowed.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type"), false);
    }
};

export const upload = multer({ storage, fileFilter });
```

### Upload route example

```js
import express from "express";
import { upload } from "../config/multerConfig.js";

const router = express.Router();

router.post("/", upload.single("file"), (req, res) => {
    const fileUrl = `/public/upload/${req.file.filename}`;
    res.status(200).json({
        message: "File uploaded!",
        file: req.file,
        fileUrl,
    });
});

export default router;
```

### Server wiring example

```js
import uploadRouter from "./routes/uploadRoute.js";

app.use("/upload", uploadRouter);
```

## End of Session

Thank you.
