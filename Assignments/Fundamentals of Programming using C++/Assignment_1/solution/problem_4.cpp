// Problem 4: take decimal number => find its hexa, octal representation
#include <iostream>
using namespace std;

int main() {
    float decimalNum;

    cout << "Enter a decimal number: ";
    cin >> decimalNum;
    
    // convert into integer
    int number = static_cast<int>(decimalNum);

    cout << "The hexadecimal representation of the integer part is: " << hex << uppercase << number << endl;
    cout << "The octal representation of the integer part is: " << oct << number << endl;

    return 0;
}