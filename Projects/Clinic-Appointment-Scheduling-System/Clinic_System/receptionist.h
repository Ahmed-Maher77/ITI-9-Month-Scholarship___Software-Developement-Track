#ifndef RECEPTIONIST_H_INCLUDED
#define RECEPTIONIST_H_INCLUDED

#include <vector>
#include <string>
#include <iostream>

#include "UserClass.h"
#include "Patient.h"
#include "Appointment.h"
#include "Doctor.h"

class Receptionist : public User
{
public:

    // --------- Constructors ---------
    Receptionist() ;

    Receptionist(std::string name, int age, std::string phoneNumber,
                 std::string username, std::string password) ;


    // --------- Patient Management ---------
    Patient* addPatient(int pQnum);
//
    void updatePatient(std::vector<Patient*>& patients);
//
    void deletePatient(std::vector<Patient*>& patients);


    // --------- Appointment Management ---------
    Appointment* bookAppointment();
//
    void cancelAppointment(std::vector<Appointment*>& appointments);


    // --------- View Functions ---------
    void viewAllDoctors(std::vector<Doctor*> doctors);
    void viewAllPatients(std::vector<Patient*> patients);
    void viewAllAppointments(std::vector<Appointment*> appointments);
    void receptionistMenu();
};



#endif // RECEPTIONIST_H_INCLUDED
