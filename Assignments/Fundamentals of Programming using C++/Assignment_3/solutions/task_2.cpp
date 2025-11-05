// Problem 2: Student Grades 2D Array

#include <iostream>
#include <array>
using namespace std;

struct Student {
    string name;
    int age;
    array<float, 2> subjects_grades;  // subjects_count = 2
};

int main() {
    const int students_count = 3;
    const int subjects_count = 2;

    // [2 students (rows)] [3 subjects (cols)]
    array<Student, students_count> students;

    // Input student info and grades
    for (int i = 0; i < students_count; i++) {
        // get student info then store it
        Student s;
        cout << "\nStudent #" << i + 1 << endl;
        cout << "Enter student name: ";
        cin.get();   // to clear the buffer
        getline(cin, s.name);
        cout << "Enter student age: ";
        cin >> s.age;
        students.at(i) = s;                          // student_struct[i][0]    subject1_grade[i][1]    subject2_grade[i][2]

        // get student grades
        for (int j = 0; j < subjects_count; j++) {
            cout << "Enter grade for subject " << j+1 << ": ";
            cin >> students.at(i).subjects_grades.at(j);
        }
    }

    cout << "\n================= Results =================\n";

    // Display total grades per student
    for (int i = 0; i < students_count; i++) {
        float sum = 0;
        for (int j = 0; j < subjects_count; j++) {
            sum += students.at(i).subjects_grades.at(j);
        }
        cout << "Sum of grades for " << students.at(i).name << " = " << sum << endl;
    }


    // Display Sum and Avg grades per subject
    for(int i = 0; i < subjects_count; i++) {
        float sum = 0;
        float avg = 0;
        for (int j = 0; j < students_count; j++) {
            sum += students.at(j).subjects_grades.at(i);
        }
        avg = sum / students_count;
        cout << "Sum of grades for subject " << i + 1 << " = " << sum << endl;
        cout << "Avg of grades for subject " << i + 1 << " = " << avg << endl;
    }

    return 0;
}