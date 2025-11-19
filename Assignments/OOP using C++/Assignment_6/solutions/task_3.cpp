// Assignment_3: Geometric Shape as Abstract class + Rhombus (2D) + Cube (3D)


#include <iostream>
using namespace std;

// GeoShape
class GeoShape
{
private:
    int dim1, dim2;

public:
    GeoShape() : dim1(0), dim2(0) {}
    GeoShape(int d) : dim1(d), dim2(d) {}
    GeoShape(int d1, int d2) : dim1(d1), dim2(d2) {}
    // base area
    virtual double calcArea() const
    {
        return dim1 * dim2;
    }
    
    protected:
    // setters
    void setDim1(int d) { dim1 = d; }
    void setDim2(int d) { dim2 = d; }

    // getters
    int getDim1() const { return dim1; }
    int getDim2() const { return dim2; }

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
class Rect : public GeoShape {
    public:
        Rect() = default;
        Rect(int d1, int d2) : GeoShape(d1, d2) {}
        double calcArea() const override {
            return getDim1() * getDim2();
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
class Circle : public GeoShape {
private:
    const float PI = 3.14;

public:
    Circle() = default;

    // radius
    Circle(int r) : GeoShape(r) {}

    // override area
    double calcArea() const override {
        int r = getDim1(); // because dim1 is private in base
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
    Triangle() = default;

    Triangle(int base, int height) : GeoShape(base, height) {}

    // override area
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
class Rhombus : public GeoShape
{
public:
    Rhombus() = default;

    Rhombus(int x, int y) : GeoShape(x, y) {}

    double calcArea() const override
    {
        return 0.5 * getDim1() * getDim2();
    }

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
    Square() = default;
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
// GeoShape 3D
class GeoShape3D {
    protected:
        int dim1, dim2, dim3;
    public:
        GeoShape3D() = default;
        GeoShape3D(int d): dim1(d), dim2(d), dim3(d) {}
        GeoShape3D(int d1, int d2, int d3): dim1(d1), dim2(d2), dim3(d3) {}
        // virtual funs
        virtual double calcVolume() = 0;
        virtual double calcArea() = 0;
        virtual double calcPerimeter() = 0;

        // Assignment operator overload
        GeoShape3D& operator=(const GeoShape3D& other) {
            if (this != &other) {
                dim1 = other.dim1;
                dim2 = other.dim2;
                dim3 = other.dim3;
            }
            return *this;
        }
};

class Cube : public GeoShape3D {
    public:
        Cube() = default;
        Cube(int d): GeoShape3D(d) {};
        double calcVolume() override {
            return dim1 * dim2 * dim3;
        };
        double calcArea() override {
            return 6 * dim1 * dim1;
        };
        double calcPerimeter() override {
            // Perimeter of one face (square) = 4 * side
            return 4 * dim1;
        };

        // Assignment operator overload
        Cube& operator=(const Cube& other) {
            if (this != &other) {
                GeoShape3D::operator=(other);
            }
            return *this;
        }
};


// =============================== Compare 2 shapes (Area) ===============================
bool compareArea(const GeoShape& s1, const GeoShape& s2) {
    return s1.calcArea() > s2.calcArea();
}


// ===================== Main =====================
int main()
{
    Rect r(4, 5);
    Circle c(3);
    Triangle t(10, 6);
    Cube C(3);

    cout << "Rectangle Area = " << r.calcArea() << endl;
    cout << "Circle Area = " << c.calcArea() << endl;
    cout << "Triangle Area = " << t.calcArea() << endl;

    // Square (protected inheritance from Triangle)
    Square sq(5);
    cout << "Square Area = " << sq.calcArea() << endl;

    cout << "Cube Area = " << C.calcArea() << endl;
    cout << "Cube Volume = " << C.calcVolume() << endl;
    cout << "Cube Perimeter (of one face) = " << C.calcPerimeter() << endl;

    if (compareArea(r, c)) {
        cout << "Rectangle has more area than Circle" << endl;
    }
    else {
        cout << "Circle has more area than Rectangle" << endl;
    }

    if (compareArea(c, t)) {
        cout << "Circle has more area than Triangle" << endl;
    }
    else {
        cout << "Triangle has more area than Circle" << endl;
    }

    // ================= Assignment Operator Usage =================
    cout << "\n=== Assignment Operator Demo (2D Shapes) ===\n";
    
    // Create new 2D objects and assign using operator=
    Rect r2(1, 1);
    Circle c2(1);
    Triangle t2(1, 1);
    Rhombus rh(8, 4);
    
    cout << "Before assignment:" << endl;
    cout << "r2 Area = " << r2.calcArea() << endl;
    cout << "c2 Area = " << c2.calcArea() << endl;
    cout << "t2 Area = " << t2.calcArea() << endl;
    
    // Use assignment operator
    r2 = r;
    c2 = c;
    t2 = t;
    
    cout << "\nAfter assignment (r2 = r, c2 = c, t2 = t):" << endl;
    cout << "r2 Area = " << r2.calcArea() << " (should match r: " << r.calcArea() << ")" << endl;
    cout << "c2 Area = " << c2.calcArea() << " (should match c: " << c.calcArea() << ")" << endl;
    cout << "t2 Area = " << t2.calcArea() << " (should match t: " << t.calcArea() << ")" << endl;
    
    // Test Rhombus assignment
    Rhombus rh2(1, 1);
    cout << "\nRhombus rh2 before assignment: Area = " << rh2.calcArea() << endl;
    rh2 = rh;
    cout << "Rhombus rh2 after assignment (rh2 = rh): Area = " << rh2.calcArea() << " (should match rh: " << rh.calcArea() << ")" << endl;

    // Test Square assignment
    Square sq2(1);
    cout << "\nSquare sq2 before assignment: Area = " << sq2.calcArea() << endl;
    sq2 = sq;
    cout << "Square sq2 after assignment (sq2 = sq): Area = " << sq2.calcArea() << " (should match sq: " << sq.calcArea() << ")" << endl;

    // ================= Assignment Operator Usage (3D Shapes) =================
    cout << "\n=== Assignment Operator Demo (3D Shapes) ===\n";
    
    Cube C2(1);
    cout << "Cube C2 before assignment:" << endl;
    cout << "  Area = " << C2.calcArea() << ", Volume = " << C2.calcVolume() << ", Perimeter = " << C2.calcPerimeter() << endl;
    
    C2 = C;
    cout << "\nCube C2 after assignment (C2 = C):" << endl;
    cout << "  Area = " << C2.calcArea() << " (should match C: " << C.calcArea() << ")" << endl;
    cout << "  Volume = " << C2.calcVolume() << " (should match C: " << C.calcVolume() << ")" << endl;
    cout << "  Perimeter = " << C2.calcPerimeter() << " (should match C: " << C.calcPerimeter() << ")" << endl;

    return 0;
}
