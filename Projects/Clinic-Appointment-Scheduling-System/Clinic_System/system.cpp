#include <windows.h>
#include "system.h"
#include <iostream>

using namespace std;

ClinicSystem::ClinicSystem()
{
    cout<<"here clinic cstr\n";

    Receptionist* recep = new Receptionist("mo",25,"011", "mo", "1234");
    receptionists.push_back(recep);

    Doctor* doctor = new Doctor("ahmed",30,"011","ahmed","1234","doctor");
    doctors.push_back(doctor);


    Admin* admin = new Admin("admin",30,"011","admin","1234");
    admins.push_back(admin);
}

void ClinicSystem::start()
{
    cout << "\033[2;50H" << "==============================\n";
    cout << "\033[3;50H" << "   Clinic Appointment System\n";
    cout << "\033[4;50H" << "==============================\n";

    loginMenu();
}

void ClinicSystem::loginMenu()
{
    while (true)
{
    cout << "\033[5;50H" << "==============================";
    cout << "\033[6;50H" << "        LOGIN PORTAL          ";
    cout << "\033[7;50H" << "==============================";

    string username, password;

    cout << "\033[8;45H" << "Enter Username: ";
    cin >> username;

    cout << "\033[9;45H" << "Enter Password: ";
    cin >> password;

    User* user = checkAuth(username, password);

    system("cls");

    if (user) {
        cout << "\033[3;50H" << "\033[32mLogin Successful!\033[0m\n";

        if (Admin* a = dynamic_cast<Admin*>(user)) {
            cout << "\033[5;50H" << "Welcome, Admin!";
            Sleep(700);
            adminMenu(a);
        }
        else if (Receptionist* r = dynamic_cast<Receptionist*>(user)) {
            cout << "\033[5;50H" << "Welcome, Receptionist!";
            Sleep(700);
            receptionistMenu(r);
        }
        else if (Doctor* d = dynamic_cast<Doctor*>(user)) {
            cout << "\033[5;50H" << "Welcome, Doctor!";
            Sleep(700);
            doctorMenu(d);
        }
    }
    else
    {
        cout << "\033[3;50H" << "\033[31mInvalid Username or Password\033[0m";
        cout << "\033[5;50H" << "Press any key to try again...";
        _getch();
    }
}

}

void ClinicSystem::adminMenu(Admin* admin)
{

    vector<string>opt = {
        "Add Doctor",
        "Delete Doctor",
        "Add Receptionist",
        "Delete Receptionist",
        "logout"
    };

    showMenu(opt,"admin",admin);
}

void ClinicSystem::receptionistMenu(Receptionist* rec)
{
    vector<string>opt = {
        "add patient",
        "update patient",
        "delete patient",
        "add appointments",
        "cancel appointment",
        "view all doctors",
        "view all patients",
        "view all appointments",
        "logout"
    };
    showMenu(opt,"receptionist",rec);
}

void ClinicSystem::doctorMenu(Doctor* doc)
{
    vector<string>opt = {
        "view my appointments",
        "logout"
    };
    showMenu(opt,"doctor",doc);

}


User* ClinicSystem::checkAuth(const string& username , const string& password) {
    for (auto u : admins)
    {
        if (u->login(username,password))
            return u;
    }    for (auto u : doctors)
    {
        if (u->login(username,password))
            return u;
    }
        for (auto u : receptionists)
    {
        if (u->login(username,password))
            return u;
    }
    return nullptr;
}



void ClinicSystem::handleAdminSelection(Admin* admin ,int index) {
        switch (index) {
        case 0: {
            Doctor* d = admin->createDoctor();
            doctors.push_back(d);
//            users.push_back(d);
//            printDoctor(d);
            cout<<"doctor created successfully :"<<d->getPersonID() <<"\n";

            break;
        }
        case 1: {
            admin->requestDoctorDeletion(doctors);
            break;
        }
        case 2: {
            Receptionist* r = admin->createReceptionist();
            receptionists.push_back(r);
            cout<<"receptionist created successfully :"<<r->getPersonID() <<"\n";
//            printReceptionist(r);
            break;
        }
        case 3: {
            admin->requestReceptionistDeletion(receptionists);
            break;
        }
        case 4:
            cout << "Exiting menu...\n";
            break;
        }
    }


void ClinicSystem::handleReceptionistSelection(Receptionist* rec ,int index) {
        switch (index) {
        case 0: {
            Patient *p = rec->addPatient(patients.size()+1);
            patients.push_back(p);
            cout<<"patient created successfully :"<<p->getPersonID() <<"\n";

            break;
        }
        case 1: {
            rec->updatePatient(patients);
            break;
        }
        case 2: {
            rec->deletePatient(patients);
            break;
        }
        case 3:{
            Appointment* appo = rec->bookAppointment();
            appointments.push_back(appo);
            cout<<"appointment added successfully\n";
            break;
        }
        case 4:{
            rec->cancelAppointment(appointments);
            break;
        }
        case 5: {
           rec->viewAllDoctors(doctors);
            break;
        }
        case 6: {
           rec->viewAllPatients(patients);
            break;
        }
        case 7: {
           rec->viewAllAppointments(appointments);
            break;
        }

        case 8:
            cout << "Exiting menu...\n";
            break;
        }
    }

void ClinicSystem::handleDoctorSelection(Doctor* doc ,int index) {
        switch (index) {
        case 0: {
            doc->viewMyAppointments(appointments);
            break;
        }
        case 1:
            cout << "Exiting menu...\n";
            break;
        }
    }

void ClinicSystem::showMenu(vector<string>&opt ,const string& role,User* user)
{


    int selected = 0;
    int totalOptions = opt.size();

    while (true)
{
    system("cls");

    cout << "\033[2;45H" << "=====================================";
    cout << "\033[3;45H" << "              " << role << " MENU             ";
    cout << "\033[4;45H" << "=====================================";

    for (int i = 0; i < totalOptions; i++)
    {
        int y = 6 + i;
        cout << "\033[" << y << ";50H";

        if (i == selected)
        {
            cout << "\033[44;97m  > " << opt[i] << "  \033[0m";
        }
        else
        {
            cout << "    " << opt[i];
        }
    }

    char key = _getch();

    if (key == 72)
        selected = (selected - 1 + totalOptions) % totalOptions;

    else if (key == 80)
        selected = (selected + 1) % totalOptions;

    else if (key == 13)
    {
        system("cls");

        if (role == "admin")
            handleAdminSelection(dynamic_cast<Admin*>(user), selected);

        else if (role == "doctor")
            handleDoctorSelection(dynamic_cast<Doctor*>(user), selected);

        else if (role == "receptionist")
            handleReceptionistSelection(dynamic_cast<Receptionist*>(user), selected);

        cout << "\n\n\033[33mPress any key to continue...\033[0m";
        _getch();
        if (opt[selected] == "logout")
            return;
    }
}


}

