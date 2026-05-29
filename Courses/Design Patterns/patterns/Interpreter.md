# Interpreter

Intent
: Define a representation for the grammar of a language and provide an interpreter to evaluate sentences in the language.

Problem
: You need to parse and evaluate sentences or expressions in a simple language.

Solution
: Build a class hierarchy where each node represents a grammar rule and implements an `interpret(context)` operation.

When to use

- Simple languages, configuration expressions, and rule engines where a full parser/tooling would be overkill.

Consequences

- Easy to implement for simple grammars but can get complex and hard to maintain for large languages.

Example (concept)

```py
class Expression: def interpret(self, ctx): pass
class Number(Expression): def interpret(self, ctx): return value
```
