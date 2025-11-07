// Assignment_3: Fibonacci Sequence => each number is the sum of the two preceding numbers

#include <iostream>
using namespace std;

void printFibonacci(int n);

int main() {
    int terms;

    cout << "Enter the number of terms in Fibonacci sequence: ";
    cin >> terms;

    if (terms <= 0) {
        cout << "Please enter a positive number." << endl;
        return 0;
    }

    cout << "Fibonacci Sequence => " << terms << " terms: ";
    printFibonacci(terms);

    cout << endl;
    return 0;
}

// Function to print Fibonacci sequence
void printFibonacci(int n) {        // 0 1 1 2 3 5 8 
    int a = 0, b = 1, next;
    
    cout << a << " " << b << " ";  // 0 1 

    for (int i = 1; i <= n; i++) {
        next = a + b;
        a = b;     // go to next place
        b = next;  // go to next place
        cout << next << " ";
    }
}
