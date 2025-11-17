// Assignment_1 v3: Author Static + Books Dynamic


/*
- Author is a normal object (static duration in main)
- Books are dynamic objects (created with new)
- Library stores raw pointers to books
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
    Author author;   // Static object passed by value
    public:
        // constructor
        Book(string title, int year, Author author)
            : title(title), year(year), author(author) {}
        // getters
        string getTitle() const { return title; }
        Author getAuthor() const { return author; }
};

class Library {
    vector<Book*> books; // dynamic book pointers
    public:
        void addBook(Book* b) {
            books.push_back(b);
        }

    void list() {
        for (auto* b : books) {
            cout << b->getTitle() << " by " << b->getAuthor().getName() << endl;
        }
    }

    ~Library() {
        for (auto* b : books) delete b;
    }
};

int main() {
    static Author a1("Ahmed Maher", 70);  // static object

    Book* b1 = new Book("Any Title", 1876, a1);
    Book* b2 = new Book("new Title", 1884, a1);

    Library lib;
    lib.addBook(b1);
    lib.addBook(b2);

    lib.list();

    return 0;
}
