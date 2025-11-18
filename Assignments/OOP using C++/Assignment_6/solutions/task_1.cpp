// Assignment_1: Geometric Shape with Public Inheritence

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

    // setters
    void setDim1(int d) { dim1 = d; }
    void setDim2(int d) { dim2 = d; }

    // getters
    int getDim1() { return dim1; }
    int getDim2() { return dim2; }

    // default area
    int calcArea() {
        return dim1 * dim2;
    }
};

// Rectangle
class Rect : public GeoShape {
public:
    Rect() = default;
    Rect(int d1, int d2) : GeoShape(d1, d2) {}
};

// Circle
class Circle : public GeoShape {
private:
    const float PI = 3.14;

public:
    Circle() = default;

    // radius
    Circle(int r) : GeoShape(r) {}

    // override area
    float calcArea() {
        int r = getDim1(); // because dim1 is private in base
        return PI * r * r;
    }
};

// Triangle
class Triangle : public GeoShape {
public:
    Triangle() = default;

    Triangle(int base, int height) : GeoShape(base, height) {}

    // override area
    float calcArea() {
        return 0.5 * getDim1() * getDim2();
    }
};

// ===================== Main =====================
int main() {
    Rect r(4, 5);
    Circle c(3);
    Triangle t(10, 6);

    cout << "Rectangle Area = " << r.calcArea() << endl;
    cout << "Circle Area = " << c.calcArea() << endl;
    cout << "Triangle Area = " << t.calcArea() << endl;

    return 0;
}
