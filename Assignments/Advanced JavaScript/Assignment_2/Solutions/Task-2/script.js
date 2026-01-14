// =========== Book Class ===========
function Book(title, numofChapters, author, numofPages, publisher) {
    this.numofCopies = 1; // default 1 copy

    this.title = title;
    this.numofChapters = numofChapters;
    this.author = author;
    this.numofPages = numofPages;
    this.publisher = publisher;
}

// =========== Box Class ===========
function Box(height, width, length, volume, material) {
    this.content = []; // books List (array of objects)
    this.numOfBooks = 0; // current number of books

    this.height = height;
    this.width = width;
    this.length = length;
    this.volume = volume;
    this.material = material;

    // ========== public methods ==========
    // Add a Book
    this.addBook = function (bookObj) {
        // check duplications
        const bookIndex = this.getBookIndex(bookObj.title);
        if (bookIndex !== -1) {
            // T => increase copies if exists
            bookObj.numofCopies += 1;
        } else {
            // F => add new book
            this.content.push(bookObj);
        }
    };

    // Remove a Book
    this.removeBook = function (bookTitle) {
        // check if book exists
        const bookIndex = this.getBookIndex(bookTitle);
        if (bookIndex !== -1) {
            // T => becrease copies or remove
            const bookCopies = this.content[bookIndex].numofCopies;
            if (bookCopies > 1) this.content[bookIndex].numofCopies -= 1;
            else this.content.splice(bookIndex, 1);
        } else {
            // F => throw error
            throw new Error("Failed Deletion: Book not found in the box");
        }
    };

    // Get Book Info
    this.getBookInfo = function (bookTitle) {
        const bookIndex = this.getBookIndex(bookTitle);
        if (bookIndex !== -1) {
            return this.content[bookIndex];
        } else {
            throw new Error("Failed Access: Book not found in the box");
        }
    };

    // Get Book Index by Title
    this.getBookIndex = function (bookTitle) {
        for (let i = 0; i < this.content.length; i++) {
            if (this.content[i].title === bookTitle) {
                return i;
            }
        }
        return -1; // not found
    };

    // Get All Books
    this.getBooks = function () {
        return this.content;
    };

    // Get Books Count
    this.getBooksCount = function () {
        return this.content.length;
    };
}



// ========== Test Cases ==========
const book1 = new Book("JavaScript", 12, "Brandon Eich", 350, "Tech Press");
const book2 = new Book("Python", 10, "Guido van Rossum", 300, "Tech Press");
const box1 = new Box(30, 300, 200, 9000, "Cardboard");

console.log("===================== Add Books =====================");
box1.addBook(book1);
box1.addBook(book2);
box1.addBook(book1); // duplicate
console.log("Books Count:", box1.getBooksCount()); // 2
console.log("JavaScript Copies:", box1.getBookInfo("JavaScript").numofCopies); // 2

console.log("===================== Get Books =====================");
console.log(box1.getBooks());

console.log("===================== Remove Book =====================");
box1.removeBook("JavaScript");
console.log(
    "After removal, JS Copies:",
    box1.getBookInfo("JavaScript").numofCopies
); // 1

console.log("===================== Error Handling =====================");
try {
    box1.getBookInfo("NonExistent");
} catch (e) {
    console.log(e.message);
}


try {
    box1.removeBook("NonExistent");
} catch (e) {
    console.log(e.message);
}













// =========== UI Operations ===========
// selectors
const addBookForm = document.getElementById("addBook-form");
const tbody = document.querySelector("#box-table-container tbody");

// event listeners
addBookForm.addEventListener("submit", addBookHandler);



// Add Book Handler
function addBookHandler(e) {
    e.preventDefault();
    
    // collect data
    const title = addBookForm.elements.title.value.trim();
    const numofChapters = parseInt(addBookForm.elements.numofChapters.value);
    const author = addBookForm.elements.author.value.trim();
    const numofPages = parseInt(addBookForm.elements.numofPages.value);
    const publisher = addBookForm.elements.publisher.value.trim();

    // create book object
    const book = new Book(title, numofChapters, author, numofPages, publisher);

    // add book to box
    box1.addBook(book);

    // clear form
    addBookForm.reset();

    showBooksInBox();
}


function showBooksInBox() {
    tbody.innerHTML = "";
    for (const bookIndex in box1.getBooks()) {
        const book = box1.getBooks()[bookIndex];
        
        let boxTag = `<tr><td>${parseInt(bookIndex)+1}</td><td>${book.title}</td><td>${book.author}</td><td>${book.numofChapters}</td><td>${book.numofPages}</td><td>${book.publisher}</td><td>${book.numofCopies}</td></tr>`;
        tbody.innerHTML += boxTag;
    }

    box1.getBooks();
}
showBooksInBox();