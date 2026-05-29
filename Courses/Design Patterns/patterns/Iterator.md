# Iterator

Intent
: Provide a way to access elements of an aggregate object sequentially without exposing its underlying representation.

Problem
: You want to traverse collections in a uniform way without exposing internal structure.

Solution
: Implement iterator objects that provide `next()` / `has_next()` semantics, or language-native iterator protocols.

When to use

- Collection traversal, custom container types, and when multiple traversals should be supported concurrently.

Consequences

- Simplifies client code and supports different traversal strategies.

Example (Python)

```py
for item in collection:
    process(item)
```
