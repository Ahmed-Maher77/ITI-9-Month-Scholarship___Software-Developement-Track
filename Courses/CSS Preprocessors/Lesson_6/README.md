# CSS Preprocessors - ITI 9-Month Journey

## Lesson 6: Introduction to LESS (Lightweight CSS Preprocessor)

After mastering SASS, it's important to explore another popular CSS preprocessor: **LESS**.

### What is LESS?

LESS is a CSS preprocessor that extends CSS with dynamic features including:

- Variables
- Mixins
- Functions
- Nesting
- Loops and conditions

LESS compiles into standard CSS just like SASS.

---

### LESS vs SASS

Both are powerful preprocessors, but with different strengths:

**LESS:**

- Simpler and closer to standard CSS syntax
- Easier learning curve for beginners

**SASS:**

- More advanced and feature-rich
- Larger ecosystem and community support

---

### How to Use LESS

#### Using NPM

Install LESS globally and compile your files:

```bash
npm install -g less
lessc input.less output.css
```

#### VS Code

- Install the **Easy LESS** extension
- Your `.less` files will automatically compile to CSS

---

### Variables in LESS

LESS uses `@` for variables instead of `$` like SASS.

```less
@main-color: #3498db;

.box {
    color: @main-color;
}
```

---

### Mixins (Core Feature)

In LESS, mixins are written as class-like functions with parameters and default values:

```less
.box(@size, @color: red) {
    width: @size;
    height: @size;
    background-color: @color;
}

div {
    .box(100px, blue);
}
```

Unlike SASS, mixins in LESS can behave like class functions with flexible parameters.

---

### Conditions (Guards)

LESS uses **guards** instead of `@if` for conditional logic:

```less
.size(@size) when (@size > 20px) {
    font-size: @size / 2;
}
```

---

### Loops in LESS

```less
each(range(1, 3), {
  .col-@{value} {
    width: (@value * 100px);
  }
});
```

---

### Key Differences to Remember

- LESS uses `@` for variables (vs `$` in SASS)
- No placeholders like `%` in SASS
- Mixins can act like functions with parameters
- Uses "guards" instead of `@if` for conditions

---

### Key Takeaways

- LESS is a simpler alternative to SASS
- Ideal for small to medium-sized projects
- Still powerful with mixins, logic, and dynamic features

---

### Acknowledgments

Special thanks to **[Eng. Ryhab Farouq](https://www.linkedin.com/in/ryhab--farouq/)** (Teaching Assistant) for continuous support, guidance, and encouragement.

Sincere appreciation to the **[Information Technology Institute (ITI)](https://iti.gov.eg/home)** for providing a valuable and enriching learning environment.

---

### Tags

`#LESS` `#CSS` `#Frontend` `#WebDevelopment` `#ITI` `#SASS` `#LearningJourney`
