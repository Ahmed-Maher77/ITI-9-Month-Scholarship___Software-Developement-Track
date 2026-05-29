# Creational Design Patterns

Creational patterns provide flexible ways to create objects while hiding the creation logic and enabling different instantiation strategies.

Common patterns and summaries

## Singleton
Intent: Ensure a class has only one instance and provide a global access point.
When to use: Shared resources (configuration, logging), where a single instance is required.
Consequences: Can introduce global state; use sparingly and prefer dependency injection when possible.

## Factory Method
Intent: Define an interface for creating an object, but let subclasses decide which class to instantiate.
When to use: You need to decouple client code from concrete classes and support family variants.
Consequences: Adds complexity via subclassing; improves extensibility.

## Abstract Factory
Intent: Provide an interface for creating families of related objects without specifying their concrete classes.
When to use: Systems that need to be configured with multiple related products (UI toolkits, cross-platform abstractions).
Consequences: Useful for swapping product families; can be heavyweight for simple cases.

## Builder
Intent: Separate the construction of a complex object from its representation, allowing the same construction process to create different representations.
When to use: Creating complex objects step-by-step (e.g., assembling complex documents, graphs, or configurations).
Consequences: Good for immutability and fluent APIs; introduces an extra Builder component.

## Prototype
Intent: Create new objects by copying an existing instance (a prototype), reducing the need for subclasses.
When to use: Object creation is expensive or configuration is complex; cloning pre-configured instances is desirable.
Consequences: Requires correct cloning implementation; may complicate object lifecycle management.

Examples
- Singleton: prefer lazy initialization and thread-safe approaches in concurrent environments.
- Factory Method/Abstract Factory: use when new concrete types are likely to be added later.
- Builder: commonly used to construct immutable objects via fluent interfaces.

If you want, I can expand any of these patterns into a dedicated lesson with code samples and exercises.
