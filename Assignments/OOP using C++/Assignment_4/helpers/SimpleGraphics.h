#ifndef SIMPLEGRAPHICS_H_INCLUDED
#define SIMPLEGRAPHICS_H_INCLUDED

//#ifndef SIMPLE_GRAPHICS_H
//#define SIMPLE_GRAPHICS_H

void initScreen();
void drawCircle(int cx, int cy, int r);
void drawRect(int x1, int y1, int x2, int y2);
void drawLine(int x1, int y1, int x2, int y2);
void drawTriangle(int x1,int y1,int x2,int y2,int x3,int y3);
void putPixel(int x, int y);
void drawText(int x, int y, const char* txt);
void renderScreen();

//#endif


#endif // SIMPLEGRAPHICS_H_INCLUDED
