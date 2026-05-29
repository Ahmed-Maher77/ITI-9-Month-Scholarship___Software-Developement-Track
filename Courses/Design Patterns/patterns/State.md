# State

Intent
: Allow an object to alter its behavior when its internal state changes; the object will appear to change its class.

Problem
: An object has complex conditional behavior that depends on its internal state, leading to large switch/if statements.

Solution
: Encapsulate state-specific behavior into separate state classes and delegate state-dependent requests to the current state object.

When to use

- Finite state machines, protocols with distinct states, or objects with complex state-dependent behavior.

Consequences

- Clarifies state-specific behavior; increases number of classes but simplifies conditional logic.

Example (concept)

```py
class Context:
    def __init__(self, state): self.state = state
    def request(self): self.state.handle(self)
```
