# Adapter

Intent
: Convert the interface of a class into another interface clients expect.

Problem
: You need to use an existing class whose interface is incompatible with the client code.

Solution
: Create an Adapter that implements the client's expected interface and delegates calls to the adaptee.

When to use

- Integrating legacy components or third-party libraries without modifying them.

Consequences

- Adds a light wrapper; keeps client code decoupled from incompatible interfaces.

Example (Python)

```py
class Adapter:
    def __init__(self, adaptee): self.adaptee = adaptee
    def request(self): return self.adaptee.specific_request()
```
