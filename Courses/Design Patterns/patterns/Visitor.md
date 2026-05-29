# Visitor

Intent
: Represent an operation to be performed on elements of an object structure. Visitor lets you define a new operation without changing the classes of the elements.

Problem
: You need to perform many unrelated operations over object structures and want to avoid polluting element classes with these operations.

Solution
: Create a Visitor object with visit methods for each element type; elements accept visitors and call the appropriate visit method.

When to use

- Adding operations to composite structures without modifying element classes.

Consequences

- Makes adding new operations easy; adding new element types requires updating all visitors.

Example (concept)

```py
class Visitor: def visit_element_a(self, a): pass
class ElementA: def accept(self, v): v.visit_element_a(self)
```
