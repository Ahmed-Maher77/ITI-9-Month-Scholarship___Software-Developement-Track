// ========== Shape Constructor (Abstract) ==========
function Shape(w, h) {
    // prevent it from being instantiated directly
    if (this.constructor === Shape) 
        throw new Error("Cannot instantiate abstract class");
    
    Object.defineProperties(this, {
        width: { value: w },    // non-writable, non-enumerable, non-configurable
        height: { value: h },
        perimeter: {
            value: function() {
                return 2 * (this.width + this.height);
            }},
        area: {
            value: function() {
                return this.width * this.height;
            }},
        toString: {
            value: function() {
                return `Wisth: ${this.width}, Height: ${this.height}`;
            }},
        valueOf: {
            value: function() {
                return this.area();
            }
        }
    });
}


// ========== Rectangle Constructor ==========
function Rectangle(w, h) {
    Shape.call(this, w, h);
}


// ========== Square Constructor ==========
function Square(side) {
    if (Square.instancesCount >= 1)
        throw new Error("Only one instance of Square is allowed");
    
    Shape.call(this, side, side);
    Square.instancesCount++;
}
Square.instancesCount = 0;





// ========== Testing ==========
// Attempt to instantiate Shape directly
console.log("================ Attempt to instantiate Shape directly ================");

try {
    const shape1 = new Shape(10, 20);
} catch (e) {
    console.error(e.message);
}


// Instantiate Rectangle
console.log("================ Instantiate Rectangle ================");
const rect1 = new Rectangle(10, 20);
console.log("Rectangle Area:", rect1.area());
console.log("Rectangle Perimeter:", rect1.perimeter());
console.log("Rectangle toString:", rect1.toString());
console.log("Rectangle valueOf (Area):", rect1.valueOf());
// non-writable test
rect1.width = 50;  // should have no effect
console.log(rect1);
const rect2 = new Rectangle(15, 7);   // area: 105



// Instantiate Rectangle
console.log("================ Instantiate Square ================");
const sq1 = new Square(10);
console.log("Square Area:", sq1.area());
console.log("Square Perimeter:", sq1.perimeter());
console.log("Square toString:", sq1.toString());
console.log("Square valueOf (Area):", sq1.valueOf());



// valueOf test
console.log("================ valueOf Test ================");
console.log("Square + 20 =", sq1 + 20);  // should add area + 20
console.log("Square + 20 =", sq1 + 20);  // should add area + 20
console.log("rect1 + rect2 =", rect1 + rect2);  // should add areas of both rectangles


// Attempt to instantiate second Square
console.log("================ Attempt to instantiate second Square ================");
try {
    const sq2 = new Square(10);
} catch (e) {
    console.error(e.message);
}