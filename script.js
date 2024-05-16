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
const overlay = document.getElementById("overlay");
const addButton = document.getElementById("add-book")
const addBookForm = document.getElementById("add-book-form");
const addButtonForm = document.getElementById("add-book")
const submit = document.getElementById("enter");

const openAddBookModal = () => {
    addBookForm.reset();
    addBookForm.classList.add('active');
    overlay.classList.add('active');
}

const closeAddBookModal = () => {
    addBookForm.classList.remove('active');
    overlay.classList.remove('active');
}


addButton.addEventListener('click', function () {
    openAddBookModal();
})

overlay.addEventListener('click', function() {
    addBookForm.classList.remove('active');
    overlay.classList.remove('active');
})

submit.addEventListener('click', function() {
    let title = document.getElementById('name-input').value;
    let author = document.getElementById('author-input').value;
    let pages = document.getElementById('pages-input').value;
    let read = document.getElementById('read-input').value
    let book = new Book(title, author, pages, read);

    if (libary.isInLibrary(book)) {
        alert("Book already in library!")
    } else if (!title || !author || !pages) {
        closeAddBookModal();
    } else {
        libary.addBook(book);
        createBookElement();
    }

    closeAddBookModal();
})

const createBookElement = function() {
    let titleContent = document.getElementById('name-input').value;
    let authorContent = document.getElementById('author-input').value;
    let pagesContent = document.getElementById('pages-input').value;
    let read = document.getElementById('read-input').value

    let book = document.createElement('div');
    book.className = 'book';

    let title = document.createElement('p');
    title.className = 'book-text';
    title.textContent = titleContent;
    
    let author = document.createElement('p');
    author.className = 'book-text';
    author.textContent = authorContent;

    let pages = document.createElement('p');
    pages.className = 'book-text';
    pages.textContent = pagesContent;

    let readButton = document.createElement('button');
    readButton.className = 'button-read';

    let readButtonText = document.createElement('p');
    readButtonText.className = 'book-text';
    readButtonText.textContent = 'Read';
    readButton.appendChild(readButtonText);

    let removeButton = document.createElement('button');
    removeButton.className = 'remove';
    
    let removeButtonText = document.createElement('p');
    removeButtonText.className = 'book-text';
    removeButtonText.textContent = 'Remove';
    removeButton.appendChild(removeButtonText);

    book.appendChild(title);
    book.appendChild(author);
    book.appendChild(pages);
    book.appendChild(readButton);
    book.appendChild(removeButton);

    bookGrid.appendChild(book);
}