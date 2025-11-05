/*
------------------------------------------------------------
🎯 Problem 5: Draw a Square Matrix with Diagonal Stars
------------------------------------------------------------

🧩 Example (3x3):
 *  -  -
 -  *  -
 -  -  *

📘 Steps:
1️⃣ Use two nested loops (rows and columns).
2️⃣ Print '*' when the row index equals the column index (main diagonal).
3️⃣ Print '-' otherwise.
4️⃣ Break the line after each row.

------------------------------------------------------------
*/



#include <iostream>
using namespace std;

int main() {
    int matrix_size;

    cout << "Enter matrix size: ";
    cin >> matrix_size;

    cout << "\nMatrix of size " << matrix_size << "x" << matrix_size << ":\n\n";

    for (int i = 0; i < matrix_size; i++) {
        for (int j = 0; j < matrix_size; j++) {
            if (i == j)
                cout << " * ";
            else
                cout << " - ";
        }
        cout << endl;
    }

    return 0;
}
