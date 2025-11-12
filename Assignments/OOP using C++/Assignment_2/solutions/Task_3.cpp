// Assignment 3: Design a BankAccount Class

#include <iostream>
using namespace std;

class BankAccount {
private:
    string accountHolder;
    int accountNumber;
    double balance;
    static int counter; // total accounts created
    static int nextID;  // next account number generator

public:
    // Default Constructor
    BankAccount() {
        accountHolder = "Unknown";
        balance = 0.0;
        accountNumber = ++nextID; // auto-generate account number
        counter++;
        cout << "✅ Default constructor called. Account #" << accountNumber << " created.\n";
    }

    // Parameterized Constructor
    BankAccount(string name, double bal = 0.0) {
        accountHolder = name;
        balance = bal;
        accountNumber = ++nextID; // auto-generate account number
        counter++;
        cout << "✅ Parameterized constructor called. Account #" << accountNumber << " created.\n";
    }

    // Deposit method (supports chaining)
    BankAccount& deposit(double amount) {
        balance += amount;
        return *this;
    }

    // Withdraw method
    void withdraw(double amount) {
        if (amount > balance) {
            cout << "❌ Insufficient funds for account #" << accountNumber << endl;
            return;
        }
        balance -= amount;
    }

    // Display account details
    void showAccount() const {
        cout << "\n🏦 Account Information\n";
        cout << "Holder Name: " << accountHolder << endl;
        cout << "Account Number: " << accountNumber << endl;
        cout << "Balance: $" << balance << endl;
    }

    // Return balance
    double getBalance() const {
        return balance;
    }

    // Static method to show total accounts
    static void showCounter() {
        cout << "\n📊 Total Accounts Created: " << counter << endl;
    }
};

// Initialize static members
int BankAccount::counter = 0;
int BankAccount::nextID = 1000; // starting account number

// ========================== MAIN ==========================
int main() {
    BankAccount a1;                  // Default constructor
    BankAccount a2("Ahmed", 5000);   // Parameterized constructor
    BankAccount a3("Sara");          // Parameterized (balance defaulted to 0)

    a2.deposit(2000).deposit(500).withdraw(1000);
    a3.deposit(300).withdraw(100);

    a1.showAccount();
    a2.showAccount();
    a3.showAccount();

    BankAccount::showCounter();

    return 0;
}
