# Report

## 1. Mixins in Vue.js

Mixins are used to share code between different Vue components. Instead of writing the same code many times, we can put it in a mixin and use it wherever we need it.

### Example

```javascript
// messageMixin.js
export default {
  methods: {
    showMessage() {
      alert("Hello!");
    }
  }
}
```

```javascript
// MyComponent.vue
import messageMixin from "./messageMixin";

export default {
  mixins: [messageMixin]
}
```

Now, `MyComponent` can use the `showMessage()` method from the mixin.

### Why use Mixins?

* Save time.
* Avoid repeating code.
* Make the code easier to manage.

---

## 2. createWebHashHistory() vs createWebHistory()

These are two ways to handle page navigation in Vue Router.

### createWebHashHistory()

This method adds a `#` symbol in the URL.

Example:

```
https://example.com/#/about
```

**Advantages:**

* Easy to use.
* Does not need server setup.

**Disadvantages:**

* URLs do not look very clean.
* Not the best choice for SEO.

### createWebHistory()

This method creates clean URLs without the `#`.

Example:

```
https://example.com/about
```

**Advantages:**

* Cleaner URLs.
* Better for SEO.

**Disadvantages:**

* Needs server configuration.

### Simple Comparison

| createWebHashHistory()  | createWebHistory()     |
| ----------------------- | ---------------------- |
| Uses `#` in URL         | No `#` in URL          |
| Easy setup              | Needs server setup     |
| Less SEO-friendly       | More SEO-friendly      |
| Good for small projects | Good for real projects |

---

## 3. Teleport Component

The `Teleport` component allows us to display an element in another place in the HTML page.

It is usually used for:

* Modals
* Popups
* Notifications

### Example

```html
<Teleport to="body">
  <div class="modal">
    Login Form
  </div>
</Teleport>
```

In this example, the modal is written inside the component, but Vue will move it and display it inside the `<body>` element.

### Why use Teleport?

* Makes modals and popups easier to build.
* Helps avoid layout problems.
* Keeps components organized.

### Real Example

Imagine a login popup. Even if the popup code is inside a small component, Teleport can show it on top of the whole page.
