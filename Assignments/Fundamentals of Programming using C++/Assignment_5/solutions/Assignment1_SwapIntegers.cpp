// Assignment 1: swap 2 integers by address, by refrence
#include <iostream>
using namespace std;

// By reference
void swapByRef(int &a, int &b) {
    int temp = a;
    a = b;
    b = temp;
}

// By address
void swapByAddress(int *p1, int *p2) {
    int temp = *p1;
    *p1 = *p2;
    *p2 = temp;
}

int main() {
    int x = 1, y = 2;

    cout << "Before swap: x = " << x << ", y = " << y << endl;

    swapByRef(x, y);
    cout << "After swapByRef: x = " << x << ", y = " << y << endl;

    swapByAddress(&x, &y); // pass addresses!
    cout << "After swapByAddress: x = " << x << ", y = " << y << endl;

    return 0;
}
