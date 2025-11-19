// Assignment_2: Geometric Shape with Protected Inheritence

#include <iostream>
using namespace std;

// GeoShape
class GeoShape {
private:
    int dim1, dim2;

public:
    GeoShape() : dim1(0), dim2(0) {}
    GeoShape(int d) : dim1(d), dim2(d) {}
    GeoShape(int d1, int d2) : dim1(d1), dim2(d2) {}

protected:
    // setters
    void setDim1(int d) { dim1 = d; }
    void setDim2(int d) { dim2 = d; }

    // getters
    int getDim1() const { return dim1; }
    int getDim2() const { return dim2; }

    // base method
    int calcArea() const {
        return dim1 * dim2;
    }

    // Assignment operator overload
    GeoShape& operator=(const GeoShape& other) {
        if (this != &other) {
            dim1 = other.dim1;
            dim2 = other.dim2;
        }
        return *this;
    }
};

// Rectangle
class Rect : protected GeoShape {
public:
    Rect() = default;
    Rect(int d1, int d2) : GeoShape(d1, d2) {}

    // public method to get area
    int getArea() const {
        return calcArea();     // calling protected base method
    }

    // Assignment operator overload
    Rect& operator=(const Rect& other) {
        if (this != &other) {
            GeoShape::operator=(other);
        }
        return *this;
    }
};

// Circle
class Circle : protected GeoShape {
private:
    const float PI = 3.14;

public:
    Circle() = default;
    Circle(int r) : GeoShape(r) {}

    float getArea() const {
        int r = getDim1();     // getDim1 is protected
        return PI * r * r;
    }

    // Assignment operator overload
    Circle& operator=(const Circle& other) {
        if (this != &other) {
            GeoShape::operator=(other);
        }
        return *this;
    }
};

// Triangle
class Triangle : protected GeoShape {
public:
    Triangle() = default;
    Triangle(int base, int height) : GeoShape(base, height) {}

    float getArea() const {
        return 0.5 * getDim1() * getDim2();
    }

    // Assignment operator overload
    Triangle& operator=(const Triangle& other) {
        if (this != &other) {
            GeoShape::operator=(other);
        }
        return *this;
    }
};

// Square (inherits from Triangle with protected inheritance)
class Square : protected Triangle {
public:
    Square() = default;
    Square(int side) : Triangle(side, side) {}

    // Override area calculation for square (side * side, not 0.5 * side * side)
    float getArea() const {
        int side = getDim1(); // getDim1 is protected in Triangle
        return side * side;
    }

    // Assignment operator overload
    Square& operator=(const Square& other) {
        if (this != &other) {
            Triangle::operator=(other);
        }
        return *this;
    }
};

// ===================== Main =====================
int main() {
    Rect r(4, 5);
    Circle c(3);
    Triangle t(10, 6);

    cout << "Rectangle Area = " << r.getArea() << endl;
    cout << "Circle Area = " << c.getArea() << endl;
    cout << "Triangle Area = " << t.getArea() << endl;

    // Square (protected inheritance from Triangle)
    Square sq(5);
    cout << "Square Area = " << sq.getArea() << endl;

    // ================= Assignment Operator Usage =================
    cout << "\n=== Assignment Operator Demo ===\n";
    
    // Create new objects and assign using operator=
    Rect r2(1, 1);
    Circle c2(1);
    Triangle t2(1, 1);
    
    cout << "Before assignment:" << endl;
    cout << "r2 Area = " << r2.getArea() << endl;
    cout << "c2 Area = " << c2.getArea() << endl;
    cout << "t2 Area = " << t2.getArea() << endl;
    
    // Use assignment operator
    r2 = r;
    c2 = c;
    t2 = t;
    
    cout << "\nAfter assignment (r2 = r, c2 = c, t2 = t):" << endl;
    cout << "r2 Area = " << r2.getArea() << " (should match r: " << r.getArea() << ")" << endl;
    cout << "c2 Area = " << c2.getArea() << " (should match c: " << c.getArea() << ")" << endl;
    cout << "t2 Area = " << t2.getArea() << " (should match t: " << t.getArea() << ")" << endl;

    // Square assignment
    Square sq2(1);
    cout << "\nsq2 Area before assignment = " << sq2.getArea() << endl;
    sq2 = sq;
    cout << "sq2 Area after assignment (sq2 = sq) = " << sq2.getArea() << " (should match sq: " << sq.getArea() << ")" << endl;

    return 0;
}
