// Assignment_1 v2: Library With vector Instead of Dynamic Arrays

/*
- Replace raw dynamic arrays with => vector<Book>
- Book still contains an Author object normally
*/


#include <iostream>
#include <vector>
using namespace std;

class Author {
    string name;
    int age;
    public:
        // constructor
        Author(string name, int age) : name(name), age(age) {}
        // getters
        string getName() const { return name; }
};

class Book {
    string title;
    int year;
    Author author;  // normal object
    public:
        // constructor
        Book(string title, int year, Author author)
            : title(title), year(year), author(author) {}
        // getters
        string getTitle() const { return title; }
        Author getAuthor() const { return author; }
};

class Library {
    vector<Book> books;
    public:
        // constructor
        Library(vector<Book> books) : books(books) {}
        // getters
        void list() {
            for (auto& b : books) {
                cout << b.getTitle() << " by " << b.getAuthor().getName() << endl;
            }
        }
};

int main() {
    Author a1("john doe", 47);
    Book b1("hi world", 1949, a1);

    vector<Book> collection = { b1 };

    Library lib(collection);
    lib.list();

    return 0;
}
