# Lesson 05 — Dependency Inversion Principle (DIP)

Overview
- DIP requires that high-level modules do not depend on low-level modules directly; both should depend on abstractions. Abstractions should not depend on details — details should depend on abstractions.

Related concepts
- IoC (Inversion of Control): the framework or container orchestrates object lifecycles and dependencies.
- DI (Dependency Injection): a technique to supply dependencies (constructor, setter, or interface injection).

Before / After
- BEFORE (violation): `TradeProcessor` creates or directly depends on `SqlStorage` and `ConsoleLogger`.
- AFTER (DIP applied): `TradeProcessor` depends on `ITradeStorage` and `ILogger`; concrete implementations are injected at composition time.

Example (constructor injection)
```csharp
public class TradeProcessor
{
	private readonly ITradeStorage _storage;
	private readonly ILogger _logger;

	public TradeProcessor(ITradeStorage storage, ILogger logger)
	{
		_storage = storage; _logger = logger;
	}
}
```

Benefits
- Improves testability (mock or fake dependencies), enables swapping implementations with minimal change, and reduces coupling between layers.

Common pitfalls
- Depending on concrete types in high-level code.
- Overusing DI frameworks for trivial projects where constructor wiring is sufficient.

