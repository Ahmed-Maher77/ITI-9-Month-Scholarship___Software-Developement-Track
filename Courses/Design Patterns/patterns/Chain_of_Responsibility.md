# Chain of Responsibility

Intent
: Avoid coupling the sender of a request to its receiver by giving multiple objects a chance to handle the request.

Problem
: Many handlers can process a request and you want to decouple the sender from concrete handlers.

Solution
: Arrange handlers in a chain; each handler either handles the request or forwards it to the next handler.

When to use

- Event handling, validation chains, and request processing pipelines.

Consequences

- Flexible request processing; tracing and debugging chain flow can be harder.

Example (pseudo)

```py
class Handler:
    def __init__(self, next=None): self.next = next
    def handle(self, req):
        if can_handle(req): do();
        elif self.next: self.next.handle(req)
```
