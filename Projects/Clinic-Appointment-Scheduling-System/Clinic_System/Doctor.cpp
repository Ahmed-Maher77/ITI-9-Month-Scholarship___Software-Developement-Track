#include <iostream>
#include <conio.h>
#include "doctor.h"

Doctor::Doctor() : User(), speciality("") {
	personID = counter;
	counter++;
}

Doctor::Doctor(string name, int age, string phoneNumber, string username, string password, string spec) :
	User(name, age, phoneNumber, username, password, "doctor"), speciality(spec) {
	personID = counter;
	counter++;
}


void Doctor::setSpec(string spec) { this->speciality = spec; }
string Doctor::getSpec() { return speciality; }

void Doctor::viewMyAppointments(vector<Appointment*>& appointments) {
    cout << "\n---------------------------------------------\n";
    cout << "            YOUR APPOINTMENTS DETAILS\n";
    cout << "---------------------------------------------\n";
    int counterApp=0;
    for(auto a: appointments)
    {
        if(a->getDoctorID() == this->getPersonID())
        {
                cout << " Appointment ID : " << (a->getAppointmentID()) << "\n";
                cout << " Doctor ID      : " << (a->getDoctorID()) << "\t"<<" Doctor Name      : "<<this->getName()<<endl;
                cout << " Patient ID     : " << (a->getPatientID()) << "\n";
                cout << "---------------------------------------------\n";
                counterApp++;
        }
    }
    if(counterApp==0){
        cout<<"No Appointments are here"<<endl;
    }
    }

void Doctor::printInfo()  {
cout << "================== Doctor Info ==================\n";
cout << "Name          : " << this->getName() << "\n";
cout << "Age           : " << this->getAge() << "\n";
cout << "Phone Number  : " << this->getPhoneNumber() << "\n";
cout << "Username      : " << this->getUsername() << "\n";
cout << "Specialization: " << speciality << "\n";
cout << "=================================================\n";
}


