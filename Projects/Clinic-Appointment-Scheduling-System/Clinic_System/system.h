#ifndef SYSTEM_H_INCLUDED
#define SYSTEM_H_INCLUDED

#include <vector>
#include <string>

#include "UserClass.h"
#include "Admin.h"
#include "Doctor.h"
#include "Receptionist.h"
#include "Patient.h"
#include "appointment.h"

class ClinicSystem {
private:
    // Storage for all objects
    std::vector<Admin*> admins;                 // Admins, Doctors, Receptionists
    std::vector<Doctor*> doctors;
    std::vector<Receptionist*> receptionists;
    std::vector<Patient*> patients;
    std::vector<Appointment*> appointments;

public:
    ClinicSystem();
//    ~ClinicSystem();

    void start();                      // Entry point of the system
    void loginMenu();                  // Handles login screen
     void handleAdminSelection(Admin* admin ,int index);
     void handleReceptionistSelection(Receptionist* rec ,int index);
     void handleDoctorSelection(Doctor* rec ,int index);
//    // Menu functions
    void adminMenu(Admin* admin);
    void receptionistMenu(Receptionist* rec);
    void doctorMenu(Doctor* doctor);
    void showMenu(vector<string>&opt,const string& role,User* user);
//
//    // Utility functions
    User* checkAuth(const std::string& username , const std::string& password);
};


#endif // SYSTEM_H_INCLUDED
