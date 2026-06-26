# Vue.js — Day 1

**Instructor:** Eng / Ryhab Farouq

A comprehensive introduction to Vue.js 3 covering directives, event handling, methods, form handling, computed properties, watchers, and component communication.

---

## Table of Contents

- [1. Vue.js Overview](#1-vuejs-overview)
- [2. Installation](#2-installation)
- [3. Vue.js Directives](#3-vuejs-directives)
- [4. Modifiers](#4-modifiers)
- [5. Methods vs Computed Properties](#5-methods-vs-computed-properties)
- [6. Watchers](#6-watchers)
- [7. Components](#7-components)
- [8. Component Communication](#8-component-communication)
  - [8.1 Props (Parent → Direct Child)](#81-props-parent--direct-child)
  - [8.2 Provide / Inject (Parent → Indirect Child)](#82-provide--inject-parent--indirect-child)
- [9. Task](#9-task)
- [10. Report Topics](#10-report-topics)
- [11. Extensions](#11-extensions)

---

## 1. Vue.js Overview

### History

Vue.js was created by **Evan You** while working at Google on Angular projects. He extracted the parts he liked from Angular and built something lightweight. The first source code was released in **July 2013**, and Vue.js was officially released in **February 2014**.

### Why Vue.js?

- **Approachable** — Familiar with HTML, CSS, and JavaScript
- **Versatile** — Create powerful single-page applications (SPAs)
- **Performance** — Measures just **20 KB** minified and gzipped at runtime

### Vue.js and the Virtual DOM

Vue.js uses a **Virtual DOM** to optimize rendering. Instead of manipulating the real DOM directly, Vue creates a lightweight representation (virtual DOM) and computes the most efficient way to update the actual DOM when state changes.

### Rendering Mechanism

Vue's rendering mechanism efficiently tracks dependencies and only re-renders components whose data has actually changed, avoiding unnecessary DOM operations.

---

## 2. Installation

| Method | Command |
|--------|---------|
| **CDN** | `<script src="http://unpkg.com/vue@next"></script>` |
| **NPM** | `npm install vue@next` |
| **CLI** | `npm install -g @vue/cli` then `vue create <project-name>` |
| **Vite** | `npm create vite@latest my-vue-app -- --template vue` |

This project was created using **Vue CLI** (`vue create demo`).

---

## 3. Vue.js Directives

Directives are special tokens in the markup that tell Vue to do something to a DOM element. They are prefixed with `v-`.

| Directive | Purpose |
|-----------|---------|
| `v-text` | Updates the element's `textContent` |
| `v-html` | Updates the element's `innerHTML` |
| `v-bind` (or `:`) | Dynamically binds an attribute to an expression |
| `v-once` | Renders the element once; no future updates |
| `v-pre` | Skips compilation for the element and its children |
| `v-if` / `v-else-if` / `v-else` | Conditionally renders the element |
| `v-show` | Toggles visibility via `display` (always in DOM) |
| `v-for` | Renders a list by iterating over an array or object |
| `v-model` | Two-way data binding on form inputs |

### Examples

```html
<!-- One-way binding -->
<h2 v-text="deptName"></h2>
<p v-html="trackName"></p>

<!-- Dynamic attribute binding -->
<h3 :id="headerId">Hello World</h3>
<h3 :class="headerClass">Styled Text</h3>

<!-- Conditional rendering -->
<div v-if="num === 0">zero</div>
<div v-else-if="num > 0">positive</div>
<div v-else-if="num < 0">negative</div>
<div v-else>NaN</div>

<!-- Show / hide -->
<div v-show="num === 0">zero with v-show</div>

<!-- Loops -->
<h1 v-for="(name, index) in names" :key="index">
  {{ index + 1 }} - {{ name }}
</h1>

<h1 v-for="(value, key) in myObj" :key="key">
  {{ key }} : {{ value }}
</h1>

<!-- Two-way binding -->
<input type="text" v-model="formValues.name">
```

### Quick Distinction: `v-if` vs `v-show`

| Feature | `v-if` | `v-show` |
|---------|--------|----------|
| Behavior | Removes / adds the element from DOM | Toggles `display` CSS property |
| Use case | Rare toggles (e.g., login/logout) | Frequent toggles |

---

## 4. Modifiers

Modifiers are suffixes added to directives (`v-on` or `v-model`) to add inline functionality.

### Form Input Modifiers

| Modifier | Description |
|----------|-------------|
| `.trim` | Strips whitespace from input value |
| `.number` | Casts the input value to a number |
| `.lazy` | Syncs input on `change` event instead of `input` |

### Event Modifiers

| Modifier | Description |
|----------|-------------|
| `.prevent` | Calls `event.preventDefault()` |
| `.stop` | Calls `event.stopPropagation()` |
| `.self` | Only triggers if `event.target` is the element itself |
| `.capture` | Handles event in capture phase |
| `.passive` | Improves scroll performance |

### Examples

```html
<!-- Form modifiers -->
<input v-model.lazy.trim="formValues.name">
<input v-model.number.lazy.trim="formValues.age">

<!-- Event modifiers -->
<form @submit.prevent="handleSubmit">
<button @click.stop="doSomething">Click</button>
```

---

## 5. Methods vs Computed Properties

| Feature | Methods | Computed Properties |
|---------|---------|---------------------|
| **Caching** | No cache — executes every time on re-render | Cached — only re-evaluates when dependencies change |
| **Syntax** | `methods: { fn() {} }` — called as `fn()` | `computed: { prop() {} }` — accessed as `prop` |
| **Use case** | Event handlers, actions | Derived state, transformations |

### Methods

```javascript
methods: {
  testMethod() {
    console.log('method');
  }
}
```
```html
{{ testMethod() }}
```

### Computed Properties

```javascript
computed: {
  testComputed() {
    console.log('computed');
    return '';
  }
}
```
```html
{{ testComputed }}
```

**Rule of thumb:** Use **computed properties** when you need to reduce or transform a variable. Use **watchers** when you need to react to a property change and perform an action once a favorable value is reached.

---

## 6. Watchers

Watchers let you observe and react to data property changes. They are useful for performing side effects (e.g., API calls, showing alerts).

### Basic Watch

```javascript
watch: {
  num(newValue, oldValue) {
    if (newValue > 15 && newValue > oldValue) {
      alert('danger');
    }
  }
}
```

### Report Topics: `immediate` and `deep`

- **`immediate: true`** — Runs the watcher immediately with the current value instead of waiting for the first change.
- **`deep: true`** — Watches nested properties inside objects (useful when mutating object properties).

```javascript
watch: {
  someObject: {
    handler(newVal, oldVal) { /* ... */ },
    deep: true,
    immediate: true
  }
}
```

---

## 7. Components

Components are reusable, self-contained pieces of UI. Vue components are composed of three sections:

- `<template>` — HTML markup
- `<script>` — JavaScript logic
- `<style>` — CSS (optionally `scoped`)

### Directory Structure

```
src/
├── main.js
├── App.vue
└── components/
    ├── props/
    │   ├── Parent.vue
    │   └── Child.vue
    └── provideInject/
        ├── Parent.vue
        ├── Child.vue
        └── SubChild.vue
```

---

## 8. Component Communication

### 8.1 Props (Parent → Direct Child)

**Flow:** Parent passes data down to a direct child via **props**. The child communicates back up via **events** (`$emit`).

**Parent (`Parent.vue`)**

```html
<template>
  <ChildProps staticData="staticdata" :dynamic="dynamicData" @send="handleSend" />
</template>

<script>
import ChildProps from './Child.vue';
export default {
  components: { ChildProps },
  data() {
    return { dynamicData: 'dynamicData' };
  },
  methods: {
    handleSend(data) {
      alert('name from child ' + data);
    }
  }
};
</script>
```

**Child (`Child.vue`)**

```html
<template>
  <h2>Static: {{ staticData }}</h2>
  <h3>Dynamic: {{ dynamic }}</h3>
  <input type="text" v-model="name">
  <button @click="$emit('send', name)">Send name to parent</button>
</template>

<script>
export default {
  props: ['staticData', 'dynamic'],
  data() {
    return { name: '' };
  }
};
</script>
```

### 8.2 Provide / Inject (Parent → Indirect Child)

**Flow:** Used when data needs to go from a parent to a deeply nested (indirect) child without passing through every intermediate component.

**Ancestor provides:**

```javascript
provide() {
  return {
    name: 'omar',
    completeName: this.fullName
  };
},
data() {
  return { fullName: 'ahmed mhmd' };
}
```

**Nested descendant injects:**

```javascript
inject: ['name', 'completeName']
```

**Important:** `provide` must be a function (not an object) when using component instance data (`this`).

---

## 9. Task

Create a Vue.js application with the following features:

1. **Form in parent component** — take data of **users** and **admins**
2. **Child components** — display data based on role (user vs admin)
3. **Delete event** — emit a delete event from child to parent to remove an entry
4. **Bonus** — enable the user to change the theme color

---

## 10. Report Topics

- `immediate` and `deep` in watchers
- Component instances in Vue.js
- Event modifiers: `.stop`, `.self`, `.capture`, `.passive`

---

## 11. Extensions

Recommended VS Code extensions for Vue.js development:

- **Vue VSCode Snippets** — `sarah.drasner`
- **Vetur**

---

## Project Setup

```bash
npm install
```

### Compiles and hot-reloads for development

```bash
npm run serve
```

### Compiles and minifies for production

```bash
npm run build
```

### Lints and fixes files

```bash
npm run lint
```

---

## Resources

- [Vue.js 3 Documentation](https://vuejs.org/)
- [Vue CLI](https://cli.vuejs.org/)
