# Lesson 2 — Part 2: HTML Tags, Attributes & Semantic Structure

**Client‑Side Technologies — ITI 9‑Month Journey**

---

## Introduction

In the previous lesson we learned how HTML defines a web page’s structure using tags and the document boilerplate. Now we dive deeper into the elements, attributes, and semantic meaning that make HTML both functional and accessible.

---

## Commonly Used Tags

-   `<h1>`–`<h6>` → Headings (use `<h1>` for the page title, then descend in order)
-   `<p>` → Paragraph
-   `<a href="">` → Hyperlink
-   `<img src="" alt="">` → Image
-   `<ul>`, `<ol>`, `<li>` → Lists
-   `<table>`, `<tr>`, `<td>` → Tables
-   `<form>` → User input forms and controls
-   `<header>`, `<nav>`, `<section>`, `<article>`, `<footer>` → Semantic structure elements

**Example:**

```html
<h1>Article Title</h1>
<p>This is an introductory paragraph describing the content.</p>
<a href="https://example.com">Read more</a>
<img src="photo.jpg" alt="Descriptive caption" />
```

---

## Attributes in HTML

Attributes provide additional information about elements and are written inside the opening tag.

**Example:**

```html
<a href="https://www.example.com" target="_blank" rel="noopener"
    >Visit Example</a
>
```

-   `href` → Defines the link destination.
-   `target="_blank"` → Opens the link in a new tab (use with `rel="noopener"` for security).
-   Common global attributes: `id`, `class`, `title`, `style`, `data-*`.

---

## Semantic HTML & Accessibility

Semantic HTML makes web pages meaningful and accessible for all users — including screen readers and search engines.

**Semantic elements:**

-   Page structure: `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`
-   Content grouping: `<section>`, `<article>`, `<figure>`, `<figcaption>`

Accessibility best practices:

-   Provide meaningful `alt` text for images (`alt` attribute).
-   Use headings in logical order (`<h1>` → `<h2>` → `<h3>`).
-   Associate form controls with `<label>` elements.
-   Ensure link text is descriptive (avoid "click here").
-   Use ARIA attributes only when necessary and prefer native HTML semantics.

Search engines and assistive technologies rely on these semantic elements to understand page structure, improving SEO and accessibility.

---

## Key Takeaways

-   HTML tags describe content; attributes provide extra details and behavior.
-   Use semantic elements to improve readability, SEO, and accessibility.
-   Always prefer accessible patterns (meaningful `alt`, labels, ordered headings).
-   A clean, semantic HTML foundation benefits both users and maintainers.

---

## Acknowledgements

Special thanks to **[Dr. niveen morsi](https://www.linkedin.com/in/niveen-n-morsi-ph-d-82254621/)**, **[Eng. Mahmoud Abdelaziz](https://www.linkedin.com/in/mahmoud-abdelaziz-11m/?lipi=urn%3Ali%3Apage%3Ad_flagship3_detail_base%3Bk4JmI6wHQeKHJp5sTxJJuQ%3D%3D)**, and **[ITI](https://www.linkedin.com/school/information-technology-institute-iti-/)** for their guidance and support.

---

## Tags

#HTML #FrontendDevelopment #WebDevelopment #ClientSideTechnologies #ITIJourney #AhmedMaherAlgohary #LearningByDoing
