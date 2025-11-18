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

void drawEllipse(int cx, int cy, int rx, int ry) {
    if (rx <= 0 || ry <= 0) return;

    auto plotSymmetric = [&](int x, int y) {
        putPixel(cx + x, cy + y);
        putPixel(cx + x, cy - y);
        putPixel(cx - x, cy + y);
        putPixel(cx - x, cy - y);
    };

    long long rxSq = 1LL * rx * rx;
    long long rySq = 1LL * ry * ry;
    long long twoRxSq = 2 * rxSq;
    long long twoRySq = 2 * rySq;

    long long x = 0;
    long long y = ry;
    long long px = 0;
    long long py = twoRxSq * y;

    long double p = rySq - (rxSq * ry) + (0.25L * rxSq);

    // Region 1: slope magnitude < 1
    while (px < py) {
        plotSymmetric(static_cast<int>(x), static_cast<int>(y));
        x++;
        px += twoRySq;
        if (p < 0) {
            p += rySq + px;
        } else {
            y--;
            py -= twoRxSq;
            p += rySq + px - py;
        }
    }

    // Region 2: slope magnitude >= 1
    p = rySq * (x + 0.5L) * (x + 0.5L) + rxSq * (y - 1) * (y - 1) - rxSq * rySq;
    while (y >= 0) {
        plotSymmetric(static_cast<int>(x), static_cast<int>(y));
        y--;
        py -= twoRxSq;
        if (p > 0) {
            p += rxSq - py;
        } else {
            x++;
            px += twoRySq;
            p += rxSq - py + px;
        }
    }
}

void renderScreen() {
    for (int y=0; y<HEIGHT; y++){
        for (int x=0; x<WIDTH; x++)
            std::cout << screen[y][x];
        std::cout << "\n";
    }
}
