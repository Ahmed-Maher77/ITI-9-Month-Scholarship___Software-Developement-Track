# Structural Design Patterns

Structural patterns organize classes and objects to form larger structures while keeping them flexible and efficient.

Common patterns and summaries

## Adapter
Intent: Convert the interface of a class into another interface clients expect.
When to use: Integrating legacy code or third-party libraries without changing their source.
Consequences: Adds a thin wrapper layer; keeps clients decoupled from incompatible interfaces.

## Bridge
Intent: Decouple an abstraction from its implementation so the two can vary independently.
When to use: When both abstractions and implementations should be extensible by subclassing.
Consequences: Separates concerns and reduces class proliferation in some scenarios.

## Composite
Intent: Compose objects into tree structures to represent part–whole hierarchies.
When to use: When clients should treat individual objects and compositions uniformly (e.g., UI components, file systems).
Consequences: Simplifies client code but can make debugging and object lifecycle management harder.

## Decorator
Intent: Attach additional responsibilities to an object dynamically.
When to use: To add behavior without altering existing classes or using subclassing.
Consequences: Provides greater flexibility than static inheritance; can produce many small decorator classes.

## Facade
Intent: Provide a unified, higher-level interface to a set of interfaces in a subsystem.
When to use: Simplify complex subsystems and make them easier to use by clients.
Consequences: Reduces coupling between clients and subsystems; facade may become a chokepoint if overused.

## Flyweight
Intent: Minimize memory use by sharing as much data as possible between similar objects.
When to use: Large numbers of objects that share common intrinsic state (e.g., characters in text rendering).
Consequences: Can significantly reduce memory usage but increases complexity of managing shared state.

## Proxy
Intent: Provide a surrogate or placeholder for another object to control access to it.
When to use: Remote proxies, access control, lazy initialization, or logging.
Consequences: Adds a level of indirection that enables cross-cutting concerns without changing the subject.

I can create separate lessons for any of these patterns with diagrams and language-specific code samples on request.
