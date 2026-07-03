# Assignment: User Management using Angular & NgRx

## Overview

Build a simple **User Management** application using **Angular** and **NgRx**.

The application should allow users to:

- View all users.
- Add a new user.
- Edit an existing user.
- Delete a user.

The goal of this assignment is to demonstrate a proper understanding of **NgRx state management**, **Reactive Forms**, routing, and clean Angular architecture.

---

# Functional Requirements

## 1. Home Page

Create a page that displays all users.

### Features

- Display users in a responsive table.
- Columns:
  - Full Name
  - Email
  - Phone
  - Actions

Each row should provide:

- Edit
- Delete

Above the table include:

- Page title
- Search input (optional functionality)
- Add User button

### Empty State

If no users exist, display a friendly empty state with a message and an Add User button.

---

## 2. Add User

Create a form for adding a new user.

Fields:

- Full Name
- Email
- Phone Number

Requirements:

- Reactive Forms
- Validation
- Required fields
- Valid email
- Valid phone number
- Save button disabled while invalid

Buttons:

- Save
- Cancel

---

## 3. Edit User

The same form should support editing an existing user.

Requirements:

- Populate the form with existing data.
- Update the selected user.
- Return to Home after saving.

---

## 4. Delete User

Users can delete a record from the Home page.

Requirements:

- Remove the selected user from the NgRx store.

---

# State Management (NgRx)

Implement NgRx for state management.

The store should manage:

- User list
- Selected user (optional)
- Loading state (optional)

Create:

- Actions
- Reducer
- Selectors
- Effects (optional)
- State interface

---

# User Model

```ts
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}
```

---

# Routing

The application should include the following routes:

| Route | Description |
|--------|-------------|
| `/` | User List |
| `/add` | Add User |
| `/edit/:id` | Edit User |

---

# Validation Rules

### Name

- Required
- Minimum 3 characters

### Email

- Required
- Valid email format

### Phone

- Required
- Accept valid phone numbers

Display validation messages beneath each input.

---

# UI Requirements

The UI should be clean, modern, and professional.

## Design Principles

Use a minimal enterprise dashboard style.

Avoid:

- Heavy shadows
- Glassmorphism
- Neumorphism
- Large gradients
- Excessive rounded corners
- Purple color schemes
- Fancy animations
- Unnecessary decorative elements

Preferred style:

- Clean spacing
- Neutral colors
- Professional typography
- Responsive layout
- Simple hover effects
- Consistent alignment

Suggested palette:

- Background: `#F8FAFC`
- Surface: `#FFFFFF`
- Primary: `#2563EB`
- Success: `#16A34A`
- Danger: `#DC2626`
- Borders: `#E2E8F0`
- Text: `#0F172A`
- Secondary Text: `#64748B`

Border radius:

- 6px

Use subtle shadows only.

---

# Responsive Design

The application should work on:

- Desktop
- Tablet
- Mobile

Requirements:

- Responsive layout
- Mobile-friendly forms
- Scrollable table on smaller screens

---

# Accessibility

Follow accessibility best practices:

- Semantic HTML
- Labels for all inputs
- Keyboard navigation
- Visible focus states
- Appropriate ARIA attributes where necessary

---

# Suggested Project Structure

```
src/
│
├── app/
│   ├── components/
│   │   ├── home/
│   │   └── user-form/
│   │
│   ├── models/
│   │   └── user.model.ts
│   │
│   ├── store/
│   │   ├── actions/
│   │   ├── reducers/
│   │   ├── selectors/
│   │   ├── effects/
│   │   └── state/
│   │
│   ├── services/
│   └── app.routes.ts
│
└── ...
```

---

# Bonus (Optional)

Implement one or more of the following:

- Search users
- Sort users
- Pagination
- Confirmation dialog before delete
- Snackbar notifications
- Persist data using Local Storage
- Unit tests
- Dark mode

---

# Evaluation Criteria

| Criteria | Weight |
|----------|--------|
| Angular Architecture | ⭐⭐⭐⭐⭐ |
| Correct NgRx Usage | ⭐⭐⭐⭐⭐ |
| Reactive Forms | ⭐⭐⭐⭐ |
| Code Quality | ⭐⭐⭐⭐ |
| Component Reusability | ⭐⭐⭐⭐ |
| Responsive Design | ⭐⭐⭐ |
| UI/UX Quality | ⭐⭐⭐ |
| Accessibility | ⭐⭐⭐ |
| Clean Folder Structure | ⭐⭐⭐⭐ |

---

# Deliverables

The submitted project should include:

- Angular application
- NgRx implementation
- Responsive UI
- Clean code
- README with setup instructions

---

# Tech Stack

- Angular
- NgRx
- TypeScript
- SCSS (preferred) or CSS
- Angular Reactive Forms
- Angular Router

---

# Notes

- No backend is required.
- Store all data in the NgRx store.
- Local Storage persistence is optional.
- Focus on clean architecture, maintainable code, and a professional user experience.