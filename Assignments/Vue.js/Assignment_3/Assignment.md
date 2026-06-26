# Assignment 3 — Vue 3 CRUD Application with Vue Router

**Track:** Software Development (Vue.js)  
**Submission Date:** June 26, 2026

---

## Overview

A single-page CRUD application built with **Vue 3**, **Vue Router 4**, **Vuex 4**, and **Axios**.  
The app manages a list of posts/products with full create, read, update, and delete capabilities, client-side routing with nested layouts, and a mock API layer.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **Vue 3** (Options + Composition API) | Frontend framework |
| **Vue Router 4** | Client-side routing (history mode, nested routes) |
| **Vuex 4** | Centralized state management |
| **Axios** | HTTP client (wrapping mock data service) |
| **SCSS** | Styling (BEM methodology, responsive) |
| **Vue CLI 5** | Project scaffolding and build tooling |

---

## Routes

| Path | Name | Component | Description |
|---|---|---|---|
| `/` | Home | `Home.vue` | Landing page |
| `/products` | Products | `Products.vue` | Product list with delete |
| `/products/create` | CreateProduct | `EditProduct.vue` | Create a new product |
| `/products/:id` | ProductDetails | `ProductDetails.vue` | Single product view |
| `/products/:id/edit` | EditProduct | `EditProduct.vue` | Edit existing product |
| `/about` | About | `About.vue` | About page |
| `/contact` | Contact | `Contact.vue` | Contact form |
| `/:pathMatch(.*)*` | NotFound | `NotFound.vue` | 404 catch-all |

All routes are nested under a `MainLayout` component which provides the navigation bar and footer.

---

## Project Structure

```
crud-website-vue-router/
├── public/
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.vue          # Responsive nav with mobile toggle
│   │   ├── ProductCard.vue     # Product list item card
│   │   └── ProductForm.vue     # Reusable create/edit form with validation
│   ├── pages/
│   │   ├── MainLayout.vue      # Shell layout (nav + router-view + footer)
│   │   ├── Home.vue            # Landing page
│   │   ├── Products.vue        # Product list with delete modal
│   │   ├── ProductDetails.vue  # Single product view
│   │   ├── EditProduct.vue     # Create/Edit product page
│   │   ├── About.vue           # About page
│   │   ├── Contact.vue         # Contact form page
│   │   └── NotFound.vue        # 404 page
│   ├── router/
│   │   └── index.js            # Router configuration
│   ├── services/
│   │   └── api.js              # Mock API service (in-memory data)
│   ├── store/
│   │   └── index.js            # Vuex store (state, getters, mutations, actions)
│   ├── App.vue
│   └── main.js
├── package.json
├── vue.config.js
└── README.md
```

---

## Features

### Routing
- Nested route configuration under `MainLayout`
- HTML5 history mode (`createWebHistory`)
- Named routes for declarative navigation
- Catch-all `/:pathMatch(.*)*` for 404 handling
- `router-link` active state styling (`active-class`, `exact-active-class`)

### State Management (Vuex)
- **State:** `products`, `selectedProduct`, `loading`, `error`
- **Getters:** `allProducts`, `currentProduct`, `isLoading`, `hasError`
- **Mutations:** `SET_PRODUCTS`, `SET_SELECTED_PRODUCT`, `SET_LOADING`, `SET_ERROR`, `ADD_PRODUCT`, `UPDATE_PRODUCT`, `REMOVE_PRODUCT`
- **Actions:** `fetchProducts`, `fetchProductById`, `createProduct`, `updateProduct`, `deleteProduct`

### CRUD Operations
| Operation | Action | Endpoint |
|---|---|---|
| **Read (list)** | `fetchProducts` | `GET /posts` |
| **Read (single)** | `fetchProductById` | `GET /posts/:id` |
| **Create** | `createProduct` | `POST /posts` |
| **Update** | `updateProduct` | `PUT /posts/:id` |
| **Delete** | `deleteProduct` | `DELETE /posts/:id` |

### Mock API Service (`src/services/api.js`)
- In-memory data store initialized with 12 mock posts
- Simulated network delay (300–400 ms) per request
- Full CRUD mirroring JSONPlaceholder response shapes
- Auto-incrementing IDs starting at 13

### UI/UX
- Responsive design (mobile-first with 768px breakpoint)
- Sticky navigation bar with hamburger toggle on mobile
- Delete confirmation modal
- Form validation (required fields) with inline error messages
- Loading and error states with retry capability
- Empty state messaging
- Consistent SCSS styling with BEM naming

---

## Setup and Running

```bash
# Install dependencies
npm install

# Start development server with hot-reload
npm run serve

# Build for production
npm run build

# Lint and fix
npm run lint
```

---

## Screenshots

| Page | Preview |
|---|---|
| **Home** | `screenshots for the running application/home-page.png` |
| **Products** | `screenshots for the running application/products-page.png` |
| **Product Details** | `screenshots for the running application/new-product.png` |
| **Contact** | `screenshots for the running application/contact-page.png` |
| **404** | `screenshots for the running application/404-page.png` |

---

## Key Dependencies

- `vue` ^3.2.13
- `vue-router` ^4.6.4
- `vuex` ^4.1.0
- `axios` ^1.18.1
- `sass` ^1.101.0
- `core-js` ^3.8.3
