#ifndef DOCTOR_H_INCLUDED
#define DOCTOR_H_INCLUDED

#include <string>
#include <iostream>
#include <vector>
#include "UserClass.h"
#include "appointment.h"
using namespace std;

class Doctor : public User
{
private:
    static int counter;
    string speciality;

public:
    // Constructors
    Doctor();
    Doctor(string name, int age, string phoneNumber, string username,
           string password, string spec);

    // Setters & Getters
    void setSpec(string spec);
    string getSpec();

    // Methods
    void viewMyAppointments(vector<Appointment*>&appointments);
    void printInfo() override;

};

inline int Doctor::counter = 2000;



#endif // DOCTOR_H_INCLUDED
