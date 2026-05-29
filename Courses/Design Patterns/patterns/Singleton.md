# Singleton

Intent
: Ensure a class has only one instance and provide a global access point to it.

Problem
: You need a single shared resource (configuration, registry, logger) and want controlled access.

Solution
: Make the constructor private (or otherwise inaccessible) and provide a static method that returns the same instance every call.

Structure / Roles

- Singleton: the class that manages its single instance.

When to use

- Shared resources where multiple instances would cause incorrect behavior or excessive resource usage.

Consequences

- Introduces global state and can make testing harder; prefer dependency injection when feasible.

Example (Python)

```py
class Singleton:
    _instance = None
    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super().__new__(cls)
        return cls._instance
```
