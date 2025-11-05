// Problem 4: grading system for ITI => take the score then print the grade
#include <iostream>
using namespace std;

int main() {
    int score;
    
    // take the score from the user
    cout << "Enter your score: " << endl;
    cin >> score;

    // print the grade based on the score   => A (85-100) , B (75-84) , C(60-74) , F(< 60) , else: invalid score
    if (score < 0 || score > 100) {
        cout << "Invalid score!" << endl;
    }
    else if (score >= 85) {
        cout << "Your grade is: A" << endl;
    } 
    else if (score >= 75) {
        cout << "Your grade is: B" << endl;
    } 
    else if (score >= 60) {
        cout << "Your grade is: C" << endl;
    } else
        cout << "Your grade is: F" << endl;
}