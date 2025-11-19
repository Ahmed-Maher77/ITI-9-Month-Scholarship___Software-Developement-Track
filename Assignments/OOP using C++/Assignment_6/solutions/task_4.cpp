// Assignment_4: Sorting Geometric Shapes by Area + dynamic objects

#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// =============================== 2D ===============================
class GeoShape {
private:
    int dim1, dim2;

public:
    GeoShape() : dim1(0), dim2(0) {}
    GeoShape(int d) : dim1(d), dim2(d) {}
    GeoShape(int d1, int d2) : dim1(d1), dim2(d2) {}

    virtual double calcArea() const {
        return dim1 * dim2;
    }

protected:
    int getDim1() const { return dim1; }
    int getDim2() const { return dim2; }

public:
    // Assignment operator overload
    GeoShape& operator=(const GeoShape& other) {
        if (this != &other) {
            dim1 = other.dim1;
            dim2 = other.dim2;
        }
        return *this;
    }

    virtual ~GeoShape() {}
};

// Rectangle
class Rect : public GeoShape {
public:
    Rect(int w, int h) : GeoShape(w, h) {}
    double calcArea() const override { return getDim1() * getDim2(); }

    // Assignment operator overload
    Rect& operator=(const Rect& other) {
        if (this != &other) {
            GeoShape::operator=(other);
        }
        return *this;
    }
};

