// Assignment_2 v1: Static Objects Only (No Dynamic Memory)


/*
-- Uses simple objects
-- No pointers
-- Picture holds arrays by reference
*/


#include "SimpleGraphics.h"
#include <iostream>
using namespace std;

class Point {
    int x, y;
    public:
        // constructor
        Point(int a=0, int b=0): x(a), y(b) {}
        // getters
        int getX() const { return x; }
        int getY() const { return y; }
};

class Circle {
    Point center;   // composition
    int radius;
    public:
        // constructor
        Circle(int x=0, int y=0, int r=1) : center(x,y), radius(r) {}
        void draw() const { 
            drawCircle(center.getX(), center.getY(), radius); 
        }
};

class Rect {
    Point ul, lr;    // composition
    public:
        // constructor
        Rect(int x1=0, int y1=0, int x2=5, int y2=5) : ul(x1,y1), lr(x2,y2) {}
        // getters
        void draw() const { 
            drawRect(ul.getX(), ul.getY(), lr.getX(), lr.getY()); 
        }
};

class Picture {
    Circle* circles;        // aggregation
    Rect* rects;
    int cNum, rNum;
    public:
        // constructor
        Picture(Circle* cArr, int cCount, Rect* rArr, int rCount): circles(cArr), rects(rArr), cNum(cCount), rNum(rCount) {}
        // to draw the picture
        void paint() {
            for (int i=0; i < cNum; i++) circles[i].draw();
            for (int i=0; i < rNum; i++) rects[i].draw();
        }
};

int main() {
    initScreen();      // initialize ASCII screen

    Circle cArr[2] = { Circle(10,10,5), Circle(30,15,7) };
    Rect   rArr[1] = { Rect(5,5,20,10) };

    Picture pic(cArr, 2, rArr, 1);
    pic.paint();

    // Show screen
    renderScreen();
    return 0;
}
