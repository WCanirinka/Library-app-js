/* eslint-disable no-use-before-define */
let myLibrary = [
  {
    title: 'Grand Entry', author: 'Martin', numPages: 45, status: 'unread',
  },
];

function Book(author, title, numPages, status) {
  this.author = author;
  this.title = title;
  this.numPages = numPages;
  this.status = status;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  render();
}

const app = document.querySelector('#app');

const bookContainer = document.createElement('div');
bookContainer.classList.add('book-container');

app.appendChild(bookContainer);

function removeBook(index) {
  myLibrary = myLibrary.filter((elem, idx) => index !== idx);
  render();
}

function render() {
  bookContainer.innerHTML = '';

  myLibrary.forEach((elem, index) => {
    const book = document.createElement('div');

    const title = document.createElement('h4');
    title.innerText = elem.title;

    const author = document.createElement('h5');
    author.innerText = elem.author;

    const numPages = document.createElement('p');
    numPages.innerText = elem.numPages;

    const status = document.createElement('button');
    status.innerText = elem.status === 'read' ? 'read' : 'unread';

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete Button';

    book.appendChild(title);
    book.appendChild(author);
    book.appendChild(numPages);
    book.appendChild(status);
    book.appendChild(deleteButton);
    bookContainer.appendChild(book);

    deleteButton.addEventListener('click', () => removeBook(index));
  });
}

render();

function addNewBook(e) {
  e.preventDefault();

  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const numPages = document.querySelector('#numPages').value;
  const status = document.querySelector('#status').value.toLowerCase();

  const newBook = new Book(author, title, numPages, status);
  addBookToLibrary(newBook);
}

const addButton = document.createElement('button');
addButton.innerText = 'NEW BOOK';
addButton.classList.add('add-btn');

const formContainer = document.createElement('div');
const form = document.createElement('form');
form.classList.add('form');

const formHtml = `
  <input type='text' placeholder='Title' id='title' />
  <input type='text' placeholder='Author' id='author' />
  <input type='number' placeholder='Pages' id='numPages' />
  <select id="status">
    <option selected disabled>Enter Status</option>
    <option>Read</option>
    <option>Unread</option>
  </select>
  <input type='submit' value='Create Book' />
`;

form.innerHTML = formHtml;
formContainer.appendChild(form);

form.addEventListener('submit', addNewBook);

app.appendChild(addButton);
app.appendChild(formContainer);

function toggleForm() {
  const form = document.querySelector('.form');
  if (form.hasAttribute('style')) {
    form.removeAttribute('style');
  } else {
    form.setAttribute('style', 'display:block !important');
  }
}

addButton.addEventListener('click', toggleForm);

addBookToLibrary(new Book('Ferguson', 'Trail', 20, 'read'));