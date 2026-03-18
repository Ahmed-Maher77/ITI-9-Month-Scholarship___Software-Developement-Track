# CSS Preprocessors - ITI 9-Month Journey

## Lesson 3: Variables and Nesting in SASS

### Variables

Variables let you store reusable values and keep styling consistent across your project.

```scss
$main-color: #333;

h1 {
    color: $main-color;
}
```

#### Variable Scope

```scss
$color: red;

.box {
    $color: blue;
    color: $color; // blue
}

p {
    color: $color; // red
}
```

Use `!global` only when you intentionally need to update a global variable from a local scope.

---

### Nesting

Nesting helps structure CSS rules to reflect HTML hierarchy.

```scss
.navbar {
    ul {
        li {
            a {
                color: red;
            }
        }
    }
}
```

Best practice:

- Avoid nesting deeper than 3-4 levels to keep styles maintainable.

---

### Using `&` (Parent Selector)

```scss
.button {
    &:hover {
        background: red;
    }

    &-primary {
        color: white;
    }
}
```

---

### Key Takeaways

- Variables improve reusability
- Nesting improves readability
- The `&` selector helps build powerful, concise selectors

---

### Acknowledgments

Special thanks to instructor **[Ryhab Farouq](https://www.linkedin.com/in/ryhab--farouq/)** for guidance and continuous support.

Sincere appreciation to the **[Information Technology Institute (ITI)](https://iti.gov.eg/home)** for providing an excellent learning environment and resources.

---

### Tags

`#SASS` `#CSS` `#Frontend` `#CleanCode` `#WebDevelopment`
