# Flyweight

Intent
: Use sharing to support large numbers of fine-grained objects efficiently by separating intrinsic (shared) and extrinsic (context-specific) state.

Problem
: Many similar objects consume excessive memory.

Solution
: Store shared state in flyweight objects and pass extrinsic state from clients during operations.

When to use

- Text rendering, particle systems, or whenever many objects share identical data.

Consequences

- Reduces memory footprint; increases complexity of object management and client code.

Example (concept)

```py
pool = FlyweightFactory()
fw = pool.get(key_shared_state)
fw.operation(extrinsic_state)
```
