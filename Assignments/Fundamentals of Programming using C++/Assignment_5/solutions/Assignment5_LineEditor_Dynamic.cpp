// Assignment 5: Continue Line Editor and make it with dynamic allocation(using Raw Pointers)

#include <iostream>
#include <termios.h>
#include <unistd.h>
#include <cctype>
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
    char* text = new char[WIDTH + 1];
    for (int i = 0; i < WIDTH; i++) text[i] = ' ';
    text[WIDTH] = '\0';

    int cursorPos = 0;
    int length = 0; // actual content length (excluding spaces)

    // Draw yellow rectangle
    MOVE_CURSOR(ROW, COL);
    SET_COLOR_YELLOW();
    cout << text;
    RESET_COLOR();
    MOVE_CURSOR(ROW, COL);
    cout.flush();

    setRawMode(true);

    while (true) {
        int ch = getchar();

        if (ch == 27) { // ESC sequence (arrows, home, end, del)
            if (getchar() == '[') {
                ch = getchar();
                switch (ch) {
                    case 'D': // Left
                        if (cursorPos > 0) cursorPos--;
                        break;
                    case 'C': // Right
                        if (cursorPos < length) cursorPos++;
                        break;
                    case 'H': // Home
                        cursorPos = 0;
                        break;
                    case 'F': // End
                        cursorPos = length;
                        break;
                    case '3': // Delete
                        getchar(); // consume '~'
                        if (cursorPos < length) {
                            for (int i = cursorPos; i < length - 1; i++)
                                text[i] = text[i + 1];
                            text[--length] = ' ';
                        }
                        break;
                }
            }
        }
        else if (ch == 127) { // Backspace
            if (cursorPos > 0) {
                for (int i = cursorPos - 1; i < length - 1; i++)
                    text[i] = text[i + 1];
                text[--length] = ' ';
                cursorPos--;
            }
        }
        else if (ch == '\n' || ch == '\r') { // Enter
            break;
        }
        else if (isprint(ch)) { // Printable
            if (length < WIDTH) {
                for (int i = length; i > cursorPos; i--)
                    text[i] = text[i - 1];
                text[cursorPos++] = (char)ch;
                length++;
            }
        }

        // Redraw line
        MOVE_CURSOR(ROW, COL);
        SET_COLOR_YELLOW();
        cout.write(text, WIDTH);
        RESET_COLOR();

        // Move cursor visually
        MOVE_CURSOR(ROW, COL + cursorPos);
        cout.flush();
    }

    setRawMode(false);

    // Print final text (trimmed)
    MOVE_CURSOR(ROW + 2, COL);
    cout << "Final text: \"";
    for (int i = 0; i < length; i++) cout << text[i];
    cout << "\"" << endl;

    delete[] text;
    return 0;
}
