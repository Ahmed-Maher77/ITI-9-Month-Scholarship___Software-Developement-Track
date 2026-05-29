# Abstract Factory

Intent
: Provide an interface for creating families of related objects without specifying their concrete classes.

Problem
: You must create related objects that should be used together (product families), and you want to interchange families easily.

Solution
: Define an abstract factory interface with methods to create each kind of product; implement concrete factories for each family.

When to use

- Cross-platform UI toolkits, or when multiple related objects must be consistent.

Consequences

- Promotes consistency across products; can be verbose when product families are small.

Example (concept)

```py
class UIFactory:
    def create_button(self): pass
    def create_menu(self): pass

class WindowsFactory(UIFactory):
    def create_button(self): return WindowsButton()
```
