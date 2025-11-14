// Assignment 3: Complete BankAccount Class

#include <iostream>
#include <utility> // for std::move
using namespace std;

class BankAccount {
private:
    string accountHolder;
    int accountNumber;
    double balance;
    static int counter;
    static int nextID; 

public:
    // Default Constructor
    BankAccount(): accountHolder("Unknown"), balance(0.0), accountNumber(++nextID)
    {
        counter++;
        cout << "Default constructor called. Account #" << accountNumber << " created.\n";
    }

    // Parameterized Constructor
    BankAccount(const string& name, double bal = 0.0): accountHolder(name), balance(bal), accountNumber(++nextID)
    {
        counter++;
        cout << "Parameterized constructor called. Account #" << accountNumber << " created.\n";
    }

    // Copy Constructor => disable
    BankAccount(const BankAccount& other) = delete;

    // Copy Assignment Operator => disable
    BankAccount& operator=(const BankAccount& other) = delete;

    // Move Constructor
    BankAccount(BankAccount&& other) noexcept {
        // Transfer ownership
        accountHolder = other.accountHolder;
        balance = other.balance;
        accountNumber = other.accountNumber;
        // remove the content of the original object
        other.accountHolder = "";
        other.balance = 0.0;
        other.accountNumber = 0;
        cout << "Move constructor called. Account #" << accountNumber << " moved.\n";
    }

    // Move Assignment Operator (disabled)
    BankAccount& operator=(BankAccount&& other) = delete;

    // Deposit method (supports chaining)
    BankAccount& deposit(double amount) {
        if (amount <= 0) {
            cout << "Ivalid deposit amount.\n";
            return *this;
        }
        balance += amount;
        return *this;
    }

    // Withdraw method
    void withdraw(double amount) {
        if (amount > balance) {
            cout << "Insufficient funds for account #" << accountNumber << endl;
            return;
        }
        balance -= amount;
    }

    // Display account details
    void showAccount() const {
        cout << "\nAccount Information\n";
        cout << "Holder Name: " << accountHolder << endl;
        cout << "Account Number: " << accountNumber << endl;
        cout << "Balance: $" << balance << endl;
    }

    // Return balance
    double getBalance() const {
        return balance;
    }

    // Overload << to print account info
    friend ostream& operator<<(ostream& os, const BankAccount& acc) {    // cout << a1
        os << "\nAccount Details:\n";
        os << "Holder: " << acc.accountHolder << endl;
        os << "Account Number: " << acc.accountNumber << endl;
        os << "Balance: $" << acc.balance << endl;
        return os;
    }

    // Overload >> to input account info
    friend istream& operator>>(istream& in, BankAccount& acc) {       // cin >> a1
        cout << "Enter account holder name: ";
        in >> acc.accountHolder;
        cout << "Enter initial balance: ";
        in >> acc.balance;
        return is;
    }

    // Static method to show total accounts
    static void showCounter() {
        cout << "\n📊 Total Accounts Created: " << counter << endl;
    }

    // Destructor
    ~BankAccount() {
        counter--;
        cout << "Destructor called for Account #" << accountNumber << ". Remaining accounts: " << counter << endl;
    }
};

// Initialize static members
int BankAccount::counter = 0;
int BankAccount::nextID = 1000;

// ========================== MAIN ==========================
int main() {
    BankAccount a1;                 // Default constructor
    BankAccount a2("Ahmed", 5000);  // Parameterized constructor
    BankAccount a3("Sara", 2000);

    cout << "\n=> Deposit & Withdraw\n";
    a2.deposit(2000).deposit(500).withdraw(1000);
    a3.deposit(300).withdraw(100);

    cout << a1 << a2 << a3;

    cout << "\n=> Move Account\n";
    BankAccount a4 = std::move(a2); 
    cout << a4;                     

    cout << "\n=> Input New Account\n";
    BankAccount a5;
    cin >> a5;
    cout << a5;

    BankAccount::showCounter();

    return 0;
}
