# Decorator

Intent
: Attach additional responsibilities to an object dynamically without changing its interface.

Problem
: Subclassing for every combination of behaviors leads to class explosion and rigidity.

Solution
: Create decorator objects that wrap the original object and add behavior before/after delegating calls.

When to use

- Adding responsibilities at runtime or composing behaviors without inheritance.

Consequences

- More flexible than static inheritance; can lead to many small wrapper classes.

Example (Python)

```py
class Component: def operation(self): pass
class Decorator(Component):
    def __init__(self, comp): self._comp = comp
    def operation(self):
        # additional behavior
        return self._comp.operation()
```
