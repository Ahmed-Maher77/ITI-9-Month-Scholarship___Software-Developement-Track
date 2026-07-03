# DAY 2 — RxJS & NgRx Workshop

## Overview

This session covers **RxJS fundamentals**, **higher-order observable operators**, and **cross-component state communication** using `BehaviorSubject`. The workspace contains two Angular 21 projects (`d02` and `d02demo`) implementing a real-time **Notification Center** as a hands-on practical exercise.

---

## Projects

### `d02/` — Core RxJS Lab
A standalone Angular 21 application (no Bootstrap) demonstrating:

| Module | Purpose |
|---|---|
| `components/navbar/` | Displays live notification count via `BehaviorSubject` subscription |
| `components/sender/` | Broadcasts notifications to all subscribed components |
| `components/toast/` | Renders incoming notifications as animated toast cards (color-coded by type) |
| `components/history/` | Maintains a chronological list of all received notifications |
| `services/notifications.ts` | Shared state service using `BehaviorSubject<Notification>` |
| `types/notification.ts` | Notification interface: `id`, `title`, `message`, `type`, `createdAt` |
| `subjects/` | Standalone demo component for Subject vs BehaviorSubject, login/logout state, and `withLatestFrom` |

### `d02demo/` — RxJS Lab (Bootstrap Variant)
Identical architecture to `d02/` but with **Bootstrap 5.3** integrated. Also includes more extensive commented code examples covering operators like `exhaustMap`, `distinctUntilChanged`, and `timer`.

The notification service in `d02demo` also demonstrates **initial value seeding** in `BehaviorSubject`.

---

## RxJS Concepts Covered

### Creation Functions & Combination Operators
| Operator | Behavior |
|---|---|
| `of` | Emits arguments sequentially (synchronous) |
| `interval` | Emits incrementing numbers at a given interval (asynchronous) |
| `timer` | Emits after a delay, optionally repeating |
| `concat` | Subscribes to the next observable only after the previous completes |
| `merge` | Interleaves emissions from multiple observables immediately |
| `forkJoin` | Waits for all observables to complete, then emits their last values as an array |

### Pipeable Operators
| Operator | Purpose |
|---|---|
| `map` | Transforms emitted values |
| `filter` | Allows only values that pass a predicate |
| `take(n)` | Completes after `n` emissions |
| `tap` | Side-effect inspection (subscribe, next, error, complete, finalize) |
| `debounceTime` | Waits for a quiet period before emitting the latest value |
| `distinctUntilChanged` | Suppresses consecutive duplicate emissions |
| `catchError` | Intercepts errors and returns a fallback observable (can also convert errors to completion) |

### Higher-Order (Flattening) Operators
| Operator | Behavior |
|---|---|
| `concatMap` | Inner observables execute **sequentially** — queues each new inner observable until the previous completes |
| `switchMap` | **Cancels** the previous inner observable when a new emission arrives |
| `mergeMap` (flatMap) | Runs all inner observables **concurrently** — interleaves their emissions |
| `exhaustMap` | **Ignores** new emissions while an inner observable is still running |

### Subjects (Hot Observables)
| Type | Behavior |
|---|---|
| `Subject` | Multicasts to all subscribers; late subscribers receive only future emissions |
| `BehaviorSubject` | Like Subject but **remembers the last value** — new subscribers immediately receive the current value |

A live example in `subjects/` uses `withLatestFrom` to snapshot the current login state when a "Print State" button is clicked.

---

## APIs Used

- **Random User Generator** — `https://randomuser.me/api/`
- **Platzi Fake Store** — `https://api.escuelajs.co/api/v1/categories/slug/{slug}`
- **DummyJSON Search** — `https://dummyjson.com/users/search?q=John`
- **DummyJSON Filter** — `https://dummyjson.com/users/filter?key=hair.color&value=Brown`

---

## Notification Center Architecture

```
                     ┌──────────────────┐
                     │  Notifications    │
                     │  (BehaviorSubject)│
                     └──────┬───────────┘
                            │ next(notification)
              ┌─────────────┼──────────────┐
              ▼             ▼              ▼
         ┌────────┐   ┌────────┐    ┌──────────┐
         │ Navbar │   │ Toast  │    │ History  │
         │ (count)│   │ (live) │    │ (list)   │
         └────────┘   └────────┘    └──────────┘
              ▲
              │
         ┌────────┐
         │ Sender │
         │ (emit) │
         └────────┘
```

All components inject the singleton `Notifications` service. `Sender` calls `sendNotification()`, which pushes to the `BehaviorSubject`. Every subscribed component (Navbar, Toast, History) receives the same emission in real time — a classic **observer pattern** implementation using RxJS Subjects.

---

## Getting Started

```bash
# Install dependencies (each project)
cd d02 && npm install
cd d02demo && npm install

# Serve
cd d02 && ng serve      # → http://localhost:4200
cd d02demo && ng serve  # → http://localhost:4200
```

---

## Tech Stack

| Technology | Version |
|---|---|
| Angular | ^21.2.0 |
| RxJS | ~7.8.0 |
| TypeScript | ~5.9.2 |
| Vitest | ^4.0.8 (unit testing) |
| Bootstrap | ^5.3.8 (d02demo only) |

---

## Session Progression

1. **Observable creation** — `of`, `interval`, `timer`, custom `new Observable`
2. **Cold vs Hot** — `Subject` converts a cold observable into a hot, multicasting stream
3. **Pipeable operators** — `map`, `filter`, `take`, `tap`, `debounceTime`, `catchError`
4. **Higher-order operators** — `concatMap`, `switchMap`, `mergeMap`, `exhaustMap` with real HTTP calls
5. **BehaviorSubject** — Cross-component state sharing in the Notification Center
6. **Unsubscription** — Proper cleanup via `ngOnDestroy` and `Subscription` handles
