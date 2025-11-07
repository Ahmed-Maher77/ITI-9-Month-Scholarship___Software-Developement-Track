// Problem 3: Employee Form
#include <iostream>
#include <string>
#include <array>
#include <cctype> // for isprint()

using namespace std;

// Represents a single employee
struct Employee {
    string name;
    int age;
    float salary;
};

// ANSI escape sequences for terminal control
#define CLEAR_SCREEN "\033[2J\033[H"
#define MOVE_CURSOR(row, col) "\033[" << row << ";" << col << "H"

int main() {
    const int employees_count = 3;
    array<Employee, employees_count> employees;

    // Input form for each employee
    for (int i = 0; i < employees_count; i++) {
        Employee e;
        string inputs[3] = {"", "", ""};
        int field = 0; // 0: name, 1: age, 2: salary

        // Render form layout
        cout << CLEAR_SCREEN;
        cout << "Employee Form #" << i + 1 << "\n\n";
        cout << "Name   : \n";
        cout << "Age    : \n";
        cout << "Salary : \n";

        const int start_col = 11; // cursor start position after ": "

        // Input loop for all fields
        while (field < 3) {
            cout << MOVE_CURSOR(2 + field + 1, start_col) << inputs[field] << flush;
            char ch = getchar();

            if (ch == '\n') { // Enter → next field
                if (!inputs[field].empty()) field++;
            }
            else if (ch == 127 || ch == 8) { // Backspace
                if (!inputs[field].empty()) {
                    inputs[field].pop_back();
                    cout << MOVE_CURSOR(2 + field + 1, start_col) << "\033[K" << inputs[field] << flush;
                }
            }
            else if (isprint(static_cast<unsigned char>(ch))) { // Printable char
                inputs[field] += ch;
                cout << MOVE_CURSOR(2 + field + 1, start_col) << inputs[field] << flush;
            }
        }

        // Store data
        e.name = inputs[0];
        e.age = stoi(inputs[1]);
        e.salary = stof(inputs[2]);
        employees[i] = e;
    }

    // Display all employees
    cout << CLEAR_SCREEN;
    cout << "All Employees:\n";

    for (int i = 0; i < employees_count; i++) {
        cout << "\nEmployee #" << i + 1 << endl;
        cout << "Name: " << employees[i].name << endl;
        cout << "Age: " << employees[i].age << endl;
        cout << "Salary: " << employees[i].salary << endl;
    }

    return 0;
}
