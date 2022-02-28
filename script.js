let myLibrary = [];
let nextBookId = 1;

const libraryBody = document.getElementById("lib-body");
const inputTitle = document.getElementById("title");
const inputAuthor = document.getElementById("author");
const inputPages = document.getElementById("pages");
const formDiv = document.getElementById("form")
const formAlert = document.querySelector(".alert")

//Book object ctor
function Book(title, author, pages, haveRead, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
    this.id = id;
}

//Creates a Book object and adds it to library array
function addToLibrary(title, author, pages, haveRead) {
    let newBook = new Book(title, author, pages, haveRead, nextBookId);
    myLibrary.push(newBook);
    nextBookId++;
    updateTable();
}

//Reads the input from the form and adds it to library
function btnAddBookClicked() {
    let readStatus = document.querySelector(`input[name="status"]:checked`);
    if (!inputTitle.value || !inputAuthor.value || !inputPages.value || !readStatus) {
        formAlert.classList.remove("invisible");
        return;
    }

    addToLibrary(inputTitle.value, inputAuthor.value, inputPages.value, readStatus.value);
    closeForm();
}

//Get the index of book in mylib array
function getBookIndex(id) {
    return index = myLibrary.findIndex(book => {
        return book.id === id;
    });
}

//Remove book from lib
function removeFromLibrary(event) {

    let id = parseInt(event.target.value);
    console.log(id);
    if (getBookIndex(id) < 0) return;
    myLibrary.splice(getBookIndex(id), 1);
    updateTable();
}

//Change the read status of book
function toggleHaveRead(event) {
    let id = parseInt(event.target.value);
    myLibrary[getBookIndex(id)].haveRead = !myLibrary[getBookIndex(id)].haveRead;
    updateTable();
}

//Clear table and make new one from mylib array
function updateTable() {
    libraryBody.innerHTML = "";

    myLibrary.forEach(book => {
        let row = document.createElement("tr");

        for (const prop in book) {
            let cell = document.createElement("td");
            if (prop === "id") {
                //Delete book button
                let btnDel = document.createElement("button");
                btnDel.classList.add("delete-button");
                btnDel.title = "Delete";
                btnDel.value = book[prop];
                btnDel.addEventListener("click", removeFromLibrary);

                cell.classList.add("btn-cell");
                cell.appendChild(btnDel);
            }
            else if (prop === "haveRead") {
                let text = (book[prop] ? "Finished" : "Not read yet");
                cell.appendChild(document.createTextNode(text));

                //Toggle read book button
                let btnToggle = document.createElement("button");
                // btnToggle.innerText = "Toggle read";
                btnToggle.title = "Toggle read";
                btnToggle.value = book.id;
                btnToggle.classList.add("toggle-button");
                btnToggle.addEventListener("click", toggleHaveRead);
                cell.classList.add("toggle-cell");
                cell.appendChild(btnToggle);
            }
            else {
                cell.appendChild(document.createTextNode(book[prop]));
            }

            row.appendChild(cell);
        }
        libraryBody.appendChild(row);
    });
}

//Reset all the form values and bring it up on the screen
function showForm() {
    formDiv.classList.remove("invisible");
    const readStatus = document.querySelector(`input[name="status"]:checked`);
    if (readStatus) { readStatus.checked = false; }

    formAlert.classList.add("invisible");
    inputTitle.value = "";
    inputAuthor.value = "";
    inputPages.value = "";

}

//Hide form
function closeForm() {
    formDiv.classList.add("invisible");
}

addToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addToLibrary("Consider Phlebas", "Iain M. Banks", 471, false);
addToLibrary("Dune", "Frank Herbert", 412, true);
addToLibrary("American Gods", "Neil Gaiman", 465, true);