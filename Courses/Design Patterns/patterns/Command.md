# Command

Intent
: Encapsulate a request as an object, enabling parameterization of clients, queuing, logging, and undoable operations.

Problem
: You need to decouple the object that invokes an operation from the one that knows how to perform it.

Solution
: Create Command objects with `execute()` methods; invokers call execute, receivers perform the work.

When to use

- Implementing undo/redo, task queues, and macro recording.

Consequences

- Increases the number of classes but improves flexibility and testability.

Example (pseudo)

```py
class Command: def execute(self): pass
class LightOnCommand(Command):
    def execute(self): light.on()
```
