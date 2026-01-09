# Lesson 2 — Part 1: HTML Fundamentals & Document Structure

**Client‑Side Technologies — ITI 9‑Month Journey**

---

## Introduction

After understanding how the web works and how browsers communicate with servers, it’s time to explore the foundation of every web page — HTML (HyperText Markup Language).

HTML defines the structure and content of web pages. It tells the browser what to display — text, images, links, tables, and forms — while CSS and JavaScript later define how it looks and behaves.

---

## What Is HTML?

HTML is a markup language (not a programming language) composed of tags that describe the structure of content. Each tag has a specific purpose, for example a heading, paragraph, image, or link.

**Example:**

```html
<h1>Welcome to My Website</h1>
<p>This is my first web page!</p>
```

---

## Basic HTML Document Structure

Every HTML page follows a common structure (the HTML boilerplate):

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>My First Web Page</title>
    </head>
    <body>
        <h1>Hello, World!</h1>
        <p>Welcome to my first HTML page.</p>
    </body>
</html>
```

**Breakdown:**

-   `<!DOCTYPE html>` → Declares HTML5.
-   `<html>` → Root element of the document.
-   `<head>` → Contains metadata (not directly visible on the page).
-   `<body>` → Contains visible page content.

---

## Types of HTML Elements

HTML elements commonly fall into three categories:

-   **Block elements** — Start on a new line and take the full width available.
    -   Examples: `<div>`, `<p>`, `<h1>`–`<h6>`, `<section>`
-   **Inline elements** — Flow within text and take only the space they need.
    -   Examples: `<span>`, `<a>`, `<strong>`
-   **Inline-block / replaced elements** — Behave like inline but accept width/height and preserve box model.
    -   Examples: `<img>`, `<textarea>`

---

## Attributes

Tags can include attributes that provide additional information or behavior.

**Example:**

```html
<a href="https://example.com" target="_blank" rel="noopener"
    >Visit example.com</a
>
<img src="logo.png" alt="Company logo" width="200" />
```

-   `href` — Destination URL for links.
-   `src` — Source URL for images or media.
-   `alt` — Alternative text for images (important for accessibility).

---

## Semantic & Accessible HTML

Use semantic elements to improve readability, SEO, and accessibility:

-   Page structure: `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`
-   Grouping: `<section>`, `<article>`, `<figure>`, `<figcaption>`

Accessibility tips:

-   Always provide meaningful `alt` text for images.
-   Use headings in order (`<h1>` → `<h2>` → `<h3>`).
-   Use form labels (`<label>`) and semantic controls.

---

## What’s Next (Part 2)

In Part 2 we will explore common HTML tags in-depth, attributes, forms, tables, and best practices for writing semantic, accessible markup that is SEO‑friendly and maintainable.

---

## Acknowledgements

Special thanks to **[Dr. niveen morsi](https://www.linkedin.com/in/niveen-n-morsi-ph-d-82254621/)** and **[Eng. Mahmoud Abdelaziz](https://www.linkedin.com/in/mahmoud-abdelaziz-11m/?lipi=urn%3Ali%3Apage%3Ad_flagship3_detail_base%3Bk4JmI6wHQeKHJp5sTxJJuQ%3D%3D)**, and **[ITI](https://www.linkedin.com/school/information-technology-institute-iti-/)** for their guidance and support.

---

## Tags

#HTML #FrontendDevelopment #WebDevelopment #ClientSideTechnologies #ITIJourney #AhmedMaherAlgohary #LearningByDoing
