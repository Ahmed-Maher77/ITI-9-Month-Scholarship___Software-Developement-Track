# CSS Preprocessors - ITI 9-Month Journey

## Lesson 4: Mixins, Functions, and Reusability

### Mixins (Reusable Blocks)

Mixins help you reuse groups of CSS declarations across multiple components.

```scss
@mixin center {
    display: flex;
    justify-content: center;
    align-items: center;
}

.box {
    @include center;
}
```

#### Mixins with Parameters

You can pass values to mixins for more flexible reusable styles.

```scss
@mixin square($size) {
    width: $size;
    height: $size;
}

.div {
    @include square(100px);
}
```

---

### Functions (Return Values)

Functions are useful for reusable style logic that returns computed values.

```scss
@function half($value) {
    @return $value / 2;
}

.box {
    width: half(200px); // 100px
}
```

---

### Placeholder Selectors (`%`)

Placeholders let you define shared style blocks and extend them where needed.

```scss
%card {
    padding: 20px;
}

.box {
    @extend %card;
}
```

---

### Key Takeaways

- Mixins provide reusable style blocks
- Functions provide reusable logic and computed values
- Placeholders support a clean `@extend` system

---

### Acknowledgments

Special thanks to **[Eng. Ryhab Farouq](https://www.linkedin.com/in/ryhab--farouq/)** (Teaching Assistant) for continuous support, guidance, and encouragement.

Sincere appreciation to the **[Information Technology Institute (ITI)](https://iti.gov.eg/home)** for providing a valuable and inspiring learning environment.

---

### Tags

`#SASS` `#Frontend` `#ReusableCode` `#WebDevelopment`
