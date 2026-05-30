# Lesson 02 — Open / Closed Principle (OCP)

Overview
- The Open/Closed Principle prescribes that software entities (classes, modules, functions) should be open for extension but closed for modification. You should be able to add new behavior without altering existing, tested code.

Why it matters
- Adhering to OCP reduces regression risk and enables teams to extend functionality with minimal changes to stable components — critical for large or deployed systems.

How to apply
- Define stable contracts (interfaces or abstract base classes) that represent extension points.
- Implement new behavior by adding new classes that conform to the contract rather than modifying existing implementations.
- Use dependency injection so clients depend on abstractions and can accept new implementations without change.

Example pattern
```csharp
public interface ITradeProcessor { void ProcessTrades(); }

// existing implementation remains unchanged
public class TradeProcessor : ITradeProcessor { /* ... */ }

// new behavior added via a new class
public class TradeProcessorWithAudit : ITradeProcessor { /* adds audit logic */ }
```

Best practices
- Keep contracts minimal and stable. Changing the contract is effectively a breaking change.
- Prefer composition over inheritance for extension when it keeps contracts stable.
- Document extension points clearly for future contributors.

Common pitfalls
- Adding flag-based branching inside existing classes to support new behavior (violates OCP).
- Extending via modification of widely-used classes instead of adding new implementations.

