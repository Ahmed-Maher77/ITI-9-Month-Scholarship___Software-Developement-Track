# Observer

Intent
: Define a one-to-many dependency so that when one object changes state, its dependents are notified and updated automatically.

Problem
: Multiple objects need to be informed about state changes in another object without tight coupling.

Solution
: Subjects maintain a list of observers and notify them of state changes; observers implement an update interface.

When to use

- Event systems, MVC frameworks, and publish/subscribe architectures.

Consequences

- Promotes decoupling; be careful of unexpected update order and potential memory leaks from strong references.

Example (Python)

```py
class Subject:
    def __init__(self): self._obs = []
    def attach(self, o): self._obs.append(o)
    def notify(self): [o.update(self) for o in self._obs]
```
