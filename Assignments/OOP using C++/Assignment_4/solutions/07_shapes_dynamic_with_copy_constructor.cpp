// Assignment_2 v3: With Copy Constructor and Assignment Operator


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
        void draw() const { 
            drawRect(ul.getX(), ul.getY(), lr.getX(), lr.getY()); 
        }
};

class Picture {
    Circle* circles;        
    Rect* rects;
    int cNum, rNum;

    public:

        // constructor
        Picture(Circle* cArr, int cCount, Rect* rArr, int rCount)
            : circles(cArr), rects(rArr), cNum(cCount), rNum(rCount) {}

        // ------------------------------
        // COPY CONSTRUCTOR (Deep Copy)
        // ------------------------------
        Picture(const Picture& other) {
            cNum = other.cNum;
            rNum = other.rNum;

            // allocate new arrays
            circles = new Circle[cNum];
            rects   = new Rect[rNum];

            // copy values
            for (int i = 0; i < cNum; i++)
                circles[i] = other.circles[i];

            for (int i = 0; i < rNum; i++)
                rects[i] = other.rects[i];
        }

        // -----------------------------------------
        // COPY ASSIGNMENT OPERATOR (Deep Copy)
        // -----------------------------------------
        Picture& operator=(const Picture& other) {

            if (this != &other) {   // avoid self-assignment
                // copy new sizes
                cNum = other.cNum;
                rNum = other.rNum;

                // allocate new arrays
                circles = new Circle[cNum];
                rects   = new Rect[rNum];

                // copy data
                for (int i = 0; i < cNum; i++)
                    circles[i] = other.circles[i];
                for (int i = 0; i < rNum; i++)
                    rects[i] = other.rects[i];
            }
            return *this;
        }

        // destructor
        ~Picture() {
            delete[] circles;
            delete[] rects;
        }

        // draw the picture
        void paint() {
            for (int i=0; i < cNum; i++) circles[i].draw();
            for (int i=0; i < rNum; i++) rects[i].draw();
        }
};

int main() {
    initScreen();

    Circle cArr[2] = { Circle(10,10,5), Circle(30,15,7) };
    Rect   rArr[1] = { Rect(5,5,20,10) };

    Picture pic(cArr, 2, rArr, 1);

    // test copy constructor
    Picture pic2 = pic;

    // test assignment operator
    Picture pic3(cArr, 2, rArr, 1);
    pic3 = pic;

    pic.paint();
    pic2.paint();
    pic3.paint();

    renderScreen();
    return 0;
}
