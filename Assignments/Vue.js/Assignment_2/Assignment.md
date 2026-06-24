# Vue.js CRUD Website Assignment

## Objective

Build a Vue.js website that demonstrates routing, reusable components, CRUD operations, Axios integration, Mixins, and responsive UI design.

---

## Requirements

### 1. Routing

Create a website with a minimum of **4 pages** using **Vue Router**.

Required pages:

* Home
* Products (CRUD Page)
* About
* Contact
* 404 Not Found Page

### Important

The **404 page must be implemented using child routes (nested routes)**.

---

### 2. CRUD Operations

Implement all CRUD operations using **Axios**.

#### Create

* Add a new item using a form.
* Validate required fields.
* Update the UI after successful creation.

#### Read

* Fetch all items from an API using Axios.
* Display loading and error states.
* Show all data on the page.

#### Update

* Edit existing items.
* Prefill form fields with existing data.
* Save updates using Axios.

#### Delete

* Delete items using Axios.
* Show a confirmation message before deletion.
* Update the UI after deletion.

---

### 3. Data Display

Display all fetched data as responsive cards.

Each card should contain:

* Title
* Description
* View Details Button
* Edit Button
* Delete Button

---

### 4. Axios

Use Axios for all API requests:

* GET
* POST
* PUT/PATCH
* DELETE

Do not use the Fetch API.

Suggested APIs:

* https://jsonplaceholder.typicode.com/posts
* https://fakestoreapi.com/products

---

## Bonus Requirements

### 1. Reusable Mixins

Avoid implementing the "Get By ID" logic more than once.

Create a reusable mixin:

```javascript
export default {
  methods: {
    async getItemById(id) {
      // logic here
    }
  }
}
```

Use the mixin in at least **two different components**, such as:

* ProductDetails.vue
* EditProduct.vue

---

### 2. Do Not Use Vuex

Do not use:

* Vuex
* Pinia

Use only:

* Components
* Props
* Emits
* Mixins
* Axios
* Vue Router

---

### 3. Hide Navbar

Hide the Navbar using any method **except Route Meta**.

Examples:

* Conditional rendering with route name.
* Conditional rendering inside a layout component.

Forbidden:

```javascript
meta: {
  showNavbar: false
}
```

---

## UI Requirements

Create a modern and responsive design.

### Navbar

* Logo
* Navigation links
* Active route highlighting

### Cards

* Responsive grid layout
* Hover effects
* Rounded corners
* Shadows

### Forms

* Validation messages
* Modern inputs
* Styled buttons

### General Styling

* Responsive design
* SCSS
* Consistent spacing
* Smooth transitions
* Professional color palette

---

## Suggested Folder Structure

```text
src/
│
├── assets/
│
├── components/
│   ├── Navbar.vue
│   ├── ProductCard.vue
│   └── ProductForm.vue
│
├── mixins/
│   └── getItemById.js
│
├── pages/
│   ├── Home.vue
│   ├── Products.vue
│   ├── ProductDetails.vue
│   ├── EditProduct.vue
│   ├── About.vue
│   ├── Contact.vue
│   └── NotFound.vue
│
├── router/
│   └── index.js
│
├── services/
│   └── api.js
│
├── App.vue
└── main.js
```

---

## Deliverables

Your submission must include:

* Vue 3 Project
* Vue Router Configuration
* Nested 404 Route
* Axios Integration
* Full CRUD Functionality
* Responsive Card Layout
* Reusable Components
* Reusable GetById Mixin
* Navbar Hidden Without Route Meta
* SCSS Styling
* Clean and Organized Code

---

## Evaluation Criteria

| Criteria                 | Marks |
| ------------------------ | ----- |
| Vue Router & Pages       | 20    |
| CRUD Operations          | 30    |
| Axios Usage              | 15    |
| Mixins Implementation    | 10    |
| Responsive UI & Styling  | 15    |
| Code Quality & Structure | 10    |

**Total: 100 Marks**
