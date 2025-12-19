#ifndef PERSON_CLASS_H
#define PERSON_CLASS_H

#include <string>
#include <iostream>
using namespace std;

// Person Class (Base)
class Person {
    protected:
        static int nextPersonID;            // shared counter => auto-generated ID
        int personID;                       // unique per instance
        string name;
        int age;
        string phoneNumber;
    public:
        // default constructor
        Person() {
            personID = nextPersonID++;
            name = "Unknown";
            age = 0;
            phoneNumber = "Unknown";
        };
        // parametrized constructor
        Person(string name, int age, string phone) {
            personID = nextPersonID++;
            this->name = name;
            this->age = age;
            this->phoneNumber = phone;
        };
        // getters
        int getPersonID() {
            return personID;
        };
        string getName() {
            return name;
        };
        int getAge() {
            return age;
        };
        string getPhoneNumber() {
            return phoneNumber;
        };
        // setters
        void setName(string name) {
            this->name = name;
        };
        void setAge(int age) {
            this->age = age;
        };
        void setPhoneNumber(string phoneNumber) {
            this->phoneNumber = phoneNumber;
        };
        // print Info (pure virtual function)
        virtual void printInfo() {}
};

// initialize static members
inline int Person::nextPersonID = 1000;

#endif
