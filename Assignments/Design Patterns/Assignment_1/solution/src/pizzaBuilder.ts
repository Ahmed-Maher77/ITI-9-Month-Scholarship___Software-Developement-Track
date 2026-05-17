class Pizza {
  size: string = "";
  cheese: boolean = false;
  pepperoni: boolean = false;
  mushrooms: boolean = false;
}


class PizzaBuilder {
    private pizza: Pizza;
    constructor() {
        this.pizza = new Pizza();
    }

    setSize(size: string): PizzaBuilder {
        this.pizza.size = size;
        return this;
    }

    addCheese(): PizzaBuilder {
        this.pizza.cheese = true;
        return this;
    }

    addPepperoni(): PizzaBuilder {
        this.pizza.pepperoni = true;
        return this;
    }

    addMushrooms(): PizzaBuilder {
        this.pizza.mushrooms = true;
        return this;
    }

    build(): Pizza {
        return this.pizza;
    }
}


const pizza = new PizzaBuilder()
    .setSize("Large")
    .addCheese()
    .addPepperoni()
    .build();

console.log(pizza);