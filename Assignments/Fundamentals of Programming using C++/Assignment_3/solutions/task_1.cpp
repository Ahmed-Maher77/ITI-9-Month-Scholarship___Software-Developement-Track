// Problem 1: Highlight Menu

#include <iostream>
#include <termios.h>
#include <unistd.h>
#include <cstdlib>
using namespace std;

int main() {
    int choice = 0; // 0: New, 1: Display, 2: Display All, 3: Exit
    const string menu[] = {"New", "Display", "Display All", "Exit"};
    const int menuSize = 4;
    char c;

    // Disable line buffering (take the last press before ENTER) & prevents typed characters from being displayed
    termios oldt, newt;
    tcgetattr(STDIN_FILENO, &oldt);   // store the current terminal settings
    newt = oldt;
    newt.c_lflag &= ~(ICANON | ECHO);
    tcsetattr(STDIN_FILENO, TCSANOW, &newt);

    while (true) {
        system("clear");
        
        cout << "Employee Form\n";
        cout << "-------------\n\n";

        for (int i = 0; i < menuSize; i++) {
            if (i == choice)
                cout << ">> " << menu[i] << "\n";
            else
                cout << "   " << menu[i] << "\n";
        }

        c = getchar();    // ESC | ENTER | UP | DOWN

        if (c == 27) { // ESC or Arrow   => ESC = 27  AND   Arrow = ESC | A or B
            c = getchar();
            if (c == 91) { // Arrow sequence
                c = getchar();
                if (c == 'A') { // Up
                    choice = (choice - 1 + menuSize) % menuSize;
                } else if (c == 'B') { // Down
                    choice = (choice + 1) % menuSize;
                }
            } else { // ESC alone => exit
                system("clear");
                cout << "Bye Bye!\n";
                break;
            }
        } 
        else if (c == 10) { // Enter
            system("clear");
            if (choice == 3) {
                // Exit
                cout << "Bye Bye!\n";
                break;
            } else {
                cout << "You selected: " << menu[choice] << "\n";
                cout << "Press Enter to return to menu...";
                getchar();
            }
        }
    }

    // Restore terminal settings
    tcsetattr(STDIN_FILENO, TCSANOW, &oldt);
    return 0;
}
