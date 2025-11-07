// Assignment_1: Swap by reference

#include <iostream>
using namespace std;

void swapByRef(string &a, string &b) {
    string temp = a;
    a = b;
    b = temp;
}
int main() {
    string a, b;
    
    cout << "Enter a: ";
    cin >> a;
    cout << "Enter b: ";
    cin >> b;

    swapByRef(a, b);
    
    cout << "============== After Swap: ==============" << endl;
    cout << "a after swap: " << a << endl;
    cout << "b after swap: " << b << endl;
    
    return 0;
}