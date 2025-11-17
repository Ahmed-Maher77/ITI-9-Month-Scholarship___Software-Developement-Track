#include "SimpleGraphics.h"
#include <iostream>
#include <cmath>
#include <cstring>

const int WIDTH = 120;
const int HEIGHT = 40;
static char screen[HEIGHT][WIDTH];

void initScreen() {
    memset(screen, ' ', sizeof(screen));
}

void putPixel(int x, int y) {
    if (x>=0 && x<WIDTH && y>=0 && y<HEIGHT)
        screen[y][x] = '#';
}

void drawLine(int x1, int y1, int x2, int y2) {
    int dx = abs(x2 - x1), sx = (x1 < x2 ? 1 : -1);
    int dy = -abs(y2 - y1), sy = (y1 < y2 ? 1 : -1);
    int err = dx + dy, e2;

    while (true) {
        putPixel(x1, y1);
        if (x1 == x2 && y1 == y2) break;
        e2 = 2 * err;
        if (e2 >= dy) { err += dy; x1 += sx; }
        if (e2 <= dx) { err += dx; y1 += sy; }
    }
}

void drawRect(int x1, int y1, int x2, int y2) {
    for (int x=x1; x<=x2; x++) putPixel(x, y1);
    for (int x=x1; x<=x2; x++) putPixel(x, y2);
    for (int y=y1; y<=y2; y++) putPixel(x1, y);
    for (int y=y1; y<=y2; y++) putPixel(x2, y);
}

void drawCircle(int cx, int cy, int r) {
    for (int y=-r; y<=r; y++)
        for (int x=-r; x<=r; x++)
            if (x*x + y*y <= r*r)
                putPixel(cx+x, cy+y);
}

void drawTriangle(int x1,int y1,int x2,int y2,int x3,int y3){
    drawLine(x1,y1,x2,y2);
    drawLine(x2,y2,x3,y3);
    drawLine(x3,y3,x1,y1);
}

void drawText(int x, int y, const char* txt){
    int i = 0;
    while (txt[i] && x+i < WIDTH) {
        if (y>=0 && y<HEIGHT)
            screen[y][x+i] = txt[i];
        i++;
    }
}

void renderScreen() {
    for (int y=0; y<HEIGHT; y++){
        for (int x=0; x<WIDTH; x++)
            std::cout << screen[y][x];
        std::cout << "\n";
    }
}
