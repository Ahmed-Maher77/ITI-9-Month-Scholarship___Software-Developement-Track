# Builder

Intent
: Separate the construction of a complex object from its representation so the same construction process can create different representations.

Problem
: Creating objects with many optional parameters or complex assembly logic leads to confusing constructors.

Solution
: Use a Builder object that exposes fluent methods to configure parts and a final `build()` method to produce the object.

When to use

- When creating complex or immutable objects with many options; for readable and safe construction.

Consequences

- Improves readability and immutability; introduces an extra Builder class.

Example (Python fluent builder)

```py
class ProductBuilder:
    def __init__(self): self._p = Product()
    def with_name(self, n): self._p.name = n; return self
    def build(self): return self._p
```
