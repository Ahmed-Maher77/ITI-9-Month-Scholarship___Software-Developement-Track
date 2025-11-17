// Assignment_2 v2: Dynamic arrays (raw pointers)

/*
-- Uses raw pointers
-- Picture stores Circle*, Rect*

=> User enters:
-- number of circles
-- number of rectangles
*/


#include "SimpleGraphics.h"
#include <iostream>
using namespace std;

class Point {
    int x, y;
    public:
        Point(int a=0, int b=0): x(a), y(b) {}
        int getX() const { return x; }
        int getY() const { return y; }
};

class Circle {
    Point center;
    int radius;
    public:
        Circle(int x=0, int y=0, int r=1) : center(x,y), radius(r) {}
        void draw() const { drawCircle(center.getX(), center.getY(), radius); }
};

class Rect {
    Point ul, lr;
    public:
        Rect(int x1=0, int y1=0, int x2=5, int y2=5) : ul(x1,y1), lr(x2,y2) {}
        void draw() const { drawRect(ul.getX(), ul.getY(), lr.getX(), lr.getY()); }
};

class Picture {
    Circle** circles;   // pointer to pointer => array of pointers (circles)
    Rect** rects;
    int cNum, rNum;
    public:
        Picture() : circles(nullptr), rects(nullptr), cNum(0), rNum(0) {}

        void setCircles(int n, Circle** arr) { cNum=n; circles=arr; }
        void setRects(int n, Rect** arr) { rNum=n; rects=arr; }

        void paint() {
            for (int i=0; i < cNum; i++) circles[i]->draw();
            for (int i=0; i < rNum; i++) rects[i]->draw();
        }
};




int main() {
    initScreen();   // initialize ASCII renderer

    cout << "\n--- Picture Raw Pointer Version ---\n";

    int numCircles, numRects;

    cout << "Enter number of circles: ";
    cin >> numCircles;

    cout << "Enter number of rectangles: ";
    cin >> numRects;

    // -----------------------------------------
    // Allocate arrays dynamically
    // -----------------------------------------

    Circle** circles = nullptr;
    if (numCircles > 0)
        circles = new Circle*[numCircles];

    Rect** rects = nullptr;
    if (numRects > 0)
        rects = new Rect*[numRects];

    // -----------------------------------------
    // Fill circle data
    // -----------------------------------------
    for (int i = 0; i < numCircles; i++) {
        int x, y, r;
        cout << "\nCircle " << i + 1 << ":\n";
        cout << "  Center X: "; cin >> x;
        cout << "  Center Y: "; cin >> y;
        cout << "  Radius:   "; cin >> r;

        circles[i] = new Circle(x, y, r);
    }

    // -----------------------------------------
    // Fill rectangle data
    // -----------------------------------------
    for (int i = 0; i < numRects; i++) {
        int x1, y1, x2, y2;
        cout << "\nRectangle " << i + 1 << ":\n";
        cout << "  UL X: "; cin >> x1;
        cout << "  UL Y: "; cin >> y1;
        cout << "  LR X: "; cin >> x2;
        cout << "  LR Y: "; cin >> y2;

        rects[i] = new Rect(x1, y1, x2, y2);
    }

    // -----------------------------------------
    // Build the picture and draw
    // -----------------------------------------
    Picture pic;
    pic.setCircles(numCircles, circles);
    pic.setRects(numRects, rects);

    pic.paint();

    // Show final screen
    renderScreen();

    // -----------------------------------------
    // Clean up dynamic arrays
    // -----------------------------------------
    delete[] circles;
    delete[] rects;

    return 0;
}
