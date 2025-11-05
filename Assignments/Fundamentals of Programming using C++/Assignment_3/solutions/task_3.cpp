// Problem 3: Employee Form
#include <iostream>
using namespace std;

struct Employee
{
    string name;
    int age;
    float salary;
};

int main() {
    const int employees_count = 3;
    array<Employee, employees_count> employees;

    // cout << "Enter the number of employees: ";
    // cin >> employees_count;

    // get each employee data
    for(int i = 0; i < employees_count; i++) {
        Employee e;
        cout << "\nEmployee #" << i + 1 << endl;

        cout << "Enter employee name: ";
        cin.get();
        getline(cin, e.name);  // to allow spaces

        cout << "Enter employee age: ";
        cin >> e.age;

        cout << "Enter employee salary: ";
        cin >> e.salary;

        employees.at(i) = e;
    }
    
    // Show the all emplyees
    for (int i = 0; i < employees_count; i++) {
        cout << "\nEmployee #" << i + 1 << endl;
        cout << "Name: " << employees[i].name << endl;
        cout << "Age: " << employees[i].age << endl;
        cout << "Salary: " << employees[i].salary << endl;
    }
    
    return 0;
}