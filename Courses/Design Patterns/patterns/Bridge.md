# Bridge

Intent
: Decouple an abstraction from its implementation so the two can vary independently.

Problem
: You want to avoid a Cartesian product of classes when both abstractions and implementations need to be extended separately.

Solution
: Split the abstraction and implementation into separate hierarchies and link them via composition.

When to use

- Systems that require platform independence or multiple implementation variants.

Consequences

- Encourages separation of concerns; increases indirection but reduces subclass explosion.

Example (concept)

```py
class Abstraction:
    def __init__(self, impl): self.impl = impl
    def operation(self): return self.impl.do()
```
