# Lesson 04 — Interface Segregation Principle (ISP)

Overview
- ISP advises designing narrow, role-specific interfaces so that clients depend only on the operations they actually require.

Why it matters
- Fat or god-like interfaces force implementers to supply irrelevant methods, increase coupling, and encourage brittle code.

How to apply
- Decompose large interfaces into small, cohesive contracts (e.g., `ICreate<T>`, `IRead<T>`, `IUpdate<T>`, `IDelete<T>`).
- Compose interfaces for types that need multiple capabilities rather than exposing all members on a single interface.

Example
```csharp
public interface IDelete<T> { void Delete(T entity); }
public interface IReadOne<T> { T ReadOne(Guid id); }

public class DeleteConfirmation : IDelete<Entity>
{
	private readonly IDelete<Entity> _inner;
	public void Delete(Entity entity) { /* confirm then delegate */ }
}
```

Best practices
- Design interfaces around specific roles and use cases.
- Favor multiple small interfaces over a single multi-purpose interface.
- Document expected behavior for each interface method to avoid ambiguity for implementers.

