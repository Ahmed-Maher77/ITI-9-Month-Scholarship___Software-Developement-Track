# Prototype

Intent
: Create new objects by copying a prototype instance rather than creating instances from scratch.

Problem
: Object creation is expensive or complex, and initializing from a pre-configured instance is preferable.

Solution
: Provide a `clone()` or `copy()` operation in objects and produce new instances by copying an existing prototype.

When to use

- When objects are costly to create or when objects share a common configuration.

Consequences

- Requires careful management of deep vs. shallow copies and object lifecycle concerns.

Example (Python shallow copy)

```py
import copy
proto = SomeObject(config)
new = copy.copy(proto)
```
