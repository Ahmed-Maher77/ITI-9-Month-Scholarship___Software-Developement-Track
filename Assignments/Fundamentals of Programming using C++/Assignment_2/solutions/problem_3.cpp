/*
------------------------------------------------------------
🎯 Problem: Generate a Magic Box (Siamese Method)
------------------------------------------------------------

🧩 Example (3x3):
    8   1   6
    3   5   7
    4   9   2

📘 Algorithm Steps:
1️⃣ Start from the middle of the first row → position [0][n/2].
2️⃣ Place the number 1 there.
3️⃣ For each next number → move up one row and right one column.
4️⃣ If above top → wrap to the last row.
5️⃣ If beyond right edge → wrap to the first column.
6️⃣ If the cell is already filled OR the number is a multiple of n → move down one row instead.
7️⃣ Repeat until all n × n numbers are placed.

🧮 Notes:
- Works only for odd n (3, 5, 7, ...).
- Implemented without arrays — uses coordinate simulation.

------------------------------------------------------------
*/


#include <iostream>
#include <iomanip>  // for setw() formatting => spaces
#include <cstdlib>   // for rand()
#include <ctime>     // for seeding random colors
using namespace std;

int main() {
    int n;
    cout << "Enter the size of the magic box (odd number): ";
    cin >> n;

    // Validate input (only positive odd numbers are allowed)
    if (n <= 0 || n % 2 == 0) {
        cout << "Magic box works only for positive odd numbers (3, 5, 7, ...)." << endl;
        return 0;
    }

    cout << "\n✨ Magic Box of size " << n << "x" << n << " ✨\n\n";

    srand(time(0)); // seed for random colors

    // Outer loops: print the magic box row by row
    for (int r = 0; r < n; ++r) {
        for (int c = 0; c < n; ++c) {

            int simRow = 0;           // start position: first row
            int simCol = n / 2;       // middle column
            int foundNum = 0;         // the number that will appear at (r, c)

            // Simulate placing numbers 1 → n*n
            for (int num = 1; num <= n * n; ++num) {

                // If current simulated cell matches (r, c), store the number
                if (simRow == r && simCol == c) {
                    foundNum = num;
                    break;
                }

                // Move one step up (row - 1) and one step right (col + 1)
                int nextRow = simRow - 1;
                int nextCol = simCol + 1;

                // Wrap around if we go outside the grid
                if (nextRow < 0) nextRow = n - 1;  // wrap to bottom
                if (nextCol == n) nextCol = 0;     // wrap to first column

                // If the number is a multiple of n → move down instead
                if (num % n == 0) {
                    simRow = (simRow + 1) % n;    // to keep the row within the grid
                    // column stays the same
                } else {
                    simRow = nextRow;
                    simCol = nextCol;
                }
            }

            // Generate a random color (31–36 → red, green, yellow, blue, magenta, cyan)
            int colorCode = 31 + (rand() % 6);

            // Print the number in color using ANSI escape codes
            cout << "\033[" << colorCode << "m" << setw(4) << foundNum << "\033[0m";
        }
        cout << '\n';  // move to the next line after each row
    }

    cout << "\nMagic box generation complete!\n";
    return 0;
}