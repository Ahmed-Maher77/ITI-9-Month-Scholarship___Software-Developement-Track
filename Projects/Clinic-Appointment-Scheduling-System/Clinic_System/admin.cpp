#include <iostream>
#include <conio.h>
#include "admin.h"
using namespace std;

Admin::Admin(
             const string& name,
             int age,
             const string& phone,
             const string& username,
             const string& password)
    : User( name, age, phone, username, password,"admin") {}




Doctor* Admin::createDoctor()
{
    int age;
    string name, phone, specialty, userName, password;

    cout << "=== Add New Doctor ===\n";
    cout << "Enter Name: ";
    cin.ignore();
    getline(cin, name);

    cout << "Enter Age: ";
    cin >> age;

    cout << "Enter Phone: ";
    cin >> phone;
    cout << "Enter UserName: ";
    cin >> userName;
    cout << "Enter Password: ";
    cin >> password;

    cin.ignore();
    cout << "Enter Specialty: ";
    getline(cin, specialty);

    return new Doctor(name, age, phone, userName, password, specialty);

    }


void Admin::requestDoctorDeletion(vector<Doctor*>& doctors) {
        int id ,done=-1;
        cout << "=== Delete Doctor ===\n";
        cout << "Enter Doctor ID to delete: ";
        cin >> id;
        for (int i = 0; i < doctors.size(); i++)
        {
            if (doctors[i]->getPersonID() == id)
            {
                done=i;
                doctors.erase(doctors.begin() + i);
                break;
            }
        }
        if(done==-1)
            cout<<"Invalid ID\n";
        else
            cout<<"doctor deleted successfully\n";
    }


Receptionist* Admin::createReceptionist() {
        int  age;
        string name, phone, username, password;

        cout << "=== Add New Receptionist ===\n";
        cout << "Enter Name: ";
        cin.ignore();
        getline(cin, name);

        cout << "Enter Age: ";
        cin >> age;

        cout << "Enter Phone: ";
        cin >> phone;
        cout << "Enter UserName: ";
        cin >> username;
        cout << "Enter Password: ";
        cin >> password;


        return new Receptionist( name, age, phone, username,password);
    }



void Admin::requestReceptionistDeletion(vector<Receptionist*>& receptionists) {
        int id,done=-1;
         cout << "======= Delete Receptionist =======\n";
        cout  << "Enter Receptionist ID to delete: ";
        cin >> id;
        for (int i = 0; i < receptionists.size(); i++)
        {
            if (receptionists[i]->getPersonID() == id)
            {
                done=i;
                receptionists.erase(receptionists.begin() + i);
                break;
            }
        }
        if(done==-1)
            cout<<"Invalid ID\n";
        else
            cout<<"receptionist deleted successfully\n";
    }