// Circle
class Circle : public GeoShape {
private:
    const float PI = 3.14;
public:
    Circle(int r) : GeoShape(r) {}
    double calcArea() const override {
        int r = getDim1();
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
class Triangle : public GeoShape {
public:
    Triangle(int b, int h) : GeoShape(b, h) {}
    double calcArea() const override {
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

// Rhombus
class Rhombus : public GeoShape {
public:
    Rhombus(int d1, int d2) : GeoShape(d1, d2) {}
    double calcArea() const override { return 0.5 * getDim1() * getDim2(); }

    // Assignment operator overload
    Rhombus& operator=(const Rhombus& other) {
        if (this != &other) {
            GeoShape::operator=(other);
        }
        return *this;
    }
};

// Square (inherits from Triangle with protected inheritance)
class Square : protected Triangle {
public:
    Square(int side) : Triangle(side, side) {}

    // Override area calculation for square (side * side, not 0.5 * side * side)
    double calcArea() const override {
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

// =============================== 3D ===============================
class GeoShape3D {
protected:
    int dim1, dim2, dim3;

public:
    GeoShape3D() {}
    GeoShape3D(int d) : dim1(d), dim2(d), dim3(d) {}
    GeoShape3D(int d1, int d2, int d3) : dim1(d1), dim2(d2), dim3(d3) {}

    virtual double calcArea() const = 0;
    virtual double calcVolume() const = 0;
    virtual double calcPerimeter() const = 0;

    // Assignment operator overload
    GeoShape3D& operator=(const GeoShape3D& other) {
        if (this != &other) {
            dim1 = other.dim1;
            dim2 = other.dim2;
            dim3 = other.dim3;
        }
        return *this;
    }

    virtual ~GeoShape3D() {}
};

// Cube
class Cube : public GeoShape3D {
public:
    Cube(int d) : GeoShape3D(d) {}

    double calcArea() const override {
        return 6 * dim1 * dim1;
    }

    double calcVolume() const override {
        return dim1 * dim2 * dim3;
    }

    double calcPerimeter() const override {
        // Perimeter of one face (square) = 4 * side
        return 4 * dim1;
    }

    // Assignment operator overload
    Cube& operator=(const Cube& other) {
        if (this != &other) {
            GeoShape3D::operator=(other);
        }
        return *this;
    }
};

// =============================== Compare 2D Shapes ===============================
bool compareAreaASC(const GeoShape* s1, const GeoShape* s2) {
    return s1->calcArea() < s2->calcArea();
}

bool compareAreaDESC(const GeoShape* s1, const GeoShape* s2) {
    return s1->calcArea() > s2->calcArea();
}

// =============================== MAIN ===============================
int main() {

    // =================  DYNAMIC OBJECTS  =================
    vector<GeoShape*> shapes2D;

    shapes2D.push_back(new Rect(4, 5));
    shapes2D.push_back(new Circle(3));
    shapes2D.push_back(new Triangle(10, 6));
    shapes2D.push_back(new Rhombus(8, 4));
    // Note: Square cannot be added to vector<GeoShape*> due to protected inheritance from Triangle

    // ================= Print All 2D Areas =================
    cout << "\n=== All 2D Shapes Areas ===\n";
    for (auto s : shapes2D) {
        cout << s->calcArea() << endl;
    }

    // ================= SORT ASC =================
    sort(shapes2D.begin(), shapes2D.end(), compareAreaASC);

    cout << "\n=== Sorted ASC (smallest → largest) ===\n";
    for (auto s : shapes2D) {
        cout << s->calcArea() << endl;
    }

    // ================= SORT DESC =================
    sort(shapes2D.begin(), shapes2D.end(), compareAreaDESC);

    cout << "\n=== Sorted DESC (largest → smallest) ===\n";
    for (auto s : shapes2D) {
        cout << s->calcArea() << endl;
    }

    // ================= 3D shapes =================
    GeoShape3D* c1 = new Cube(3);

    cout << "\n=== Cube Data ===\n";
    cout << "Area = " << c1->calcArea() << endl;
    cout << "Volume = " << c1->calcVolume() << endl;
    cout << "Perimeter (of one face) = " << c1->calcPerimeter() << endl;

    // ================= Assignment Operator Usage =================
    cout << "\n=== Assignment Operator Demo ===\n";
    
    // For 2D shapes, we'll demonstrate with stack objects
    Rect rect1(4, 5);
    Circle circle1(3);
    Triangle triangle1(10, 6);
    Rhombus rhombus1(8, 4);
    Square square1(5);
    
    Rect rect2(1, 1);
    Circle circle2(1);
    Triangle triangle2(1, 1);
    Rhombus rhombus2(1, 1);
    Square square2(1);
    
    cout << "Before assignment:" << endl;
    cout << "rect2 Area = " << rect2.calcArea() << endl;
    cout << "circle2 Area = " << circle2.calcArea() << endl;
    cout << "triangle2 Area = " << triangle2.calcArea() << endl;
    cout << "rhombus2 Area = " << rhombus2.calcArea() << endl;
    cout << "square2 Area = " << square2.calcArea() << endl;
    
    // Use assignment operator
    rect2 = rect1;
    circle2 = circle1;
    triangle2 = triangle1;
    rhombus2 = rhombus1;
    square2 = square1;
    
    cout << "\nAfter assignment:" << endl;
    cout << "rect2 Area = " << rect2.calcArea() << " (should match rect1: " << rect1.calcArea() << ")" << endl;
    cout << "circle2 Area = " << circle2.calcArea() << " (should match circle1: " << circle1.calcArea() << ")" << endl;
    cout << "triangle2 Area = " << triangle2.calcArea() << " (should match triangle1: " << triangle1.calcArea() << ")" << endl;
    cout << "rhombus2 Area = " << rhombus2.calcArea() << " (should match rhombus1: " << rhombus1.calcArea() << ")" << endl;
    cout << "square2 Area = " << square2.calcArea() << " (should match square1: " << square1.calcArea() << ")" << endl;
    
    // For 3D shapes
    Cube cube1(3);
    Cube cube2(1);
    
    cout << "\nCube cube2 before assignment:" << endl;
    cout << "  Area = " << cube2.calcArea() << ", Volume = " << cube2.calcVolume() << ", Perimeter = " << cube2.calcPerimeter() << endl;
    
    cube2 = cube1;
    cout << "\nCube cube2 after assignment (cube2 = cube1):" << endl;
    cout << "  Area = " << cube2.calcArea() << " (should match cube1: " << cube1.calcArea() << ")" << endl;
    cout << "  Volume = " << cube2.calcVolume() << " (should match cube1: " << cube1.calcVolume() << ")" << endl;
    cout << "  Perimeter = " << cube2.calcPerimeter() << " (should match cube1: " << cube1.calcPerimeter() << ")" << endl;

    // ================= Clean Up =================
    for (auto s : shapes2D) delete s;
    delete c1;

    return 0;
}
