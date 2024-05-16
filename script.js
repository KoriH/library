const libary = new Library();
const bookGrid = document.getElementById("book-grid");

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function Library() {
    this.books = [];
    this.addBook = function(book) {
        this.books.push(book);
    };
    this.removeBook = function(title) {
        this.books.filter((book) => book.title !== title);
    }
    this.getBook = function(title) {
        this.books.find((book) => book.title === title);
    }
    this.isInLibrary = function(newBook) {
        this.books.some((book) => book.title === newBook.title);
    }
}

const openAddBookModal = () => {
    addBookForm.reset();
    addBookModal.classList.add('active');
    overlay.classList.add('active');
}




const addButton = document.getElementById("add-book")
addButton.addEventListener('click', function () {

    const addBookModal = document.getElementById("add-book-form");
    addBookModal.classList.remove("hidden");


    // let book = document.createElement('div');
    // book.className = 'book';
    // let title = document.createElement('p');
    // title.className = 'book-text';
    // title.textContent = 'Title';
    // let author = document.createElement('p');
    // author.className = 'book-text';
    // author.textContent = 'Author';
    // let pages = document.createElement('p');
    // pages.className = 'book-text';
    // pages.textContent = 'Pages';

    // let readButton = document.createElement('button');
    // readButton.className = 'button-read';
    // let readButtonText = document.createElement('p');
    // readButtonText.className = 'book-text';
    // readButtonText.textContent = 'Read';
    // readButton.appendChild(readButtonText);

    // let removeButton = document.createElement('button');
    // removeButton.className = 'remove';
    // let removeButtonText = document.createElement('p');
    // removeButtonText.className = 'book-text';
    // removeButtonText.textContent = 'Remove';
    // removeButton.appendChild(removeButtonText);

    // book.appendChild(title);
    // book.appendChild(author);
    // book.appendChild(pages);
    // book.appendChild(readButton);
    // book.appendChild(removeButton);

    // bookGrid.appendChild(book);
})