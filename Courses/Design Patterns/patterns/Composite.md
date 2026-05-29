# Composite

Intent
: Compose objects into tree structures to represent part–whole hierarchies; let clients treat individual objects and compositions uniformly.

Problem
: You need to represent hierarchies where leaf objects and composite objects should be handled the same way.

Solution
: Define a common component interface and implement leaf and composite classes; composites hold children components.

When to use

- File systems, graphical scene trees, UI component hierarchies.

Consequences

- Simplifies client code; can complicate component lifecycle and traversal logic.

Example (pseudo)

```py
class Component: def operation(self): pass
class Leaf(Component): def operation(self): pass
class Composite(Component):
    def __init__(self): self.children = []
    def operation(self): return [c.operation() for c in self.children]
```
