# Memento

Intent
: Capture and externalize an object's internal state so it can be restored later without violating encapsulation.

Problem
: You want to implement undo or rollback functionality while preserving encapsulation.

Solution
: Use a Memento object to store the internal state; a Caretaker manages mementos without inspecting their contents.

When to use

- Undo/redo implementations and state checkpoints.

Consequences

- Can increase memory usage; design must ensure encapsulation is preserved.

Example (concept)

```py
# Originator creates mementos; caretaker stores them.
```
