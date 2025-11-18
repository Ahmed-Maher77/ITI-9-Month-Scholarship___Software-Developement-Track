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
};


// Rectangle
class Rect : public GeoShape {
    public:
        Rect() = default;
        Rect(int d1, int d2) : GeoShape(d1, d2) {}
        double calcArea() const override {
            return getDim1() * getDim2();
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

    cout << "Cube Area = " << C.calcArea() << endl;
    cout << "Cube Volume = " << C.calcVolume() << endl;

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

    return 0;
}
