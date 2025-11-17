// Assignment_2: Generic Sum Function


#include <iostream>
#include <complex>      // for complex numbers
using namespace std;


//  Generic Sum Function
template <typename T>
T sumValues(T a, T b) {
    return a + b;
}

int main() {
    // ---- int ----
    int x = 10, y = 20;
    cout << "Sum (int): " << sumValues(x, y) << endl;

    // ---- float ----
    float f1 = 1.5f, f2 = 2.3f;
    cout << "Sum (float): " << sumValues(f1, f2) << endl;

    // ---- double ----
    double d1 = 3.14, d2 = 2.71;
    cout << "Sum (double): " << sumValues(d1, d2) << endl;

    // ---- complex numbers ----
    complex<double> c1(2.0, 3.0);
    complex<double> c2(1.5, 2.5);
    cout << "Sum (complex): " << sumValues(c1, c2) << endl;

    return 0;
}
