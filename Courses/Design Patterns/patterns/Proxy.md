# Proxy

Intent
: Provide a surrogate or placeholder for another object to control access, add lazy loading, or intercept calls.

Problem
: You need to add access control, remote access, or lazy initialization without changing the subject.

Solution
: Implement a proxy with the same interface as the subject and delegate calls, adding the desired behavior.

When to use

- Remote proxies, virtual proxies for lazy loading, and protection proxies for access control.

Consequences

- Adds indirection; useful for cross-cutting concerns but can complicate debugging.

Example

```py
class Subject: def request(self): pass
class Proxy(Subject):
    def __init__(self, real): self._real = real
    def request(self):
        # pre-processing
        return self._real.request()
```
