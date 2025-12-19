#include <iostream>
#include <conio.h>
#include "receptionist.h"

Receptionist::Receptionist() : User() {}

Receptionist::Receptionist(string name, int age, string phoneNumber, string username, string password) :
	User(name, age, phoneNumber, username, password, "receptionist") {
}

	Patient* Receptionist::addPatient(int pQnum) {

		string name, phone;
		int age;

        cout << "================== Add New Patient ==================\n";

        cout << "Enter patient's name     : ";
        cin.ignore();
        getline(cin, name);

        cout << "Enter patient's age      : ";
        cin >> age;

        cout << "Enter patient's phone    : ";
         cin.ignore();
        getline(cin, phone);

		return new Patient(name, age, phone, pQnum);
	}

	void Receptionist::updatePatient(vector<Patient*>& patients) {
		bool flag = false;
        string name, phone;
		int age , pId;

		cout << "================== Update Patient ==================\n";

        cout << "Enter patient ID to update: ";
        cin >> pId;


for (int i = 0; i < patients.size(); i++)
{
    if (patients[i]->getPersonID() == pId)
    {
        flag = true;
        cin.ignore();

        cout << "Enter patient's new name     : ";
        getline(cin, name);

        cout << "Enter patient's new age      : ";
        cin >> age;

        cin.ignore();
        cout << "Enter patient's new phone    : ";
        getline(cin, phone);

        patients[i]->setName(name);
        patients[i]->setAge(age);
        patients[i]->setPhoneNumber(phone);

        cout << "-----------------------------------------------------\n";
        cout << "        Patient updated successfully!\n";
        break;
    }
}

if (!flag)
{
    cout << "No patient found with this ID.\n";
}


	}

	void Receptionist::deletePatient(vector<Patient*>& patients) {
		bool flag = false;
int pId;

cout << "================== Delete Patient ==================\n";

cout << "Enter patient ID to delete: ";
cin >> pId;

for (int i = 0; i < patients.size(); i++)
{
    if (patients[i]->getPersonID() == pId)
    {
        flag = true;
        patients.erase(patients.begin() + i);

        cout << "-----------------------------------------------------\n";
        cout << " Patient deleted successfully!\n";
        break;
    }
}

if (!flag)
{
    cout << "No patient found with this ID.\n";
}


	}

	Appointment* Receptionist::bookAppointment() {
		int pId, dId;

cout << "================== Add New Appointment ==================\n";

cout << "Enter patient ID     : ";
cin >> pId;

cout << "Enter doctor ID      : ";
cin >> dId;

cout << "----------------------------------------------------------\n";
cout << " Appointment created successfully!\n";

return new Appointment(dId, pId);

	}

	void Receptionist::cancelAppointment(vector<Appointment*>& appointments) {
bool flag = false;
int aId;

cout << "================== Delete Appointment ==================\n";

cout << "Enter appointment ID to delete: ";
cin >> aId;

for (int i = 0; i < appointments.size(); i++)
{
    if (appointments[i]->getAppointmentID() == aId)
    {
        flag = true;
        appointments.erase(appointments.begin() + i);

        cout << "---------------------------------------------------------\n";
        cout << "Appointment canceled successfully!\n";
        break;
    }
}

if (!flag)
{
    cout << "No appointment found with this ID.\n";
}

	}


	void Receptionist::viewAllDoctors(vector<Doctor*> doctors) {

		for (auto d : doctors)
			d->printInfo();
	}
	void Receptionist::viewAllPatients(vector<Patient*> patients) {
		for (auto p : patients)
			p->printInfo();
	}
	void Receptionist::viewAllAppointments(vector<Appointment*> appointments) {
		for (auto a : appointments)
			a->printInfo();
	}

