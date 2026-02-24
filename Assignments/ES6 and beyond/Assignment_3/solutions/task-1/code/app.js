// ========= Shape Class (Abstract) ==========
class Shape {
    constructor(length, width) {
        if (this.constructor === Shape) {
            throw new Error("Abstract classes can't be instantiated.");
        };
        this.Length = length;
        this.Width = width;
    };
    // ========== Methods ==========
    getPerimeter() {
        return 2 * (this.Length + this.Width);
    };
    getArea() {
        return this.Length * this.Width;
    };
    toString() {
        return this.getArea();
    }
}


// ========= Rectangle Class ==========
class Rectangle extends Shape {
    constructor(length, width) {
        super(length, width);
    }
}


// ========= Square Class ==========
class Square extends Rectangle {
    constructor(length, width) {
        super(length, width);
    }
}


// ========= Circle Class ==========
class Circle extends Shape {
    constructor(radius) {
        super(radius, radius);
    }
    // ========== Methods ==========
    getPerimeter() {
        return 2 * Math.PI * this.Length;
    };
    getArea() {
        return Math.PI * (this.Length**2);
    };
}


// ========= Triangle Class ==========
class Triangle extends Shape {
    constructor(base, height) {
        super(base, height);
    }
    // ========== Methods ==========
    getPerimeter() {
        return 3 * this.Length;
    };
    getArea() {
        return 0.5 * this.Length * this.Width;
    };
}






// ================== Usage ==================
const rect = new Rectangle(120, 70);
const square = new Square(80);
const circle = new Circle(40);
const triangle = new Triangle(100, 80);


// Rectangle
console.log("Rectangle Area:", rect.getArea());
console.log("Rectangle Perimeter:", rect.getPerimeter());
// Square
console.log("Square Area:", square.getArea());
console.log("Square Perimeter:", square.getPerimeter());
// Circle
console.log("Circle Area:", circle.getArea());
console.log("Circle Perimeter:", circle.getPerimeter());
// Triangle
console.log("Triangle Area:", triangle.getArea());
console.log("Triangle Perimeter:", triangle.getPerimeter());

console.log("-----------------------");

// Test: toString method
console.log("Rect + Circle:", rect + circle);

console.log("-----------------------");

// Test abstract class instantiation
try {
    const shape = new Shape(50, 50);
} catch (error) {
    console.error(error.message);
}


console.log("-----------------------");





// ================== CANVAS DRAWING ==================
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.font = "16px Arial";
ctx.strokeStyle = "rgb(0, 0, 0)";
ctx.fillStyle = "blue";

// ----- Rectangle -----
ctx.beginPath();
ctx.rect(50, 60, rect.Length, rect.Width);
ctx.fill();
ctx.stroke();
ctx.fillText("Rectangle", 50, 45);

// ----- Square -----
ctx.beginPath();
ctx.rect(250, 60, square.Length, square.Length);
ctx.fill();
ctx.stroke();
ctx.fillText("Square", 250, 45);

// ----- Circle -----
ctx.beginPath();
ctx.arc(450, 100, circle.Length, 0, Math.PI * 2);
ctx.fill();
ctx.stroke();
ctx.fillText("Circle", 420, 45);

// ----- Triangle -----
ctx.beginPath();
ctx.moveTo(650, 140);
ctx.lineTo(650 + triangle.Length, 140);
ctx.lineTo(650 + triangle.Length / 2, 140 - triangle.Width);
ctx.closePath();
ctx.fill();
ctx.stroke();
ctx.fillText("Triangle", 650, 45);
