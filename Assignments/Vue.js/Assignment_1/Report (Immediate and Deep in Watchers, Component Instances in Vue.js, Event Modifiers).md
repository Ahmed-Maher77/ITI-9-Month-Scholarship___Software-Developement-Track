# Vue.js Report

## 1. Immediate and Deep Watchers

A watcher in Vue.js is used to watch a data value and run some code when that value changes.

### Immediate Watcher

An immediate watcher runs once when the component is created, even before the watched value changes.

**Example:**

```js
watch: {
  name: {
    handler(newValue) {
      console.log(newValue);
    },
    immediate: true
  }
}
```

**Why use it?**

If you want to run a function when the page loads and also when the value changes later.

---

### Deep Watcher

A deep watcher is used when watching objects or arrays. It can detect changes inside nested properties.

**Example:**

```js
watch: {
  user: {
    handler() {
      console.log("User data changed");
    },
    deep: true
  }
}
```

**Why use it?**

If the `user` object contains many properties and you want to know when any of them changes.

---

## 2. Component Instances in Vue.js

A component instance is a copy of a component that Vue creates when it is used.

For example, if we use the same component more than once:

```vue
<Counter />
<Counter />
```

Vue creates two separate instances of the `Counter` component.

If the component has:

```js
data() {
  return {
    count: 0
  };
}
```

Each counter will have its own `count` value.

**Example:**

* First Counter → 5
* Second Counter → 0

Changing one will not affect the other.

---

## 3. Event Modifiers

Event modifiers help us control how events work in Vue.

### `.stop`

Stops the event from moving to parent elements.

```vue
<button @click.stop="saveData">
  Save
</button>
```

**Example:**

If a button is inside a div, clicking the button will not trigger the div's click event.

---

### `.self`

Runs the event only when the element itself is clicked.

```vue
<div @click.self="closeModal">
  <button>Button</button>
</div>
```

**Example:**

The event runs when clicking the div, but not when clicking the button inside it.

---

### `.capture`

Makes the parent element handle the event before the child element.

```vue
<div @click.capture="handleClick">
```

**Example:**

The parent's click function runs first, then the child's function.

---

### `.passive`

Improves performance for scroll events.

```vue
<div @scroll.passive="handleScroll">
```

**Example:**

Useful when handling scrolling because it helps the page scroll more smoothly.

---

## Conclusion

Watchers help us react to data changes. An immediate watcher runs when the component starts, while a deep watcher checks changes inside objects and arrays. Component instances allow us to use the same component multiple times with separate data. Event modifiers such as `.stop`, `.self`, `.capture`, and `.passive` make event handling easier and cleaner.
