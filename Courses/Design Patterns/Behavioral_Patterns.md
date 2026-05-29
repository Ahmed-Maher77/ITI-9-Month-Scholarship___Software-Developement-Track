# Behavioral Design Patterns

Behavioral patterns define how objects interact and distribute responsibility, focusing on communication between objects.

Common patterns and summaries

## Chain of Responsibility
Intent: Pass a request along a chain of handlers until one handles it.
When to use: Multiple handlers may process a request; you want to decouple sender and receiver.
Consequences: Reduces coupling; may make debugging the flow harder.

## Command
Intent: Encapsulate a request as an object, allowing parameterization of clients with queues, logs, and undoable operations.
When to use: Implement undo/redo, task queues, or macro recording.
Consequences: Promotes decoupling; increases number of small command classes.

## Iterator
Intent: Provide a way to access elements of an aggregate object sequentially without exposing its underlying representation.
When to use: Traversal of collections with a consistent interface.
Consequences: Simplifies iteration; supports multiple concurrent traversals.

## Observer
Intent: Define a one-to-many dependency so that when one object changes state, dependents are notified automatically.
When to use: Event systems, MVC architectures, and publish/subscribe mechanisms.
Consequences: Can lead to unexpected updates if observers change shared state; consider weak references to avoid memory leaks.

## Strategy
Intent: Define a family of algorithms, encapsulate each one, and make them interchangeable.
When to use: Different variants of an algorithm should be selectable at runtime.
Consequences: Promotes single-responsibility and open/closed principles; increases number of classes.

## State
Intent: Allow an object to alter its behavior when its internal state changes; the object appears to change its class.
When to use: Finite state machines and objects with complex conditional behavior.
Consequences: Makes state-specific behavior explicit and easier to manage.

## Template Method
Intent: Define the skeleton of an algorithm in a method, deferring some steps to subclasses.
When to use: Share common workflow while allowing subclasses to override certain steps.
Consequences: Encourages code reuse; can lead to rigid inheritance structures if overused.

## Visitor
Intent: Represent an operation to be performed on elements of an object structure, allowing new operations without changing those elements.
When to use: When you need to perform many unrelated operations across a composite structure.
Consequences: Adds complexity to object hierarchies; tight coupling between visitor and element interfaces.

If you want, I can expand any pattern into a dedicated lesson with code examples, UML diagrams, and short exercises.
