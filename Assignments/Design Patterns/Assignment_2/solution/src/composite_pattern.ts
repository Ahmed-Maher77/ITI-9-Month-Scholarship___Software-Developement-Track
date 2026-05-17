class Book {
    constructor(public title: string, public pages: number) {}
    showDetails() {
        console.log(`Title: ${this.title}, Pages: ${this.pages}`);
    }
}

class Box {
    children: Book[] = [];
    constructor(public name: string = "Box") {}
    addBook(book: Book) {
        this.children.push(book);
    }
    showBooks() {
        console.log(`======= ${this.name} details: ========`);
        this.children.forEach(book => book.showDetails());
    }
}

// client code 
const book1 = new Book("book 1", 180);
const book2 = new Book("book 2", 281);
const box = new Box("My Box");
box.addBook(book1);
box.addBook(book2);
box.showBooks();


// ============ Alternative (custom iterator) ============
/*
class BooksIterator {
    private index = 0;
    constructor(private books: Book[]) {}
    next() {
        const isDone = this.index >= this.books.length;
        return { value: this.books[this.index++], done: isDone };
    }
}

const iterator = new BooksIterator([book1, book2]);
iterator.next().value.showDetails(); // Title: book 1, Pages: 180
iterator.next().value.showDetails(); // Title: book 2, Pages: 281
*/