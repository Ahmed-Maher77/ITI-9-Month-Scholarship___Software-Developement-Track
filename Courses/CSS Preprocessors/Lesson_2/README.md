# CSS Preprocessors - ITI 9-Month Journey

## Lesson 2: SASS vs SCSS and Setup

### SASS vs SCSS

Both SASS and SCSS provide the same core features. The difference is syntax.

#### SASS (Old Syntax)

- No curly braces `{}`
- No semicolons `;`
- Relies on indentation

Example:

```sass
$color: red
.box
	color: $color
```

#### SCSS (Modern and Recommended)

- Uses standard CSS-like syntax
- Easier for most developers to adopt

Example:

```scss
$color: red;
.box {
    color: $color;
}
```

Most developers prefer SCSS in modern projects.

---

### How to Use SASS

#### Option 1: VS Code (Recommended)

- Install the **Live Sass Compiler** extension
- Create a `.scss` file
- Click **Watch Sass**

#### Option 2: NPM (Global)

- `npm install -g sass`
- `sass --watch scss:css`

#### React

- `npm install sass`
- Import your stylesheet: `import "./App.scss";`

---

### Best-Practice Folder Structure

```text
sass/
	abstracts/
	base/
	components/
	layout/
	pages/
	themes/
	vendors/
	main.scss
```

Benefits:

- Organized
- Scalable
- Easy to maintain

---

### Key Takeaways

- SCSS is generally preferred over the old SASS syntax
- There are multiple ways to compile SASS
- A clear folder structure is essential for larger projects

---

### Acknowledgments

Special thanks to **[Eng. Ryhab Farouq](https://www.linkedin.com/in/ryhab--farouq/)** (Teaching Assistant) for continuous support, guidance, and valuable insights.

Sincere appreciation to the **[Information Technology Institute (ITI)](https://iti.gov.eg/home)** for providing an excellent learning environment and resources.

---

### Tags

`#SASS` `#SCSS` `#Frontend` `#ReactJS` `#WebDevelopment` `#ITI`
