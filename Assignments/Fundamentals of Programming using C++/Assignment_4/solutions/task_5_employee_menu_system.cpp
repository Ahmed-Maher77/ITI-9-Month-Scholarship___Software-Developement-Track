// ================================================================
// 🧾 Assignment_5: Employee Management System with Highlight Menu
// ================================================================
//
// Description:
// This program combines the Highlight Menu System with the Employee Form
// to allow users to:
//
//  - Add new employees
//  - Display a specific employee by index
//  - Display all existing employees
//
// The system uses terminal navigation (Up/Down arrows) to select menu options
// and provides a clear, structured interface for managing employee data.
//
// ================================================================



#include <iostream>
#include <termios.h>
#include <unistd.h>
#include <cstdlib>
#include <string>
#include <array>
#include <cctype>
using namespace std;

// ================================================================
// STRUCTURE DEFINITION
// ================================================================
struct Employee {
    string name;
    int age;
    float salary;
    bool exists = false;
};

// ================================================================
// CONSTANTS
// ================================================================
#define MAX_EMP 5
#define CLEAR "\033[2J\033[H" // ANSI clear screen

// ================================================================
// TERMINAL MODE FUNCTIONS
// ================================================================
termios oldt;

void enableRawMode() {
    termios newt;
    tcgetattr(STDIN_FILENO, &oldt);
    newt = oldt;
    newt.c_lflag &= ~(ICANON | ECHO); // Disable canonical & echo modes
    tcsetattr(STDIN_FILENO, TCSANOW, &newt);
}

void disableRawMode() {
    tcsetattr(STDIN_FILENO, TCSANOW, &oldt);
}

// ================================================================
// MENU DISPLAY AND NAVIGATION
// ================================================================
void printMenu(const string menu[], int size, int choice) {
    system("clear");
    cout << "========================\n";
    cout << "     Employee Form      \n";
    cout << "========================\n\n";

    for (int i = 0; i < size; i++) {
        cout << (i == choice ? ">> " : "   ") << menu[i] << '\n';
    }
}

int getUserChoice(int &choice, const string menu[], int menuSize) {
    enableRawMode();
    char c;

    while (true) {
        printMenu(menu, menuSize, choice);
        c = getchar();

        if (c == 27) { // ESC or Arrow keys
            c = getchar();
            if (c == 91) {
                c = getchar();
                if (c == 'A') choice = (choice - 1 + menuSize) % menuSize; // Up
                else if (c == 'B') choice = (choice + 1) % menuSize;       // Down
            }
        } 
        else if (c == 10) { // Enter key
            disableRawMode();
            return choice;
        }
    }
}

// ================================================================
// EMPLOYEE OPERATIONS
// ================================================================
void newEmployee(array<Employee, MAX_EMP> &employees, int index) {
    disableRawMode(); // Ensure visible input
    if (index < 0 || index >= MAX_EMP) {
        cout << "❌ Invalid index!\n";
        return;
    }

    Employee e;
    cout << "Enter name: ";
    cin >> e.name;
    cout << "Enter age: ";
    cin >> e.age;
    cout << "Enter salary: ";
    cin >> e.salary;
    e.exists = true;
    employees[index] = e;

    cout << "\n✅ Employee added successfully!\n";
}

void displayEmployee(const array<Employee, MAX_EMP> &employees, int index) {
    disableRawMode();
    if (index < 0 || index >= MAX_EMP || !employees[index].exists) {
        cout << "❌ Employee not found!\n";
        return;
    }

    const Employee &e = employees[index];
    cout << "\n📋 Employee #" << index << "\n"
         << "Name:   " << e.name << "\n"
         << "Age:    " << e.age << "\n"
         << "Salary: " << e.salary << "\n";
}

void displayAll(const array<Employee, MAX_EMP> &employees) {
    disableRawMode();
    bool found = false;

    cout << "\n========================\n";
    cout << "   All Employees List   \n";
    cout << "========================\n";

    for (int i = 0; i < MAX_EMP; i++) {
        if (employees[i].exists) {
            found = true;
            cout << "\nEmployee #" << i
                 << "\nName:   " << employees[i].name
                 << "\nAge:    " << employees[i].age
                 << "\nSalary: " << employees[i].salary << "\n";
        }
    }

    if (!found)
        cout << "⚠️  No employees found.\n";
}

// ================================================================
// MAIN PROGRAM
// ================================================================
int main() {
    array<Employee, MAX_EMP> employees{};
    const string menu[] = {"New", "Display", "Display All", "Exit"};
    const int menuSize = 4;
    int choice = 0;

    while (true) {
        int selected = getUserChoice(choice, menu, menuSize);
        system("clear");

        if (selected == 0) { // New
            int index;
            cout << "Enter index (0-" << MAX_EMP - 1 << "): ";
            cin >> index;
            newEmployee(employees, index);
        } 
        else if (selected == 1) { // Display
            int index;
            cout << "Enter index (0-" << MAX_EMP - 1 << "): ";
            cin >> index;
            displayEmployee(employees, index);
        } 
        else if (selected == 2) { // Display All
            displayAll(employees);
        } 
        else { // Exit
            cout << "\n👋 Bye Bye!\n";
            break;
        }

        cout << "\nPress Enter to return to menu...";
        cin.ignore();
        cin.get();
    }

    disableRawMode();
    return 0;
}
