# Strategy

Intent
: Define a family of algorithms, encapsulate each one, and make them interchangeable.

Problem
: You have multiple variants of an algorithm and want to switch between them without changing clients.

Solution
: Extract algorithms into separate strategy classes that implement a common interface; clients hold a reference to a strategy.

When to use

- Sorting strategies, compression algorithms, or interchangeable business rules.

Consequences

- Promotes single responsibility and open/closed principles; increases the number of small classes.

Example (pseudo)

```py
class Strategy: def execute(self, data): pass
class ConcreteStrategyA(Strategy): def execute(self,d): ...
```
