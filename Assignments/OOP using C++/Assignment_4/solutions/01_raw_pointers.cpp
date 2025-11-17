// Assignment_1 v1: Using Raw Pointers

/*
- Book stored with a raw pointer to Author
- Library stores books using raw dynamic arrays
*/


#include <iostream>
using namespace std;

class Author {
    string name;
    int age;
    public:
        // constructor
        Author(string name, int age) : name(name), age(age) {}
        // getters
        string getName() { return name; }
        int getAge() { return age; }
};

class Book {
    string title;
    int year;
    Author* author;   // raw pointer
    public:
        // constructor
        Book(string title, int year, Author* author)
            : title(title), year(year), author(author) {}
        // getters
        string getTitle() { return title; }
        int getYear() { return year; }
        Author* getAuthor() { return author; }
};

class Library {
    Book** books;  // raw pointer to array of Book pointers
    int size;
    public:
        // constructor
        Library(int size) : size(size) {
            books = new Book*[size];
            for (int i = 0; i < size; i++) books[i] = nullptr;
        }
        // add book
        void addBook(int index, Book* book) {
            if (index >= 0 && index < size) books[index] = book;
        }
        void list() {
            for (int i = 0; i < size; i++) {
                if (books[i]) {
                    cout << books[i]->getTitle() << " by " << books[i]->getAuthor()->getName() << endl;
                }
            }
        }

    ~Library() {
        // delete all dynamic book objects
        for (int i = 0; i < size; i++) delete books[i];
        delete[] books;
    }
};

int main() {
    Author* a1 = new Author("Ahmed Maher", 60);
    Book* b1 = new Book("ITI_Days", 1939, a1);
    
    Author* a2 = new Author("Ahmed Maher 2", 60);
    Book* b2 = new Book("ITI_Days_2", 2025, a2);

    Library lib(2);
    lib.addBook(0, b1);
    lib.addBook(1, b2);

    lib.list();

    delete a1;
    delete a2;
    return 0;
}
