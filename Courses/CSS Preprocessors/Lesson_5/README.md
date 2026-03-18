# CSS Preprocessors - ITI 9-Month Journey

## Lesson 5: Loops, Conditions, and Advanced Logic

### Loops with `@for`

Use `@for` loops to generate repetitive CSS rules with an iterator.

```scss
@for $i from 1 through 3 {
    .col-#{$i} {
        width: 100% / $i;
    }
}
```

---

### Iterating Over Collections with `@each`

```scss
$colors: red, blue;
@each $color in $colors {
    .text-#{$color} {
        color: $color;
    }
}
```

---

### Loops with `@while`

```scss
$i: 1;
@while $i <= 3 {
    .w-#{$i} {
        width: $i * 100px;
    }
    $i: $i + 1;
}
```

---

### Conditions with `@if` and `@else`

Add conditional logic to your stylesheets based on variable values.

```scss
$theme: dark;
body {
    @if $theme == dark {
        background: black;
    } @else {
        background: white;
    }
}
```

---

### Key Takeaways

- Loops significantly reduce repetitive code
- Conditions add logic and flexibility to styling
- SASS functions as a programming language, not just a stylesheet processor

---

### Acknowledgments

Special thanks to **[Eng. Ryhab Farouq](https://www.linkedin.com/in/ryhab--farouq/)** (Teaching Assistant) for continuous support, guidance, and encouragement.

Special thanks to the **[Information Technology Institute (ITI)](https://iti.gov.eg/home)** for providing a valuable and inspiring learning environment.

---

### Tags

`#SASS` `#Programming` `#Frontend` `#WebDevelopment`
