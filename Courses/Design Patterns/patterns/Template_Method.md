# Template Method

Intent
: Define the skeleton of an algorithm in an operation, deferring some steps to subclasses.

Problem
: Multiple algorithms share a common structure but differ in specific steps.

Solution
: Implement a template method in a base class that calls primitive operations; subclasses override those primitives.

When to use

- Implementing invariant parts of algorithms and allowing customization of specific steps.

Consequences

- Encourages reuse and consistent algorithms; can lead to rigid inheritance hierarchies.

Example (pseudo)

```py
class Abstract:
    def template(self):
        self.step1(); self.step2()
    def step1(self): pass
```
