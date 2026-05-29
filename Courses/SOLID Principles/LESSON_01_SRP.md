# Lesson 01 — Single Responsibility Principle (SRP)

Overview
- The Single Responsibility Principle states that a class (or module) should have one, and only one, reason to change. In practice this means each unit should address a single concern.

Why it matters
- Systems with clearly-separated responsibilities are easier to reason about, test, maintain, and evolve. SRP reduces coupling and limits the blast radius of changes.

Practical guidance
- Identify responsibilities by asking: "How many distinct reasons would cause me to edit this type?"
- Keep public methods small and focused; prefer composing small classes over large multi-purpose ones.
- Use interfaces to separate roles: data retrieval, parsing, validation, mapping, storage, and logging should typically be separate components.

Illustrative example
Original problematic method (single method with many responsibilities):

```csharp
public void ProcessTrades(Stream stream)
{
	// read, parse, validate, map, persist, and log — all in one method
}
```

Refactored structure (SRP applied):

```csharp
public class TradeProcessor
{
	private readonly ITradeDataProvider _dataProvider;
	private readonly ITradeParser _parser;
	private readonly ITradeStorage _storage;

	public void ProcessTrades()
	{
		var lines = _dataProvider.GetTradeData();
		var trades = _parser.Parse(lines);
		_storage.Persist(trades);
	}
}
```

Best practices
- Prefer composition and small interfaces over large classes with many responsibilities.
- Keep side effects (I/O, logging, persistence) at the outer boundaries; core business logic should be pure and testable.
- Write unit tests for each focused component.

Common pitfalls
- Splitting methods but keeping all components in a single god-class — extract into separate types and depend on abstractions.
- Over-applying SRP: avoid creating tiny classes that add unnecessary indirection; group cohesive behavior sensibly.

Further reading
- Robert C. Martin — Clean Architecture and SOLID principles.

