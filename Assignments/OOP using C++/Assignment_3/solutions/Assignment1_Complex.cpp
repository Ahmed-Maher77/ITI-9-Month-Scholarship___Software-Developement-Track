// Assignment 1: Complete Complex Class with Full Operator Overloads

#include <iostream>
using namespace std;

class Complex
{
private:
    float real;
    float img;
    static int count; // static counter shared by all objects

public:
    // ===== Constructors =====
    Complex() = default; // use compiler-generated default constructor

    // Uniform initialization constructors
    Complex(float n) : real(n), img(n)
    {
        count++;
        cout << "Overloaded constructor (1 param) called. Object #" << count << endl;
    }

    Complex(float r, float i) : real(r), img(i)
    {
        count++;
        cout << "Overloaded constructor (2 params) called. Object #" << count << endl;
    }

    // ===== Arithmetic Operator Overloads =====
    Complex operator+(const Complex &c) const           // res = c1(this) + c2
    {
        return Complex(real + c.real, img + c.img);
    }

    Complex operator-(const Complex &c) const 
    {
        return Complex(real - c.real, img - c.img);
    }

    Complex operator*(const Complex &c) const        // res = c1(this) * c2  => complex number multiplication => (a+bi)∗(c+di)=(ac−bd)+(ad+bc)i
    {
        return Complex(real * c.real - img * c.img, real * c.img + img * c.real);
    }

    Complex operator/(const Complex &c) const
    {
        float denom = c.real * c.real + c.img * c.img;
        return Complex((real * c.real + img * c.img) / denom,
                       (img * c.real - real * c.img) / denom);
    }

    // ===== Relational Operators =====
    bool operator<(const Complex &c) const
    {
        return (real * real + img * img) < (c.real * c.real + c.img * c.img);
    }

    bool operator>(const Complex &c) const
    {
        return (real * real + img * img) > (c.real * c.real + c.img * c.img);
    }

    // ===== Increment / Decrement Operators =====
    // Pre-increment
    Complex &operator++()
    {
        ++real;
        ++img;
        return *this;
    }

    // Post-increment
    Complex operator++(int)
    {
        Complex temp = *this;
        ++(*this);
        return temp;
    }

    // Pre-decrement
    Complex &operator--()
    {
        --real;
        --img;
        return *this;
    }

    // Post-decrement
    Complex operator--(int)
    {
        Complex temp = *this;
        --(*this);
        return temp;
    }

    // ===== Type Casting =====
    explicit operator float() const       // (float)c1, without expicit: implicit casting float f = c1
    {
        return real; // cast Complex to float (return real part)
    }

    // ===== I/O Operator Overloading =====
    friend ostream &operator<<(ostream &out, const Complex &c)
    {
        if (c.real == 0 && c.img == 0)
            out << "0";
        else if (c.real == 0)
            out << c.img << "i";
        else if (c.img == 0)
            out << c.real;
        else if (c.img > 0)
            out << c.real << "+" << c.img << "i";
        else
            out << c.real << c.img << "i";
        return out;
    }

    friend istream &operator>>(istream &in, Complex &c)
    {
        cout << "Enter real part: ";
        in >> c.real;
        cout << "Enter imaginary part: ";
        in >> c.img;
        return in;
    }

    // ===== Static Method =====
    static void showCounter()
    {
        cout << "Active Complex objects: " << count << endl;
    }

    // ===== Destructor =====
    ~Complex()
    {
        cout << "Destructor called for (" << real << "," << img << ")" << endl;
        count--;
    }
};

// Initialize static member
int Complex::count = 0;

// ========================== MAIN ==========================
int main()
{
    cout << "\n--- Uniform Initialization ---\n";
    Complex c1{3, 4}; // uniform initialization
    Complex c2{5, -2};
    Complex c3{1};

    cout << "\n--- Operator Overloading ---\n";
    cout << "c1 = " << c1 << endl;
    cout << "c2 = " << c2 << endl;
    cout << "c3 = " << c3 << endl;

    cout << "c1 + c2 = " << (c1 + c2) << endl;
    cout << "c1 - c2 = " << (c1 - c2) << endl;
    cout << "c1 * c2 = " << (c1 * c2) << endl;
    cout << "c1 / c2 = " << (c1 / c2) << endl;

    cout << "\n--- Relational ---\n";
    cout << (c1 > c2 ? "c1 > c2" : "c1 <= c2") << endl;

    cout << "\n--- Increment/Decrement ---\n";
    cout << "++c1 = " << ++c1 << endl;
    cout << "c2++ = " << c2++ << " → now c2 = " << c2 << endl;

    cout << "\n--- Type Casting ---\n";
    float r = static_cast<float>(c3);
    cout << fixed << setprecision(1);
    cout << "Real part of c3 (as float): " << r << endl;

    cout << "\n--- Input/Output Overload ---\n";
    Complex c4;
    cin >> c4;
    cout << "You entered: " << c4 << endl;

    cout << "\n--- Static Counter ---\n";
    Complex::showCounter();

    return 0;
}
