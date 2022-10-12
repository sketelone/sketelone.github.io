/*This code stores books from user input into a library and displays the library.
It also gives users the ability to mark previously stored books as read, 
as well as remove books.*/

//intialize constants
let myLibrary = [];

//create constants for referring to html elements.
const form = document.getElementById('book-form');
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const read = document.getElementById('read');
const submit = document.getElementById('submit');
const cardContainer = document.querySelector('.card-container');
const inputs = document.querySelectorAll("input[type=text]");
var readButtons = document.getElementsByClassName('read-button');
var removeButtons = document.getElementsByClassName('remove-button');

//when user submits form, add book to the library
submit.addEventListener('click', function(event) {
    event.preventDefault();
    var formValid = false;
    inputs.forEach(input => {
        console.log(input, input.validity)
        if (validate(input) == false) {
            console.log("nosubmit")
            formValid = false;
        } else {
            formValid = true;
        }
    }) 
    if (formValid == true) {
        addBookToLibrary(title, author, pages, read);
        form.reset();
        closeForm();
    } 
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

/*LIBRARY FUNCTIONS*/
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

//read info from form, construct a new book and add it to the library
function addBookToLibrary(title, author, pages, read) {
    if (read.checked) {
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

//reset library display
function reset() {
    console.log("reset")
    while (cardContainer.firstChild) {
        cardContainer.removeChild(cardContainer.firstChild);
    }
}

//add read and remove buttons to each card
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

//mark book as read
function markRead(entry) {
    var index = parseInt(entry.id);
    myLibrary[index].read = "already read"
    var result = myLibrary[index].info();
    entry.firstChild.textContent = myLibrary[index].info();
}

//remove book from library
function removeBook(entry) {
    console.log("remove book")
    var index = parseInt(entry.id);
    if (index > -1) {
        var temp = myLibrary.splice(index, 1)
    }
    console.log(temp)
    displayLibrary();
}

/*FORM CONTROLS*/
//open form
function openForm() {
    document.getElementById("myForm").style.display = "block";
}

//close form
function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

/*VALIDATION*/
//when user input phone number, validate input
pages.addEventListener('input', (event) => {
    pages.setCustomValidity("");
    if (pages.validity.valueMissing) {
        pages.setCustomValidity("Please fill out this field.");
    } else if (pages.validity.patternMismatch) {
        pages.setCustomValidity("Please enter numbers only.");
    } else {
        pages.setCustomValidity("");
    }
})

//when user inputs anything, validate input
inputs.forEach(input => {
    input.addEventListener('input', (event) => {
        validate(input);
    })
})

//show error if input is invalid 
function validate(i) {
    console.log(i)
    if (i.validity.valid) {
        clearError(i);
    } else {
        showError(i);
        return false
    }
}

//clear errors if input is updated to be valid
function clearError(i) {
    var inputError = document.querySelector("." + i.name + "_error");
    inputError.textContent = "";
}

//show validation message as error
function showError(i) {
    var inputError = document.querySelector("." + i.name + "_error");
    inputError.textContent = i.validationMessage;
}

