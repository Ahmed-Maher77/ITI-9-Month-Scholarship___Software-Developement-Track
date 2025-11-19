// Assignment_3: Sorting Geometric Shapes by Area + dynamic objects


// - create main function => use objects dynamically created
//                     => try creating pointer of Base
//                     => after creating & calculate areas, volume, pointer of shapes => create sort to print

//                     all shapes ASC , desc


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
    virtual ~GeoShape() {} 
};

// Rectangle
class Rect : public GeoShape {
public:
    Rect(int w, int h) : GeoShape(w, h) {}
    double calcArea() const override { return getDim1() * getDim2(); }
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
};

// Triangle
class Triangle : public GeoShape {
public:
    Triangle(int b, int h) : GeoShape(b, h) {}
    double calcArea() const override {
        return 0.5 * getDim1() * getDim2();
    }
};

// Rhombus
class Rhombus : public GeoShape {
public:
    Rhombus(int d1, int d2) : GeoShape(d1, d2) {}
    double calcArea() const override { return 0.5 * getDim1() * getDim2(); }
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

    // ================= Clean Up =================
    for (auto s : shapes2D) delete s;
    delete c1;

    return 0;
}
