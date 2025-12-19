#include "Patient.h"
#include <iostream>

using namespace std;

Patient::Patient(string name, int age, string phone, int qNum)
    : Person(name, age, phone) {
    this->queueNumber = qNum;
}
void Patient::setQueueNumber(int q) {
    queueNumber = q;
}
int Patient::getQueueNumber() const {
    return queueNumber;
}
int Patient::getPatientID()
{
    return getPersonID();
}
void Patient::printInfo() {
    cout << "================== Patient Info =================\n";
    cout << "Name       : " << Person::getName() << "\n";
    cout << "Age        : " << Person::getAge() << "\n";
    cout << "Queue No   : " << queueNumber << "\n";
    cout << "=================================================\n";

}
