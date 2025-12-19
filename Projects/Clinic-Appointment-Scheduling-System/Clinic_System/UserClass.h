#ifndef USER_CLASS_H
#define USER_CLASS_H

#include <iostream>
#include <string>
#include "PersonClass.h"
//#include "screenFunctions.h"
using namespace std;


// User Class
class User: public Person {
    private:
        string username;
        string password;
        string role;
    public:
        // default constructor
        User(): Person(), username(""), password(""), role("") {}
        // parametrized constructor
        User(string name, int age, string phoneNumber, string username, string password, string role):
            Person(name, age, phoneNumber), username(username), password(password), role(role) {}
        // getters
        string getUsername() {
            return username;
        };
        string getRole() {
            return role;
        };
        // setters
        void setUsername(string username) {
            this->username = username;
        };
        void setRole(string role) {
            this->role = role;
        };
        void setPassword(string password) {
            this->password = password;
        };
        // print Info
        void printInfo() override {
            cout << "ID: " << personID << endl;
            cout << "Name: " << name << endl;
            cout << "Age: " << age << endl;
            cout << "Phone Number: " << phoneNumber << endl;
            cout << "Username: " << this->username << endl;
            cout << "Role: " << this->role << endl;
        }
        // Login
        bool login(string username, string password) {
            if (username != this->username) {
                cout << "Invalid username!" << endl;
                return false;
            }
            if (password != this->password) {
                cout << "Invalid password!" << endl;
                return false;
            }
            return true;
        };
        // render menu function
        virtual void renderMenu(int choice, string highlight, string reset) {
            // clearScreen();
            // cout << "# What do you want to manage?" << endl;
            // cout << (choice == 0 ? highlight + "> 1. check assigned patients" + reset : "1. check assigned patients") << endl;
            // cout << (choice == 1 ? highlight + "> 2. Exit" + reset : "2. Exit") << endl;
        }
        virtual int showMenu() {
            // const string highlight = "\033[1;32m";
            // const string reset = "\033[0m";
            // int choice = 0;
            // const int maxChoices = 2;  // Number of menu options
            // bool confirmed = false;

            // renderMenu(choice, highlight, reset);

            // while (!confirmed) {
            //     int key = readKey();
            //     int oldChoice = choice;

            //     switch(key) {
            //         case 1:  // Up arrow
            //             choice = (choice - 1 + maxChoices) % maxChoices;
            //             break;
            //         case 2:  // Down arrow
            //             choice = (choice + 1) % maxChoices;
            //             break;
            //         case 'w':
            //         case 'W':  // W key (up)
            //             choice = (choice - 1 + maxChoices) % maxChoices;
            //             break;
            //         case 's':
            //         case 'S':  // S key (down)
            //             choice = (choice + 1) % maxChoices;
            //             break;
            //         case 13:  // Enter key
            //             confirmed = true;
            //             break;
            //         case 27:  // ESC key - go back
            //             return -1;  // Return -1 to indicate ESC was pressed
            //     }

            //     if (choice != oldChoice) {
            //         renderMenu(choice, highlight, reset);
            //     }
            // }

            // return choice;
        };
};

#endif
