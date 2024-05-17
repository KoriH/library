const library = new Library();
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
        this.books = this.books.filter((book) => book.title !== title);
    };

    this.getBook = function(title) {
        return this.books.find((book) => book.title === title);
    };

    this.isInLibrary = function(newBook) {
        return this.books.some((book) => book.title === newBook.title);
    };

    this.saveLibrary = function() {
        localStorage.setItem('library', JSON.stringify(this.books));
    };

    this.loadLibrary = function() {
        const storedLibrary = JSON.parse(localStorage.getItem('library'));
        if (storedLibrary) {
            this.books = storedLibrary;
        }
    };
}

const overlay = document.getElementById("overlay");
const addButton = document.getElementById("add-book");
const addBookForm = document.getElementById("add-book-form");
const submit = document.getElementById("enter");

// Open and close modal functions
const openAddBookModal = () => {
    addBookForm.reset();
    addBookForm.classList.add('active');
    overlay.classList.add('active');
};

const closeAddBookModal = () => {
    addBookForm.classList.remove('active');
    overlay.classList.remove('active');
};

// Event listeners for opening and closing modal
addButton.addEventListener('click', openAddBookModal);

overlay.addEventListener('click', () => {
    closeAddBookModal();
});

// Event listener for submitting the form
submit.addEventListener('click', () => {
    let title = document.getElementById('name-input').value;
    let author = document.getElementById('author-input').value;
    let pages = document.getElementById('pages-input').value;
    let read = document.getElementById('read-input').checked;

    let book = new Book(title, author, pages, read);

    if (library.isInLibrary(book)) {
        alert("Book already in library!");
    } else if (!title || !author || !pages) {
        closeAddBookModal();
    } else {
        library.addBook(book);
        library.saveLibrary();
        createBookElement(book);
    }

    closeAddBookModal();
});

// Function to create a read button
const createReadButton = (book) => {
    const readButton = document.createElement('button');
    const readButtonText = document.createElement('p');

    readButtonText.className = 'book-text';
    readButton.className = 'button-read';
    readButton.appendChild(readButtonText);

    if (book.read) {
        readButtonText.textContent = 'Read';
        readButton.style.backgroundColor = 'green';
    } else {
        readButtonText.textContent = 'Unread';
        readButton.style.backgroundColor = 'red';
    }

    readButton.addEventListener('click', function() {
        book.read = !book.read;
        if (book.read) {
            readButtonText.textContent = 'Read';
            readButton.style.backgroundColor = 'green';
        } else {
            readButtonText.textContent = 'Unread';
            readButton.style.backgroundColor = 'red';
        }
        library.saveLibrary();
    });

    return readButton;
};

// Function to create a remove button
const createRemoveButton = (bookElement, book) => {
    let removeButton = document.createElement('button');
    removeButton.className = 'remove';

    let removeButtonText = document.createElement('p');
    removeButtonText.className = 'book-text';
    removeButtonText.textContent = 'Remove';
    removeButton.appendChild(removeButtonText);

    removeButton.addEventListener('click', function() {
        library.removeBook(book.title);
        library.saveLibrary();
        bookElement.remove();
    });

    return removeButton;
};

// Function to create a book element
const createBookElement = (book) => {
    let bookElement = document.createElement('div');
    bookElement.className = 'book';

    let title = document.createElement('p');
    title.className = 'book-text';
    title.textContent = book.title;
    
    let author = document.createElement('p');
    author.className = 'book-text';
    author.textContent = book.author;

    let pages = document.createElement('p');
    pages.className = 'book-text';
    pages.textContent = book.pages;

    const readButton = createReadButton(book);
    const removeButton = createRemoveButton(bookElement, book);
    
    bookElement.appendChild(title);
    bookElement.appendChild(author);
    bookElement.appendChild(pages);
    bookElement.appendChild(readButton);
    bookElement.appendChild(removeButton);

    bookGrid.appendChild(bookElement);
};

// Initial setup: Load library from local storage
document.addEventListener('DOMContentLoaded', () => {
    library.loadLibrary();
    library.books.forEach(book => {
        createBookElement(book);
    });
});
