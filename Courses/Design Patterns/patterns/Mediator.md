# Mediator

Intent
: Define an object that encapsulates how a set of objects interact, promoting loose coupling by keeping objects from referring to each other explicitly.

Problem
: A set of objects communicate in complex ways, creating tangled dependencies.

Solution
: Introduce a Mediator that centralizes communication and coordinates interactions between colleagues.

When to use

- User interface components, complex workflows, or communication-heavy modules.

Consequences

- Simplifies individual components but can lead to a large mediator with complex logic.

Example (concept)

```py
class Mediator: def notify(self, sender, event): pass
```
