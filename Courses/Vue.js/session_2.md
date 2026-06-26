# Day 02 - Vue 3 Advanced Concepts

## Overview

Day 02 builds upon foundational Vue 3 knowledge, diving into Single Page Application (SPA) routing, component lifecycle management, inter-component communication via slots, dynamic components, and HTTP integration with a mock REST API backend.

---

## Curriculum

### 1. Vue Router

**File:** `src/router.js`

Configures client-side routing using `vue-router` with `createWebHistory`.

| Path | Component | Description |
|------|-----------|-------------|
| `/` (alias: `/home`) | `Home.vue` | Home page |
| `/parentslot` | `slots/Parent.vue` | Slot & dynamic components demo |
| `/products` | `Products.vue` | Product listing |
| `/products/:id` | `ProductDetails.vue` | Single product detail |
| `/:NotFound(.*)*` | `NotFound.vue` | Catch-all 404 page (hides navbar) |

**Key Concepts:**
- **Route parameters** - Access via `$route.params.id` or `useRoute()` composable
- **Programmatic navigation** - `this.$router.push("/products")`
- **`<router-link>`** - Declarative navigation with `:to` binding
- **`<router-view>`** - Renders matched route component
- **Route meta fields** - Conditional UI via `$route.meta.hideNavbar`

### 2. JSON Server (Mock REST API)

**Script:** `"DB": "json-server data.json --watch --port 2000"`

Provides a full mock REST API from `data.json` with endpoints for CRUD operations on a `products` resource.

**Endpoints consumed:**
- `GET /products` - Fetch all products
- `GET /products/:id` - Fetch single product
- `DELETE /products/:id` - Remove a product

### 3. HTTP Client - Axios

**File:** `src/components/Products.vue`, `src/components/ProductDetails.vue`

- `axios.get(url)` - Fetch product data inside `mounted()` lifecycle
- `axios.delete(url)` - Remove product by ID, then refresh list

### 4. Lifecycle Hooks (LCH)

**Files:** `src/components/LCH/Parent.vue`, `src/components/LCH/Child.vue`

Demonstrates the order of Vue 3 Options API lifecycle hooks across parent-child component trees.

| Hook | Phase |
|------|-------|
| `beforeCreate` | Before instance initialization |
| `created` | After instance creation |
| `beforeMount` | Before DOM mounting |
| `mounted` | After DOM mounting |
| `beforeUpdate` | Before reactive data change renders |
| `updated` | After reactive data change renders |
| `beforeUnmount` | Before component destruction |
| `unmounted` | After component destruction |

Conditional rendering (`v-if`) toggles child component visibility, triggering mount/unmount lifecycle sequences.

### 5. Slots

**Files:** `src/components/slots/`

Implements content distribution patterns:

- **Default Slot** - Basic `<slot></slot>` for parent content injection
- **Named Slots** - Multiple insertion points (`header`, `default`, `footer`) using `v-slot:name` or `#name` shorthand

### 6. Dynamic Components & Keep-Alive

**File:** `src/components/slots/Parent.vue`

- **`<Component :is="active">`** - Dynamically switches between `Child1` and `Child2`
- **`<keep-alive>`** - Caches component state when toggling, preventing re-mounts

### 7. Bootstrap Integration

**File:** `src/main.js`

```js
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
```

UI styled with Bootstrap 5 classes for navbar, tables, buttons, and alerts.

---

## Project Setup

```bash
npm install
```

### Development Server

```bash
npm run serve
```

### JSON Server (Mock Backend)

```bash
npm run DB
```

Runs `json-server` on `http://localhost:2000`.

### Production Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

---

## Project Structure

```
demo/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Home.vue
│   │   ├── NavBar.vue
│   │   ├── NotFound.vue
│   │   ├── Products.vue
│   │   ├── ProductDetails.vue
│   │   ├── LCH/
│   │   │   ├── Parent.vue
│   │   │   └── Child.vue
│   │   └── slots/
│   │       ├── Parent.vue
│   │       ├── Child1.vue
│   │       └── Child2.vue
│   ├── App.vue
│   ├── main.js
│   └── router.js
├── data.json
├── package.json
└── vue.config.js
```

---

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `vue` | ^3.2.13 | Frontend framework |
| `vue-router` | ^4.6.4 | Client-side routing |
| `axios` | ^1.18.1 | HTTP client |
| `bootstrap` | ^5.3.8 | UI framework |
| `json-server` | (global) | Mock REST API |
