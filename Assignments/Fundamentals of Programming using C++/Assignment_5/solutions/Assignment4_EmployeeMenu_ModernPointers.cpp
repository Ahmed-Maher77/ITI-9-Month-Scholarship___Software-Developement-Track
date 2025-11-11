// Assignment 4: Employee with Dynamic Allocation and Highlight Menu (allow the user to specify the size of array at runtime) using Modern Pointers.

#include <iostream>
#include <termios.h>
#include <unistd.h>
#include <cstdlib>
#include <string>
#include <memory>
using namespace std;

// =========================
// STRUCTURE DEFINITION
// =========================
struct Employee {
    string name;
    int age;
    float salary;
    bool exists = false;
};

// =========================
// TERMINAL MODE FUNCTIONS
// =========================
termios oldt;

void enableRawMode() {
    termios newt;
    tcgetattr(STDIN_FILENO, &oldt);
    newt = oldt;
    newt.c_lflag &= ~(ICANON | ECHO);
    tcsetattr(STDIN_FILENO, TCSANOW, &newt);
}

void disableRawMode() {
    tcsetattr(STDIN_FILENO, TCSANOW, &oldt);
}

// =========================
// MENU HANDLING
// =========================
void printMenu(const string menu[], int size, int choice) {
    system("clear");
    cout << "Employee Form\n-------------\n\n";
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
            } else break;
        } 
        else if (c == 10) { // Enter
            disableRawMode();
            return choice;
        }
    }

    disableRawMode();
    return choice;
}

// =========================
// EMPLOYEE OPERATIONS
// =========================
void newEmployee(unique_ptr<Employee[]> &employees, int size, int index) {
    disableRawMode();
    if (index < 0 || index >= size) {
        cout << "Invalid index!\n";
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

    cout << "\nEmployee added successfully!\n";
}

void displayEmployee(const unique_ptr<Employee[]> &employees, int size, int index) {
    disableRawMode();
    if (index < 0 || index >= size || !employees[index].exists) {
        cout << "Employee not found!\n";
        return;
    }

    const Employee &e = employees[index];
    cout << "\nEmployee #" << index << '\n'
         << "Name: " << e.name << '\n'
         << "Age: " << e.age << '\n'
         << "Salary: " << e.salary << '\n';
}

void displayAll(const unique_ptr<Employee[]> &employees, int size) {
    disableRawMode();
    bool found = false;
    for (int i = 0; i < size; i++) {
        if (employees[i].exists) {
            found = true;
            cout << "\nEmployee #" << i
                 << "\nName: " << employees[i].name
                 << "\nAge: " << employees[i].age
                 << "\nSalary: " << employees[i].salary << "\n";
        }
    }
    if (!found)
        cout << "No employees found.\n";
}

// =========================
// MAIN PROGRAM
// =========================
int main() {
    int empCount;
    cout << "Enter number of employees: ";
    cin >> empCount;
    cin.ignore();

    // ✅ C++11-compatible dynamic allocation using new
    unique_ptr<Employee[]> employees(new Employee[empCount]);

    const string menu[] = {"New", "Display", "Display All", "Exit"};
    const int menuSize = 4;
    int choice = 0;

    while (true) {
        int selected = getUserChoice(choice, menu, menuSize);
        system("clear");

        if (selected == 0) { // New
            int index;
            cout << "Enter index (0-" << empCount - 1 << "): ";
            cin >> index;
            newEmployee(employees, empCount, index);
        } 
        else if (selected == 1) { // Display
            int index;
            cout << "Enter index (0-" << empCount - 1 << "): ";
            cin >> index;
            displayEmployee(employees, empCount, index);
        } 
        else if (selected == 2) { // Display All
            displayAll(employees, empCount);
        } 
        else { // Exit
            cout << "Bye Bye!\n";
            break;
        }

        cout << "\nPress Enter to return to menu...";
        cin.ignore();
        cin.get();
    }

    disableRawMode();
    return 0;
}
