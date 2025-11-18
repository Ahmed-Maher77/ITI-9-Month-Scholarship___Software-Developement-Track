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
};

// Triangle
class Triangle : protected GeoShape {
public:
    Triangle() = default;
    Triangle(int base, int height) : GeoShape(base, height) {}

    float getArea() const {
        return 0.5 * getDim1() * getDim2();
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

    return 0;
}
