# Lesson 03 — Liskov Substitution Principle (LSP)

Overview
- LSP formalizes a fundamental expectation of polymorphism: objects of a derived type should be usable wherever their base type is expected, without the client needing to know the difference.

Why it matters
- Violations of LSP lead to fragile hierarchies and runtime surprises. Respecting LSP enables safe polymorphism and predictable behavior when substituting implementations.

Rules to enforce
- Preconditions must not be strengthened by a subtype.
- Postconditions must not be weakened by a subtype.
- Class invariants must be preserved by subtypes.

Concrete example (anti-pattern):
```csharp
// Base class allows null destination
public virtual decimal CalculateCost(Address destination)
{
	if (destination == null) return _flatRate;
	return ComputeBasedOnDistance(destination);
}

// Subtype strengthens precondition — BAD
public override decimal CalculateCost(Address destination)
{
	if (destination == null) throw new ArgumentNullException();
}
```

Variance notes
- In C# use `out` (covariant) and `in` (contravariant) on generic interfaces when the use-site semantics permit it (producers vs consumers).

Design guidance
- Prefer composition to inheritance unless a subtype truly satisfies the contract of the base type.
- Encode expectations in unit tests for contracts so new subtypes are validated against them.

