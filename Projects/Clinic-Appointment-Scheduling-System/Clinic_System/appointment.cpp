#include "Appointment.h"
#include <iostream>
using namespace std;

Appointment::Appointment(int dID, int pID) {
    ++counter;
    this->appointmentID = counter;
    this->doctorID = dID;
    this->patientID = pID;
}

int Appointment::getAppointmentID() const {
    return appointmentID;
}

int Appointment::getDoctorID() const {
    return doctorID;
}

int Appointment::getPatientID() const {
    return patientID;
}

void Appointment::setDoctorID(int dID) {
    doctorID = dID;
}

void Appointment::setPatientID(int pID) {
    patientID = pID;
}
void Appointment::printInfo() const {
cout << "\n---------------------------------------------\n";
cout << "            APPOINTMENT DETAILS\n";
cout << "---------------------------------------------\n";
cout << " Appointment ID : " << appointmentID << "\n";
cout << " Doctor ID      : " << doctorID << "\n";
cout << " Patient ID     : " << patientID << "\n";
cout << "---------------------------------------------\n";

}
