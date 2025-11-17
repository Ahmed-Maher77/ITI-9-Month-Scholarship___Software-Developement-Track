// Assignment_1 v4: Using Vector + Copy Constructor + Assignment Operator


/*
- Library stores books in a vector<Book>
- custom copy constructor
- custom copy assignment operator
*/



#include <iostream>
#include <vector>
using namespace std;

class Author {
    string name;
    public:
        // constructor
        Author(string name): name(name) {}
        // getters
        string getName() const { return name; }
};

class Book {
    string title;
    Author author;
    public:
        // constructor
        Book(string title, Author author): title(title), author(author) {}
        // getters
        string getTitle() const { return title; }
        Author getAuthor() const { return author; }
};

class Library {
    vector<Book> books;
    public:
        Library() {}
        Library(const vector<Book>& books) : books(books) {}

        // Copy constructor                                      // Library lib2 = lib1;
        Library(const Library& other) : books(other.books) {     // vector handles deep copy
            cout << "Copy constructor called\n";
        }

        // Copy assignment operator
        Library& operator=(const Library& other) {
            cout << "Copy assignment called\n";
            if (this != &other) {
                books = other.books;
            }
            return *this;
        }

        void addBook(Book b) { books.push_back(b); }

        void list() {
            for (auto& b : books)
                cout << b.getTitle() << " by " << b.getAuthor().getName() << endl;
        }
};

int main() {
    Author a1("Agatha Christie");

    Library lib1;
    lib1.addBook(Book("Murder on the Orient Express", a1));

    Library lib2 = lib1;  // copy constructor

    Library lib3;
    lib3 = lib1;          // copy assignment

    lib2.list();
    return 0;
}
