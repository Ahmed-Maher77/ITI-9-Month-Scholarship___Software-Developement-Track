class Pizza {
    size = "";
    cheese = false;
    pepperoni = false;
    mushrooms = false;
}
class PizzaBuilder {
    pizza;
    constructor() {
        this.pizza = new Pizza();
    }
    setSize(size) {
        this.pizza.size = size;
        return this;
    }
    addCheese() {
        this.pizza.cheese = true;
        return this;
    }
    addPepperoni() {
        this.pizza.pepperoni = true;
        return this;
    }
    addMushrooms() {
        this.pizza.mushrooms = true;
        return this;
    }
    build() {
        return this.pizza;
    }
}
const pizza = new PizzaBuilder()
    .setSize("Large")
    .addCheese()
    .addPepperoni()
    .build();
console.log(pizza);
export {};
//# sourceMappingURL=pizzaBuilder.js.map