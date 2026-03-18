# CSS Preprocessors - ITI 9-Month Journey

## Lesson 7: Building Your Own CSS Framework

### What is a CSS Framework?

A CSS Framework is a structured system of reusable classes and utilities for:

- Layouts
- Typography
- Components
- Responsive design

**Examples:** Bootstrap, Tailwind

---

### Why Build Your Own?

- **Full control** over design decisions and features
- **Better performance** by including only what you need
- **Custom design system** tailored to your brand
- **Scalability** as your project grows

---

### Naming Conventions: BEM Methodology

BEM (Block, Element, Modifier) is a popular naming convention for organizing CSS classes.

```scss
.block {
}
.block__element {
}
.block__element--modifier {
}
```

Benefits:

- Clear and predictable names
- Maintainable and modular
- Scalable across large projects

---

### Grid System (12 Columns)

Generate flexible grid columns using SASS loops.

```scss
@for $i from 1 through 12 {
    .col-#{$i} {
        flex-basis: ($i / 12) * 100%;
    }
}
```

---

### Responsive Design

Create responsive breakpoints with prefixes for different screen sizes.

```scss
.col-sm-12
.col-md-6
.col-lg-4
```

Approach:

- Mobile-first design
- Flexible and adaptable layouts

---

### Key Takeaways

- Frameworks improve consistency across projects
- BEM methodology is essential for maintainable CSS
- Grid systems form the core of modern layouts

---

### Acknowledgments

Special thanks to **[Ryhab Farouq](https://www.linkedin.com/in/ryhab--farouq/)** (Teaching Assistant) for continuous support, guidance, and encouragement.

Sincere appreciation to the **[Information Technology Institute (ITI)](https://iti.gov.eg/home)** for providing a valuable and enriching learning environment.

---

### Tags

`#CSS` `#SASS` `#Frontend` `#DesignSystem` `#BEM` `#WebDevelopment`
