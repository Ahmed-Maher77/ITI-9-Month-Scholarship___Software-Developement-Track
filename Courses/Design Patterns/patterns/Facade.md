# Facade

Intent
: Provide a simplified, higher-level interface to a complex subsystem.

Problem
: Clients must interact with many subsystem classes directly, causing tight coupling and complexity.

Solution
: Introduce a Facade that exposes a limited set of operations and coordinates calls to subsystem components.

When to use

- Simplifying an API, grouping operations, or providing a stable entry point to a subsystem.

Consequences

- Reduces coupling for clients; the facade itself can become a chokepoint if it grows too large.

Example

```py
class SubsystemA: pass
class Facade:
    def operation(self):
        a = SubsystemA(); a.do();
```
