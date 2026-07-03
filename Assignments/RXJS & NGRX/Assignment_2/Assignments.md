# Assignments.md

# Angular 21 + RxJS + NgRx Assignments

This document contains three practical assignments designed to reinforce the concepts covered during the **RxJS & NgRx Workshop**.

## Learning Objectives

By completing these assignments, you should demonstrate your understanding of:

* Angular 21
* RxJS
* NgRx
* Subjects
* BehaviorSubject
* Higher-Order Observables
* Shared State
* HTTP Requests
* Reactive Programming
* Enterprise Architecture
* Modern UI Design

---

# General Requirements

All assignments **must** follow these requirements.

## UI/UX

The UI is part of the evaluation.

Create a professional interface similar to modern enterprise applications.

The UI **must not** look AI-generated.

Avoid:

* Heavy shadows
* Blue/Purple neon colors
* Huge gradients
* Glassmorphism
* Excessive floating cards
* Over-designed interfaces
* Unnecessary animations

Preferred inspiration:

* Stripe
* GitHub
* Vercel
* Linear
* Notion
* Atlassian
* Shopify Admin

Use:

* Consistent spacing
* Professional typography
* Responsive layouts
* Subtle hover effects
* Neutral colors
* Soft borders
* Small border radius (6–10px)

---

## Angular

Use:

* Angular 21
* Standalone Components
* Lazy Loading (where appropriate)
* Strict TypeScript
* OnPush Change Detection
* trackBy functions

---

## Architecture

Use a scalable folder structure.

```text
core/

shared/

features/

    feature/

        pages/

        components/

        services/

        models/

        store/

            actions/

            reducers/

            selectors/

            effects/

            state/
```

---

## NgRx

Every assignment must implement:

* Actions
* Reducers
* Selectors
* Effects
* Feature State

Avoid keeping business logic inside components.

---

## RxJS

Use RxJS correctly.

Use the proper operator for the proper scenario.

The workshop concepts should be clearly demonstrated.

Required operators include:

* Subject
* BehaviorSubject
* debounceTime
* distinctUntilChanged
* filter
* map
* tap
* switchMap
* concatMap
* mergeMap
* exhaustMap
* combineLatest
* catchError
* finalize
* takeUntilDestroyed

---

## Accessibility

Use:

* Semantic HTML
* Keyboard navigation
* Visible focus states
* Proper labels
* ARIA attributes

---

## Code Quality

* SOLID principles
* Reusable components
* Reusable services
* Meaningful naming
* No duplicated logic
* No `any`
* No nested subscriptions
* No memory leaks

---

# Assignment 1 — Student Management

## Objective

Create a Student Management page that loads students from an API and demonstrates shared state using `BehaviorSubject`.

---

## Features

* Load students from an API.
* Search students while typing.
* Department filter.
* Refresh button.
* Loading indicator.
* Error handling.
* Display total students.
* Store students in shared state.

---

## APIs

Students

https://randomuser.me/api/

Departments

https://api.escuelajs.co/api/v1/categories/slug/{slug}

Search

https://dummyjson.com/users/search?q=John

Filtering

https://dummyjson.com/users/filter?key=hair.color&value=Brown

---

## RxJS Requirements

Use

* Subject for

  * Search
  * Refresh
  * Filter

Use

* BehaviorSubject<Student[]>

Operators

* debounceTime
* distinctUntilChanged
* switchMap
* combineLatest
* map
* tap
* catchError
* finalize
* exhaustMap
* takeUntilDestroyed

---

## Components

* Student List
* Student Card
* Search Bar
* Department Filter
* Toolbar
* Loading
* Error State
* Empty State
* Student Counter

---

## Deliverables

* Complete Angular application
* NgRx Store
* Shared state
* Responsive UI
* Clean architecture

---

# Assignment 2 — Shopping Cart

## Objective

Create a Shopping Cart application demonstrating shared state and higher-order mapping operators.

---

## Features

* Load products.
* Search products.
* Add to cart.
* Remove from cart.
* Quantity management.
* Store cart in shared state.
* Calculate total price.
* Prevent unavailable products.
* Success notifications.
* Error handling.

---

## APIs

Products

https://api.escuelajs.co/api/v1/products

Categories

https://api.escuelajs.co/api/v1/categories

Search

https://dummyjson.com/products/search?q=phone

---

## RxJS Requirements

Subjects

* Search
* Refresh
* Add to Cart

BehaviorSubject

* Current Cart

Operators

* debounceTime
* distinctUntilChanged
* switchMap
* concatMap
* mergeMap
* exhaustMap
* combineLatest
* map
* tap
* catchError
* finalize
* takeUntilDestroyed

---

## Additional Requirement

Create a comparison page demonstrating the behavior of:

* switchMap
* concatMap
* mergeMap
* exhaustMap

Show:

* Execution order
* Concurrent behavior
* Cancellation
* Queueing
* Ignored emissions

Explain when each operator should be used.

---

## Components

* Product Grid
* Product Card
* Search Bar
* Cart Sidebar
* Cart Item
* Cart Summary
* Success Toast
* Loading
* Error State
* Empty State
* RxJS Operators Demo

---

## Deliverables

* Complete Angular application
* NgRx implementation
* Shared cart state
* Responsive UI
* RxJS operators comparison

---

# Assignment 3 — Movie Search

## Objective

Build a reactive Movie Search application.

---

## Features

* Search while typing.
* Ignore empty searches.
* Debounce requests.
* Cancel previous requests.
* Transform API responses.
* Loading state.
* Success state.
* Empty state.
* Error handling.
* Shared search results.

---

## Suggested APIs

OMDb

```text
https://www.omdbapi.com/?apikey=YOUR_API_KEY&s=batman
```

or any equivalent public movie API.

---

## RxJS Requirements

Subject

* Search

BehaviorSubject

* Latest Search Results

Operators

* filter
* debounceTime
* distinctUntilChanged
* switchMap
* map
* tap
* catchError
* finalize
* takeUntilDestroyed

---

## Components

* Search Bar
* Movie Grid
* Movie Card
* Search Summary
* Result Counter
* Loading
* Empty State
* Error State

---

## Deliverables

* Complete Angular application
* NgRx Store
* Shared search state
* Responsive UI
* Production-ready architecture

---

# Submission Checklist

Each assignment should include:

* ✅ Angular 21
* ✅ Standalone Components
* ✅ Responsive UI
* ✅ Professional Design
* ✅ NgRx Store
* ✅ RxJS Implementation
* ✅ Shared State using BehaviorSubject
* ✅ Proper HTTP Handling
* ✅ Error Handling
* ✅ Loading States
* ✅ Empty States
* ✅ Accessibility
* ✅ Clean Architecture
* ✅ SOLID Principles
* ✅ No Memory Leaks
* ✅ Strict TypeScript
* ✅ Reusable Components
* ✅ Production-Ready Code

---

# Evaluation Criteria

| Category                    | Weight |
| --------------------------- | ------ |
| UI/UX Quality               | 25%    |
| RxJS Usage                  | 25%    |
| NgRx Architecture           | 20%    |
| Code Quality & Architecture | 15%    |
| Performance & Accessibility | 10%    |
| Responsiveness              | 5%     |

A successful submission should demonstrate mastery of reactive programming, scalable Angular architecture, NgRx state management, and modern frontend engineering practices while delivering a polished, production-quality user experience.
