const body = document.querySelector("body");
const commands = document.querySelector(".commands")
const container = document.querySelector(".container");

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


commands.appendChild(btnNew);
commands.appendChild(btnDisplay);
commands.appendChild(btnClear);

btnDisplay.addEventListener("click", () => {
    displayBooks();
})

btnClear.addEventListener("click", () => {
    clear();
})

function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor.")
    }
    this.id = `id${crypto.randomUUID()}`;
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

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

    const btnRemove = document.createElement("button");
    btnRemove.setAttribute("class", "button-remove");
    btnRemove.setAttribute("id", book.id);
    btnRemove.textContent = "Remove";
    card.appendChild(btnRemove);

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