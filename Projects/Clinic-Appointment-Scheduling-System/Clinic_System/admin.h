#ifndef ADMIN_H
#define ADMIN_H

#include <iostream>
#include <string>
#include <conio.h>
#include <cstdlib>
#include <vector>
#include "UserClass.h"
#include "doctor.h"
#include "receptionist.h"
using namespace std;

//class Doctor;
//class Receptionist;

class Admin :public User{
public:

 Admin(
    const std::string& name,
    int age,
    const std::string& phone,
    const std::string& username,
    const std::string& password);
    // ------------------ Admin Menu ------------------
    void adminMenu();

    // ------------- CALL FUNCTION BASED ON SELECTION -------------
    void handleSelection(int index);

    // ---------------- RETURNING FUNCTIONS ---------------------
    Doctor* createDoctor();
    void requestDoctorDeletion(vector<Doctor*>& doctors);

    Receptionist* createReceptionist();
    void requestReceptionistDeletion(vector<Receptionist*>& receptionists);
};

#endif // ADMIN_H
