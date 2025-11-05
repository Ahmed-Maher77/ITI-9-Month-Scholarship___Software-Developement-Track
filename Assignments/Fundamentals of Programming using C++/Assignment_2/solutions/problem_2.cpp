// Problem 2: make a simple menu calculator
#include <iostream>
using namespace std;
int main() {
    int num1, num2;
    char choice;
    bool exitProgram = false;
    
    // take the 2 numbers from the user
    cout << "Enter the first number: " << endl;
    cin >> num1;
    cout << "Enter the second number: " << endl;
    cin >> num2;
    
    do {
        // Show the menu
        cout << "a -> Add" << endl;
        cout << "b -> Subtract" << endl;
        cout << "c -> Multiply" << endl;
        cout << "d -> Divide" << endl;
        cout << "e -> Exit" << endl;

        // take the user choice
        cout << "Enter your choice: " << endl;
        cin >> choice;
        
        // check the user choice using switch
        switch (choice) {
            case 'a':
                cout << num1 << "+" << num2 << "=" << num1 + num2 << endl;
                break;
            case 'b':
                cout << num1 << "-" << num2 << "=" << num1 - num2 << endl;
                break;
            case 'c':
                cout << num1 << "*" << num2 << "=" << num1 * num2 << endl;
                break;
            case 'd':
                cout << num1 << "/" << num2 << "=" << num1 / num2 << endl;
                break;
            case 'e':
            case 'E':
                exitProgram = true;
                break;
            default:
                cout << "Invalid Choice!";
        }
    } while (!exitProgram);   

    return 0;
}