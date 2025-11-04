// Problem 2: take 2 numbers => find sum, diff, avg
#include <iostream>
using namespace std;

int main() {
    float num1, num2;

    // get 1st number
    cout << "Enter the first number: " << endl;
    cin >> num1;
    
    // get 2nd number
    cout << "Enter the second number: " << endl;
    cin >> num2;

    // sum + differnce + average
    float sum = num1 + num2;
    float difference = num1 - num2;
    float average = (num1 + num2) / 2;
    
    cout << "The sum of the two numbers is: " << sum << endl;
    cout << "The difference between the two numbers is: " << difference << endl;
    cout << "The average of the two numbers is: " << average << endl;
    
    return 0;
}