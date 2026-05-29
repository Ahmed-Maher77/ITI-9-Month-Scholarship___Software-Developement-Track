# Factory Method

Intent
: Define an interface for creating an object, but let subclasses decide which class to instantiate.

Problem
: Client code depends on concrete classes and should be decoupled from specific implementations.

Solution
: Provide a creator interface with a factory method; subclasses override the factory to return concrete products.

Structure / Roles

- Creator: declares factory method.
- ConcreteCreator: implements factory method to return ConcreteProduct.
- Product / ConcreteProduct: objects created by the factory.

When to use

- You need to decouple object creation from usage and allow new product types without changing client code.

Consequences

- Adds flexibility; increases number of classes through subclassing.

Example (pseudo)

```py
class Creator:
    def factory(self):
        raise NotImplementedError

class ConcreteCreator(Creator):
    def factory(self):
        return ConcreteProduct()
```
