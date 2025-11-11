// Assignment 3: Line Editor

#include <iostream>
#include <termios.h>
#include <unistd.h>
#include <string>
using namespace std;

#define ROW 12
#define COL 10
#define WIDTH 50

#define MOVE_CURSOR(r, c) cout << "\033[" << (r) << ";" << (c) << "H"
#define SET_COLOR_YELLOW() cout << "\033[43m"
#define RESET_COLOR() cout << "\033[0m"

// Enable/disable raw terminal mode
void setRawMode(bool enable) {
    static struct termios oldt, newt;
    if (enable) {
        tcgetattr(STDIN_FILENO, &oldt);
        newt = oldt;
        newt.c_lflag &= ~(ICANON | ECHO);
        tcsetattr(STDIN_FILENO, TCSANOW, &newt);
    } else {
        tcsetattr(STDIN_FILENO, TCSANOW, &oldt);
    }
}

int main() {
    string text(WIDTH, ' ');
    int cursorPos = 0;

    // Draw yellow rectangle
    MOVE_CURSOR(ROW, COL);
    SET_COLOR_YELLOW();
    cout << string(WIDTH, ' ');
    RESET_COLOR();
    MOVE_CURSOR(ROW, COL);
    cout.flush();

    setRawMode(true); // Turn on raw input mode

    while (true) {
        int ch = getchar();

        if (ch == 27) { // ESC sequence → arrow/home/end/delete 
            if (getchar() == '[') {
                ch = getchar();
                switch (ch) {
                    case 'D': // Left arrow
                        if (cursorPos > 0) cursorPos--;
                        break;
                    case 'C': // Right arrow
                        if (cursorPos < WIDTH - 1) cursorPos++;
                        break;
                    case 'H': // Home
                        cursorPos = 0;
                        break;
                    case 'F': // End
                        cursorPos = text.find_last_not_of(' ');
                        if (cursorPos == string::npos) cursorPos = 0;
                        else cursorPos++;
                        if (cursorPos >= WIDTH) cursorPos = WIDTH - 1;
                        break;
                    case '3': // Delete (ESC [ 3 ~)
                        getchar(); // read the trailing '~'
                        if (cursorPos < WIDTH)
                            text.erase(cursorPos, 1), text.push_back(' ');
                        break;
                }
            }
        }
        else if (ch == 127) { // Backspace
            if (cursorPos > 0) {
                text.erase(cursorPos - 1, 1);
                text.push_back(' ');
                cursorPos--;
            }
        }
        else if (ch == '\n' || ch == '\r') { // Enter
            break;
        }
        else if (isprint(ch)) { // Printable characters
            if (cursorPos < WIDTH) {
                text[cursorPos] = (char)ch;
                cursorPos++;
            }
        }

        // Redraw line
        MOVE_CURSOR(ROW, COL);
        SET_COLOR_YELLOW();
        cout << text;
        RESET_COLOR();

        // Move cursor visually
        MOVE_CURSOR(ROW, COL + cursorPos);
        cout.flush();
    }

    setRawMode(false); // Restore normal mode

    MOVE_CURSOR(ROW + 2, COL);
    cout << "Final text: \"" << text.substr(0, text.find_last_not_of(' ') + 1) << "\"" << endl;

    return 0;
}