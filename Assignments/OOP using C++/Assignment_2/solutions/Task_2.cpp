// Assignment 2: Complex Class

#include <iostream>
using namespace std;

class Complex
{
private:
    float real;
    float img;
    static int count; // static counter

public:
    // Default constructor
    Complex()                    // ==> Complex() = default;
    {
        real = 0;
        img = 0;
        count++;
        cout << "Default constructor called. Object #" << count << endl;
    }

    // Overloaded constructor 1: Complex(float)
    Complex(float n)
    {
        real = n;
        img = n;
        count++;
        cout << "Overloaded constructor (1 param) called. Object #" << count << endl;
    }

    // Overloaded constructor 2: Complex(float, float)
    Complex(float r, float i)
    {
        real = r;
        img = i;
        count++;
        cout << "Overloaded constructor (2 params) called. Object #" << count << endl;
    }

    // Destructor
    ~Complex()
    {
        cout << "Destructor called for (" << real << "," << img << ")" << endl;
        count--;
    }

    // to print complex number
    void printComplex()
    {
        if (real == 0 && img == 0)
            cout << "0" << endl;
        else if (real == 0)
            cout << img << "i" << endl;
        else if (img == 0)
            cout << real << endl;
        else if (img > 0)
            cout << real << "+" << img << "i" << endl;
        else                                    // img < 0
            cout << real << img << "i" << endl; // img already has '-'
    }

    // Static method to show number of active objects
    static void showCounter()
    {
        cout << "Active Complex objects: " << count << endl;
    }
};

// Initialize static member
int Complex::count = 0;

// ========================== MAIN ==========================
int main()
{
    Complex c1;        // Default
    Complex c2(5);     // One parameter
    Complex c3(3, -4); // Two parameters

    cout << "\nComplex Numbers:\n";
    c1.printComplex(); // 0
    c2.printComplex(); // 5+5i
    c3.printComplex(); // 3-4i

    Complex::showCounter(); // Show active objects

    {
        Complex c4(0, 9);
        Complex c5(-9, 0);
        Complex c6(-3, -3);
        cout << "\nMore examples:\n";
        c4.printComplex(); // 9i
        c5.printComplex(); // -9
        c6.printComplex(); // -3-3i
        Complex::showCounter();
    } // c4, c5, c6 destroyed here automatically

    cout << "\nAfter inner scope:\n";
    Complex::showCounter();

    return 0;
}
