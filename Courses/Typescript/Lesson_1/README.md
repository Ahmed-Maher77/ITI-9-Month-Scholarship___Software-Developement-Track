# TypeScript - Session Notes

Based on: `TypeScript.pptx`

## Overview

- TypeScript is a programming language introduced around 2012.
- TypeScript depends on JavaScript and is a superset of JavaScript.
- It adds static typing and modern language features on top of JavaScript.

## TypeScript vs JavaScript

### TypeScript

- Strongly typed
- Better variable type control
- Supports object-oriented programming concepts
- Compiled language (transpiles to JavaScript)

### JavaScript

- Dynamically typed
- Variable type can change at runtime

## TypeScript as a Superset

TypeScript supports JavaScript features across versions while adding its own capabilities:

- ES5
- ES6
- ES7+

## Additional TypeScript Features

- Type annotations
- Interfaces
- Enums (enumerated types)
- Generics
- Tuples
- Async/Await
- Classes
- Modules

## Community and Ecosystem

- Widely used by companies in real-world projects.
- Works with major frameworks and modern tooling.

## Node.js and NPM

- NPM (Node Package Manager) is used to:
    - Install libraries/packages
    - Manage JavaScript/TypeScript dependencies
    - Use command-line tooling

## Environment Setup (Session Topic)

The session included environment setup as a practical step before coding with TypeScript.

## Data Types in TypeScript

### Primitive and Basic Types

- `string` - textual data
- `number` - integers and floating-point values
- `boolean` - true/false values
- `null` - intentional absence of value
- `undefined` - unassigned value
- `bigint` - large integers

### Other Built-in Types

- `any` - disables type checking
- `unknown` - safer alternative to `any` (requires narrowing)
- `void` - absence of return value (often for functions)
- `never` - values that never occur (e.g., functions that always throw)
- `object` - non-primitive objects
- `array` - typed lists
- `tuple` - fixed-length, typed array
- `enum` - named constants

## Custom Types

- `interface` - defines object shape
- `type` - type aliases and compositions
- `union` - one of multiple possible types
- `literal` - exact value types (e.g., `"left" | "right"`)
- `function` types - define parameter/return contracts
- `class` - object blueprints
- `generics` - reusable, type-safe abstractions

## Utility Types

- `Partial<T>`
- `Required<T>`
- `Readonly<T>`
- `Record<K, T>`
- `Pick<T, K>`
- `Omit<T, K>`
- `Exclude<T, U>`
- `Extract<T, U>`
- `NonNullable<T>`

## Key Takeaways

- TypeScript improves maintainability through static typing.
- It helps catch errors earlier during development.
- It is suitable for small to large-scale applications.
- Any app built with JavaScript can also be implemented with TypeScript.
