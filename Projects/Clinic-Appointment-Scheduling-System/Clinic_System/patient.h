#ifndef PATIENT_H_INCLUDED
#define PATIENT_H_INCLUDED

using namespace std;

#include "PersonClass.h"

class Patient : public Person {
private:
    int queueNumber;

public:
    Patient(string name, int age, string phone, int qNum);
    void setQueueNumber(int q);
    int getQueueNumber() const;
    void printInfo() override;
    int getPatientID();
};



#endif // PATIENT_H_INCLUDED
