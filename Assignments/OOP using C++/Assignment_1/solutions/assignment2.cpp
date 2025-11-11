// Assignment 2: Function Overloading — sum()

#include <iostream>
using namespace std;

class Calculator {
public:
    int sum(int a, int b) {
        return a + b;
    }
    float sum(float a, float b) {
        return a + b;
    }
};

int main() {
    Calculator calc;

    cout << "Sum of integers: " << calc.sum(1, 2) << endl;
    cout << "Sum of floats: " << calc.sum(1.5f, 2.0f) << endl;

    return 0;
}
