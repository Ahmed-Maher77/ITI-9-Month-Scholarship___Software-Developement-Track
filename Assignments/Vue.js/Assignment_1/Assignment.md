# Vue.js Day 1 Assignment

## User & Admin Management Dashboard

### Objective

Build a Vue.js application that demonstrates the concepts covered in Day 1, including:

* Vue Directives
* Event Handling
* Form Handling with `v-model`
* Methods
* Computed Properties
* Watchers
* Components
* Props
* Custom Events (`$emit`)
* Basic Component Communication

---

## Scenario

Create a simple dashboard that allows users to add and manage **Users** and **Admins**.

The application should contain:

1. A form for adding records.
2. Separate views for Users and Admins.
3. Ability to delete records.
4. Theme switching functionality.

---

## Requirements

### 1. Navigation Tabs

Create three tabs:

* Form
* Users
* Admins

The active tab should determine which section is displayed.

Use:

* `v-if`
* `v-show`
* Event handling

---

### 2. Form Component

Create a form that collects:

| Field | Type         |
| ----- | ------------ |
| Name  | Text         |
| Email | Email        |
| Role  | User / Admin |

Requirements:

* Use `v-model` for all inputs.
* Use `.trim` modifier where appropriate.
* Prevent page refresh on submit using:

```html
<form @submit.prevent="handleSubmit">
```

* Disable submission if required fields are empty.

---

### 3. Data Structure

Each record should have the following structure:

```javascript
{
  id: Number,
  name: String,
  email: String,
  role: "user" | "admin"
}
```

Store all records in the parent component.

---

### 4. Users Component

Display only records whose role is:

```javascript
role === "user"
```

Requirements:

* Receive data through props.
* Render records using `v-for`.

---

### 5. Admins Component

Display only records whose role is:

```javascript
role === "admin"
```

Requirements:

* Receive data through props.
* Render records using `v-for`.

---

### 6. Delete Functionality

Each displayed card should contain a Delete button.

Requirements:

* Child component emits an event.
* Parent component handles deletion.

Example:

```javascript
this.$emit("delete-person", person.id);
```

The parent removes the selected item from the array.

---

### 7. Theme Switcher (Bonus)

Add a button that switches between:

* Light Theme
* Dark Theme

Requirements:

* Store theme state in the parent component.
* Pass theme information to child components using props.
* Apply styles dynamically using `:class`.

---

## Required Vue Features

### Directives

Your project must demonstrate:

* `v-model`
* `v-if`
* `v-show`
* `v-for`
* `v-bind`
* `v-on`

---

### Methods

Implement methods such as:

```javascript
addPerson()
deletePerson()
changeTab()
toggleTheme()
```

---

### Computed Properties

Use computed properties for:

```javascript
usersList
adminsList
totalUsers
totalAdmins
isFormValid
```

---

### Watchers

Create watchers for:

#### Theme

```javascript
watch: {
  theme: {
    immediate: true,
    handler(newValue) {
      console.log("Theme changed:", newValue);
    }
  }
}
```

#### People Array

```javascript
watch: {
  people: {
    deep: true,
    handler() {
      console.log("People list changed");
    }
  }
}
```

---

## Suggested Component Structure

```text
src/
│
├── App.vue
│
└── components/
    ├── UserForm.vue
    ├── UsersList.vue
    ├── AdminsList.vue
    └── PersonCard.vue
```

---

## Bonus Features

Implement any of the following:

* Search by name
* Sort alphabetically
* Display total records
* Empty-state messages
* Form reset after submit

---

## Expected Learning Outcomes

After completing this assignment, students should be able to:

* Build reusable Vue components
* Use parent-child communication
* Manage form inputs using `v-model`
* Work with computed properties and watchers
* Emit custom events
* Apply conditional rendering and list rendering
* Implement dynamic styling and theme switching

---

## Deliverables

Submit:

1. Complete Vue.js project.
2. Organized component structure.
3. Clean SCSS styling.
4. Proper use of Vue.js Day 1 concepts.
5. README file containing:

   * Project overview
   * Features
   * Vue concepts used
   * Screenshots

---

### Evaluation Criteria

| Criteria             | Points  |
| -------------------- | ------- |
| Component Structure  | 20      |
| Directives Usage     | 20      |
| Props & Emits        | 20      |
| Computed & Watchers  | 15      |
| Form Handling        | 15      |
| UI & Theme Switching | 10      |
| **Total**            | **100** |
