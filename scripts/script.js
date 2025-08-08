const body = document.querySelector("body");
const commands = document.querySelector(".commands")
const container = document.querySelector(".container");
const dialog = document.getElementById("new-book");
dialog.returnValue = "newBook";
const form = document.getElementById("new-book-form");

const myLibrary = [];

const btnNew = document.createElement("button");
btnNew.setAttribute("class", "button-new");
btnNew.textContent = "New Book";

const btnDisplay = document.createElement("button");
btnDisplay.setAttribute("class", "button-display");
btnDisplay.textContent = "Display Library";

const btnClear = document.createElement("button");
btnClear.setAttribute("class", "btn-clear");
btnClear.textContent = "Clear";

const btnCancel = document.getElementById("button-cancel");
const btnSave = document.getElementById("button-save");

commands.appendChild(btnNew);
commands.appendChild(btnDisplay);
commands.appendChild(btnClear);

btnDisplay.addEventListener("click", () => {
    displayBooks();
})

btnClear.addEventListener("click", () => {
    clear();
})

btnNew.addEventListener("click", () => {
    newBook();
})

btnCancel.addEventListener("click", () => {
    dialog.close("bookNotAdded");
})

btnSave.addEventListener("click", mySave, false);


//function Book(title, author, pages, read) {
//    if (!new.target) {
//        throw Error("You must use the 'new' operator to call the constructor.")
//    }
//    this.id = `id${crypto.randomUUID()}`;
//    this.author = author;
//    this.title = title;
//    this.pages = pages;
//    this.read = read;
//}

class Book {
    constructor(title, author, pages, read) {
        this.id = `id${crypto.randomUUID()}`;
        this.author = author;
        this.title = title;
        this.pages = pages;
        this.read = read;
    }

    changeStatus() {
        if (this.read == "yes") {
            this.read = "no";
        } else if (this.read == "no") {
            this.read = "yes";
        }
        displayBooks();
    }
}

//Book.prototype.changeStatus = function() {
//    if (this.read == "yes") {
//        this.read = "no";
//    } else if (this.read == "no") {
//        this.read = "yes";
//    }
//    displayBooks();
//};

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

function createCard(book) {
    const card = document.createElement("div");
    card.setAttribute("class", "card");
    card.setAttribute("id", book.id);
    container.appendChild(card);
    const cellTitle = document.createElement("div");
    cellTitle.setAttribute("id", "title")
    card.appendChild(cellTitle);
    cellTitle.textContent = book.title;
    const cellAuthorKey = document.createElement("div");
    card.appendChild(cellAuthorKey);
    cellAuthorKey.textContent = "Author:";
    const cellAuthorValue = document.createElement("div");
    card.appendChild(cellAuthorValue);
    cellAuthorValue.textContent = book.author;
    const cellPagesKey = document.createElement("div");
    card.appendChild(cellPagesKey);
    cellPagesKey.textContent = "Pages:";
    const cellPagesValue = document.createElement("div");
    card.appendChild(cellPagesValue);
    cellPagesValue.textContent = book.pages;
    const cellReadKey = document.createElement("div");
    card.appendChild(cellReadKey);
    cellReadKey.textContent = "Read:";
    const cellReadValue = document.createElement("div");
    card.appendChild(cellReadValue);
    cellReadValue.textContent = book.read;

    const buttonsDiv = document.createElement("div");
    buttonsDiv.setAttribute("class", "buttons");
    card.appendChild(buttonsDiv);

    const btnUpdate = document.createElement("button");
    btnUpdate.setAttribute("class", "button-update");
    btnUpdate.setAttribute("id", book.id);
    btnUpdate.textContent = "Change Status";
    buttonsDiv.appendChild(btnUpdate); 
    
    const btnRemove = document.createElement("button");
    btnRemove.setAttribute("class", "button-remove");
    btnRemove.setAttribute("id", book.id);
    btnRemove.textContent = "Remove";
    buttonsDiv.appendChild(btnRemove);

    btnUpdate.addEventListener("click", () => {
        const id = btnUpdate.getAttribute("id");
        const index = myLibrary.findIndex((object) => checkId(object, id));
        const book = myLibrary[index];

        book.changeStatus();
    })

    btnRemove.addEventListener("click", () => {
        const id = btnRemove.getAttribute("id");
        const card = document.querySelector(`.card#${btnRemove.id}`);
        card.remove();
        const index = myLibrary.findIndex((object) => checkId(object, id));
        myLibrary.splice(index, 1);
    })
}

function displayBooks() {
    clear();
    for (let book in myLibrary) {
        let id = myLibrary[book].id;
        createCard(myLibrary[book]);
        //if (!document.getElementById(id)) {
        //    createCard(myLibrary[book]);
        //}
    }
}

function clear() {
    const cards = document.querySelectorAll(".card");
    cards.forEach( (card) => {
        card.remove();
    });
}

function checkId(object, id) {
    return object.id == id;
}

function newBook() {
    dialog.showModal();
}

function mySave(event) {
    const formData = new FormData(form);
    const formDataClean = Object.fromEntries(formData);
    
    const title = formDataClean["book-title"];
    const author = formDataClean["book-author"];
    const pages = formDataClean["book-pages"];
    const read = formDataClean["book-read"];

    addBookToLibrary(title, author, pages, read);
    displayBooks();
    form.reset();
    dialog.close("newBookAdded");

    event.preventDefault();
}