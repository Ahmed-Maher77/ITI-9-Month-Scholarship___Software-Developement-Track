// Assignment_3: Inheritance (Base and Derived Classes)

#include <iostream>
using namespace std;

class Base
{
private:
    int prop; // Private: NOT inherited

protected:
    int a, b; // Protected: inherited and accessible inside Derived

public:
    Base() : a(0), b(0), prop(0) {}

    Base(int n) : a(n), b(n), prop(n) {}

    Base(int n1, int n2) : a(n1), b(n2), prop(0) {}

    // setters
    void setA(int n) { a = n; }
    void setB(int n) { b = n; }

    // getters
    int getA() const { return a; }
    int getB() const { return b; }

    int calcSum() const
    {
        return a + b;
    }
};

// ===================== DERIVED CLASS =====================
class Derived : public Base
{
private:
    int c;

public:
    Derived() : Base(), c(0) {}

    Derived(int n) : Base(n), c(n) {}

    Derived(int n1, int n2, int n3)
        : Base(n1, n2), c(n3) {}

    void setC(int n) { c = n; }

    // Option 1: Access protected members directly
    int calcSum1() const
    {
        return a + b + c;
    }

    // Option 2: Use getters from Base
    int calcSum2() const
    {
        return getA() + getB() + c;
    }

    // Option 3: Use Base method + extra
    int calcSum3() const
    {
        return Base::calcSum() + c;
    }
};

int main()
{
    cout << "===== Base Object =====\n";
    Base b(10, 20);
    cout << "Base Sum: " << b.calcSum() << endl;

    cout << "\n===== Derived Object =====\n";
    Derived d(5, 15, 25);

    cout << "calcSum1 (direct protected access): " << d.calcSum1() << endl;
    cout << "calcSum2 (using getters): " << d.calcSum2() << endl;
    cout << "calcSum3 (Base::calcSum() + c): " << d.calcSum3() << endl;

    return 0;
}
