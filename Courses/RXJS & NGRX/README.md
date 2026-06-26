# RXJS & NGRX — Reactive Extensions for JavaScript & Angular

**Authors:** Mahmoud Abdelaziz & Omar Walid

---

## Table of Contents

1. [Synchronous vs Asynchronous](#synchronous-vs-asynchronous)
2. [Introduction to Async Patterns](#introduction-to-async-patterns)
3. [RXJS: Reactive Extensions Library](#rxjs-reactive-extensions-library)
4. [Pull vs Push Systems](#pull-vs-push-systems)
5. [Stream vs Reactive Stream](#stream-vs-reactive-stream)
6. [Composing Functions](#composing-functions)
7. [Observables vs Promises](#observables-vs-promises)
8. [Observables Deep Dive](#observables-deep-dive)
9. [Creational Operators](#creational-operators)
10. [Pipeable Operators](#pipeable-operators)
11. [Higher Order Observables](#higher-order-observables)
12. [Event Observable](#event-observable)
13. [Async Pipe](#async-pipe)
14. [NGRX: Angular Reactive Extensions](#ngrx-angular-reactive-extensions)
15. [NGRX Selectors](#ngrx-selectors)
16. [Complete Flow Diagram](#complete-flow-diagram)

---

## Synchronous vs Asynchronous

JavaScript executes code synchronously by default — each operation waits for the previous one to complete before executing. Asynchronous patterns allow non-blocking operations, enabling the program to continue running while waiting for long-running tasks (e.g., API calls, timers, user events) to finish.

---

## Introduction to Async Patterns

### Callback Hell

Nesting multiple callbacks leads to deeply indented, unreadable, and hard-to-maintain code — commonly referred to as **Callback Hell** or the **Pyramid of Doom**.

### Promises

Promises provide a cleaner way to handle asynchronous operations by chaining `.then()` and `.catch()` calls, avoiding deep nesting. A Promise represents a value that may be available now, later, or never, and can be in one of three states: **pending**, **fulfilled**, or **rejected**.

---

## RXJS: Reactive Extensions Library

RXJS is a library for **composing asynchronous and event-based programs** using **Observable sequences**. It provides a powerful, functional approach to handling streams of data over time.

### Core Concepts

- **Stream** — A sequence of data values over time
- **Reactive Stream** — An asynchronous stream of events with unknown size
- **Pull vs Push Systems**
- **Synchronous vs Asynchronous** execution models

---

## Pull vs Push Systems

| Aspect | Pull System | Push System |
|--------|------------|-------------|
| **Control** | Consumer requests (pulls) data from producer | Producer pushes data to consumers |
| **Timing** | Consumer controls when data is requested | Producer controls when data is sent |
| **Single Value** | Regular Function | Promise |
| **Multiple Values** | Generator Function | Observable |

In a **Pull** system, the consumer is in control — it decides when to request the next value. In a **Push** system, the producer is in control — it decides when to send new data to the consumer.

---

## Stream vs Reactive Stream

| Aspect | Stream | Reactive Stream |
|--------|-------|-----------------|
| **Nature** | Collection of data (size predetermined) | Event stream (size unknown) |
| **Type** | Iterable | Observable |
| **Examples** | Arrays, Timers | User events, infinite streams |

A **Stream** has a fixed, known size, while a **Reactive Stream** is an ongoing sequence of events where the total size is unknown at subscription time.

---

## Composing Functions

Function composition is a core concept in functional programming:

```
x → g(x) → f(g(x))
```

Given two functions `f` and `g`, composing them creates a new function `f ∘ g` (read as "f after g") that applies `g` first, then `f` to the result.

---

## Observable vs Promise

| Feature | Promise | Observable |
|---------|---------|------------|
| **Values** | Single value | Multiple values |
| **Lazy** | No (executes immediately) | Yes (executes on subscribe) |
| **Cancellable** | No | Yes (via `unsubscribe()`) |
| **Completion Callback** | No | Yes (`complete()`) |

---

## Observables Deep Dive

### Observable, Observer, Subscription

- **Observable** — A data source that emits values over time
- **Observer** — An object with `next`, `error`, and `complete` callbacks that reacts to emitted values
- **Subscription** — A handle representing the execution of an Observable; allows cancellation via `unsubscribe()`

### Unsubscribe Behavior

- `subscription.unsubscribe()` stops **that specific subscriber** from receiving data. Other subscribers continue to receive data from the Observable.
- `observer.complete()` stops the **Observable itself** — no further data is sent to **any** subscriber.

### Contract / Contractual Guarantees

Observables follow a strict contract:

1. Zero or more **next** notifications
2. Optionally one **error** or one **complete** notification (but never both)

**Valid sequences:**
- `next* → complete?`
- `next* → error?`

**Invalid sequences** (violate the Observable contract):
- Emitting values after `complete`
- Emitting values after `error`
- Emitting both `error` and `complete`
- Emitting `error` or `complete` more than once

The Observable contract guarantees:
- Deliveries are **serial** (no concurrent emissions)
- Delivery order is **first-in-first-out**
- No emissions after `complete` or `error`

---

## Creational Operators

Operators that create new Observables:

| Operator | Description |
|----------|-------------|
| `of` | Emits a variable number of values in sequence |
| `from` | Converts an array, promise, or iterable into an Observable |
| `interval` | Emits sequential numbers at specified intervals |
| `timer` | Emits a value after a delay, optionally at intervals |
| `range` | Emits a range of sequential numbers |

---

## Pipeable Operators

Operators that transform, filter, or combine existing Observables. They are used within the `pipe()` method.

| Operator | Description |
|----------|-------------|
| `map` | Transforms each emitted value by applying a function |
| `filter` | Emits only values that pass a predicate condition |
| `first` | Emits only the first value (or first matching a condition) |
| `take` | Emits only the first `n` values |
| `takeUntil` | Emits values until a notifier Observable emits |

### Pipe Composition

```
Observable (Data)
    → pipe(
        map(transform),
        filter(condition)
      )
    → Observable (Transformed Data)
    → Consumer
```

The `pipe()` function allows composing multiple operators in a **declarative, chainable** manner. Operators are applied **top-to-bottom** (or left-to-right in the pipe arguments).

---

## Higher Order Observables

Observables that emit other Observables. Higher-order mapping operators (e.g., `switchMap`, `mergeMap`, `concatMap`, `exhaustMap`) flatten nested Observables into a single output stream, each with different strategies for handling inner subscriptions.

---

## Event Observable

Convert DOM events into Observables using `fromEvent`:

```typescript
import { fromEvent } from 'rxjs';

const evt$ = fromEvent(document, 'click');

evt$.subscribe({
  next: () => console.log('You Clicked Now')
});
```

**JavaScript equivalent:**
```javascript
document.getElementsByTagName("body")[0]
  .addEventListener('click', () => console.log('You Clicked Now'));
```

The RXJS version returns an **Observable** that can be composed, cancelled, and integrated into reactive pipelines.

---

## Async Pipe

The **Async Pipe** (`| async`) in Angular automatically subscribes to an Observable or Promise in templates and returns its latest emitted value. It also handles **unsubscription** automatically when the component is destroyed, preventing memory leaks.

```
Service → Component (TS) → Template (HTML via | async)
```

---

## NGRX: Angular Reactive Extensions

NGRX is the **Angular** implementation of **Redux** — a predictable state container based on the **RxJS** library.

### Installation

```bash
npm i --save @ngrx/store
npm i --save @ngrx/effects
```

The `--save` flag adds the packages to `dependencies` in `package.json`.

### Core Architecture

```
Component → Action → Reducer → State → Store → Component
```

| Concept | Description |
|---------|-------------|
| **Store** | Single source of truth — holds the entire application state |
| **Action** | A dispatched event with a `type` and optional `payload` |
| **Reducer** | A pure function that takes the current state and an action, and returns a new state |
| **State** | The current snapshot of the application data |
| **Selector** | Pure functions that derive and project specific slices of state |

### Action Shape

```typescript
{
  type: "[Feature] Event Description",
  payload: any
}
```

### Data Flow

1. A **Component** dispatches an **Action**
2. The **Store** forwards the Action to the **Reducer**
3. The **Reducer** computes a new **State**
4. The **Store** notifies all subscribed **Components** with the new state

```
Component → Store [Dispatch Action] → Reducer → New State → Store [Notify]
```

---

## NGRX Selectors

Selectors are pure functions that **extract and derive** specific slices of state from the Store. They are **memoized** for performance.

### Creating Selectors

```typescript
// app.config.ts
export const reducer1Sel = createFeatureSelector<State>('reducer1');
export const counterSelector = createSelector(
  reducer1Sel,
  (state) => state.counter
);
```

### Using Selectors in Components

```typescript
counter: number = 0;

constructor(private store: Store) {
  this.store.select(counterSelector).subscribe({
    next: (data) => {
      this.counter = data;
    }
  });
}
```

Selectors allow **consumer components** to subscribe only to the part of the state they need, improving performance and maintainability.

---

## Complete Flow Diagram

```
AppComponent
    │
    ├── Component 1 (e.g., Counter Display)
    │   └── Selector: counterSelector
    │
    ├── Component 2 (e.g., Increment/Decrement Buttons)
    │   └── Dispatch Actions: { type: 'INCREMENT' } / { type: 'DECREMENT' }
    │
    └── API Integration Flow
        ├── 1. Start — Dispatch action to call API
        ├── 2. Success — Dispatch success action with payload
        └── 3. Fail — Dispatch failure action with error
```

---

## Course Topics Covered

| # | Topic | Status |
|---|-------|--------|
| 1 | Synchronous vs Asynchronous | ✅ |
| 2 | Callback Hell | ✅ |
| 3 | Promises | ✅ |
| 4 | RXJS Fundamentals | ✅ |
| 5 | Pull vs Push Systems | ✅ |
| 6 | Stream vs Reactive Stream | ✅ |
| 7 | Function Composition | ✅ |
| 8 | Observable vs Promise | ✅ |
| 9 | Observable Contract & Lifecycle | ✅ |
| 10 | Creational Operators (`of`, `from`, `interval`, `timer`, `range`) | ✅ |
| 11 | Pipeable Operators (`map`, `filter`, `first`, `take`, `takeUntil`) | ✅ |
| 12 | Higher Order Observables | ✅ |
| 13 | `fromEvent` — Event Observables | ✅ |
| 14 | Async Pipe | ✅ |
| 15 | NGRX — Angular Redux Architecture | ✅ |
| 16 | Store, Actions, Reducers, State | ✅ |
| 17 | NGRX Selectors (`createFeatureSelector`, `createSelector`) | ✅ |

---

*© 2024 — RXJS & NGRX Course Material*
