// Problem 3: find the ASCII Code of a Char
#include <iostream>
using namespace std;

int main() {
    char givenChar;

    cout << "Enter a character: " << endl;
    cin >> givenChar;

    cout << "The ASCII value of " << givenChar << " is: " << int(givenChar) << endl;
    
    return 0;
}