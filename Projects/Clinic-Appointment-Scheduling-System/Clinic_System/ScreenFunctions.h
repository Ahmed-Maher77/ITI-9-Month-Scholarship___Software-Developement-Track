#ifndef SCREEN_FUNCTIONS_H
#define SCREEN_FUNCTIONS_H

// ===================== Change console config =====================
/*
The default console mode is Cannonical mode
(enters the data into the program after pressing enter so it isn't suitable for arrow keys interactions)
*/


#ifdef _WIN32
#include <windows.h>
#include <conio.h>


// Enable raw mode on Windows (no echo, no buffering)
void enableRawMode() {
    HANDLE hStdin = GetStdHandle(STD_INPUT_HANDLE);
    DWORD mode;
    GetConsoleMode(hStdin, &mode);
    mode &= ~(ENABLE_ECHO_INPUT | ENABLE_LINE_INPUT);
    SetConsoleMode(hStdin, mode);
}

void disableRawMode() {
    HANDLE hStdin = GetStdHandle(STD_INPUT_HANDLE);
    DWORD mode;
    GetConsoleMode(hStdin, &mode);
    mode |= (ENABLE_ECHO_INPUT | ENABLE_LINE_INPUT);
    SetConsoleMode(hStdin, mode);
}

#else
#include <termios.h>
#include <unistd.h>

termios orig_term;

// Enable raw mode on Linux (no echo, no line buffering)
void enableRawMode() {
    tcgetattr(STDIN_FILENO, &orig_term);
    termios raw = orig_term;
    raw.c_lflag &= ~(ECHO | ICANON);
    tcsetattr(STDIN_FILENO, TCSAFLUSH, &raw);
}

void disableRawMode() {
    tcsetattr(STDIN_FILENO, TCSAFLUSH, &orig_term);
}
#endif

//===================================================
// Clear Console Screen (Windows/Linux)
//===================================================
void clearScreen() {
    #ifdef _WIN32
        system("cls");
    #else
        system("clear");
    #endif
};


//===================================================
// Read key (UP, DOWN, ENTER, ESC)
//===================================================
int readKey() {

    #ifdef _WIN32
        int ch = getch();

        if (ch == 13) return 13; // ENTER
        if (ch == 27) return 27; // ESC

        // arrow keys
        if (ch == 224 || ch == 0) {
            int arrow = getch();
            if (arrow == 72) return 1; // UP
            if (arrow == 80) return 2; // DOWN
        }
        return ch;

    #else
        int ch = getchar();

        if (ch == '\n' || ch == '\r') return 13;
        if (ch != 27) return ch;  // not ESC → normal

        // If it's ESC, check if it's an arrow key
        int next1 = getchar();

        // ESC alone → treat as exit
        if (next1 == '\n' || next1 == EOF)
            return 27;

        if (next1 != '[')
            return 27; // ESC + random → exit

        // Now read arrow direction
        int next2 = getchar();
        if (next2 == 'A') return 1; // UP
        if (next2 == 'B') return 2; // DOWN

        return 0; // Unknown escape sequence
    #endif
};


#endif
