// Assignment_2 v4: Add Ellipse Class + Draw Ellipse


#include "SimpleGraphics.h"
#include <iostream>
using namespace std;

class Point {
    int x, y;
    public:
        Point(int a = 0, int b = 0) : x(a), y(b) {}
        int getX() const { return x; }
        int getY() const { return y; }
};


// CIRCLE
class Circle {
    Point center;
    int radius;
    public:
        Circle(int x = 0, int y = 0, int r = 5)
            : center(x, y), radius(r) {}
        void draw() const {
            drawCircle(center.getX(), center.getY(), radius);
        }
};


// RECTANGLE
class Rect {
    Point ul, lr;
    public:
        Rect(int x1 = 0, int y1 = 0, int x2 = 5, int y2 = 5): ul(x1, y1), lr(x2, y2) {}
        void draw() const {
            drawRect(ul.getX(), ul.getY(), lr.getX(), lr.getY());
        }
};


// New: ELLIPSE
class Ellipse {
    Point center;
    int a;  // horizontal radius
    int b;  // vertical radius
    public:
        Ellipse(int x = 0, int y = 0, int ra = 8, int rb = 4): center(x, y), a(ra), b(rb) {}
        void draw() const {
            drawEllipse(center.getX(), center.getY(), a, b);
        }
};


// PICTURE CLASS
class Picture {
    Circle* circles;
    Rect* rects;
    Ellipse* ellipses;

    int cNum, rNum, eNum;

public:
    Picture(Circle* cArr, int cCount, Rect* rArr, int rCount, Ellipse* eArr, int eCount): circles(cArr), rects(rArr), ellipses(eArr), cNum(cCount), rNum(rCount), eNum(eCount) {}

    void paint() {
        for (int i = 0; i < cNum; i++)
            circles[i].draw();

        for (int i = 0; i < rNum; i++)
            rects[i].draw();

        for (int i = 0; i < eNum; i++)
            ellipses[i].draw();
    }
};

// ---------------------
// MAIN PROGRAM
// ---------------------
int main() {
    initScreen();

    Circle cArr[2] = {
        Circle(15, 10, 6),
        Circle(40, 15, 8)
    };

    Rect rArr[1] = {
        Rect(5, 5, 25, 12)
    };

    Ellipse eArr[2] = {
        Ellipse(30, 8, 10, 4),
        Ellipse(50, 20, 6, 3)
    };

    Picture pic(cArr, 2, rArr, 1, eArr, 2);
    pic.paint();

    renderScreen();
    return 0;
}
