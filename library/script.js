
//initialize library
let myLibrary = [];

//create constants for referring to html elements.
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const read = document.getElementById('read');
const submit = document.getElementById('submit');
const cardContainer = document.querySelector('.card-container');
var readButtons = document.getElementsByClassName('read-button');
var removeButtons = document.getElementsByClassName('remove-button');

//book constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return(this.title + " / " + this.author + ", " + this.pages + " pages, status: " + this.read);
    }
}

//when user submits form, add book to the library
submit.addEventListener('click', function(event) {
    console.log(read)
    addBookToLibrary(title, author, pages, read);
})

//when read button is clicked, mark read
document.addEventListener('click', function(e) {
    if(e.target && e.target.className == 'read-button') {
        var entry = e.target.parentElement.parentElement;
        markRead(entry);    
    }
})

//when remove button is clicked, remove book
document.addEventListener('click', function(e) {
    if(e.target && e.target.className == 'remove-button') {
        var entry = e.target.parentElement.parentElement;
        removeBook(entry);    
    }
})

//read info from form, construct a new book and add it to the library
function addBookToLibrary(title, author, pages, read) {
    if (read.value == "yes") {
        var newBook = new Book(title.value, author.value, pages.value, "already read");
    } else {
        var newBook = new Book(title.value, author.value, pages.value, "not read yet");
    }
    myLibrary.push(newBook);
    displayLibrary();
}

//display the library
function displayLibrary() {
    console.log("display")
    reset();
    for (var i = 0; i < myLibrary.length; i++) {
        var v = document.createElement('div');
        var t = document.createElement('text');
        t.textContent = myLibrary[i].info();
        v.className = "card";
        v.id = i;
        v.appendChild(t);
        addButtons(v);
        cardContainer.appendChild(v);
    }
}

function reset() {
    console.log("reset")
    while (cardContainer.firstChild) {
        cardContainer.removeChild(cardContainer.firstChild);
    }
}

// //display the book in the catalogue
// function displayBook(book) {
//     var v = document.createElement('div');
//     var t = document.createElement('text');
//     t.textContent = book.info();
//     v.className = "card";
//     v.appendChild(t);
//     addButtons(v);
//     cardContainer.appendChild(v);
//     console.log("added new book")
// }

function addButtons(card) {
    var v = document.createElement('div');
    var w = document.createElement("button");
    var y = document.createElement("button");
    v.className = "button-container";
    w.className = "read-button";
    w.textContent = "READ";
    v.appendChild(w);
    y.className = "remove-button";
    y.textContent = "REMOVE";
    v.appendChild(y);
    card.appendChild(v);
}

function markRead(entry) {
    var index = parseInt(entry.id);
    myLibrary[index].read = "already read"
    var result = myLibrary[index].info();
    entry.firstChild.textContent = myLibrary[index].info();
}

function removeBook(entry) {
    console.log("remove book")
    var index = parseInt(entry.id);
    if (index > -1) {
        var temp = myLibrary.splice(index, 1)
    }
    console.log(temp)
    displayLibrary();
}
