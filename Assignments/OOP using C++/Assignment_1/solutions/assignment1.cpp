// Assignment 1: Convert the struct into a Class


#include <iostream>
using namespace std;

struct Student_Struct {
    string name;
    int age;
    string major;
    char gender;
};

class Student_Class {
    public:
        string name;
        int age;
        string major;
        char gender;
};

int main() {
    // Create an object using Struct
    Student_Struct student1;
    student1.name = "Ahmed Maher";
    student1.age = 22;
    student1.major = "Computer Science";
    student1.gender = 'M';

    // Create an object using Class
    Student_Class student2;
    student2.name = "Sara Doe";
    student2.age = 30;
    student2.major = "Human Resources";
    student2.gender = 'F';

    
    return 0;
}