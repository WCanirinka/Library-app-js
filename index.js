/* eslint-disable no-use-before-define */
let myLibrary = [];

function Book(author, title, numPages, status) {
  this.author = author;
  this.title = title;
  this.numPages = numPages;
  this.status = status;
}
Book.prototype.toggleStatus = function toggleStatus() {
  if (this.status === 'read') {
    this.status = 'unread';
  } else {
    this.status = 'read';
  }
};

function addBookToLibrary(book) {
  myLibrary.push(book);
  render();
}

function init() {
  const app = document.querySelector('#app');

  const bookContainer = document.createElement('div');
  bookContainer.classList.add('book-container');
  app.appendChild(bookContainer);

  render();

  const addButton = document.createElement('button');
  addButton.innerText = 'NEW BOOK';
  addButton.classList.add('add-btn');

  const formContainer = document.createElement('div');
  const form = document.createElement('form');
  form.classList.add('form');

  const formHtml = `
    <input type='text' placeholder='Title' id='title' required/>
    <input type='text' placeholder='Author' id='author' required/>
    <input type='number' placeholder='Pages' id='numPages' required/>
  <select id="status">
    <option selected disabled>Enter Status</option>
    <option>Read</option>
    <option>Unread</option>
  </select>
  <input class='submit-btn' type='submit' value='Create Book' />
`;

  form.innerHTML = formHtml;
  formContainer.appendChild(form);

  form.addEventListener('submit', addNewBook);

  app.appendChild(addButton);
  app.appendChild(formContainer);

  addButton.addEventListener('click', toggleForm);
}

function removeBook(index) {
  myLibrary = myLibrary.filter((elem, idx) => index !== idx);
  render();
}

function changeStatus(index) {
  const book = myLibrary.find((elem, idx) => index === idx);
  book.toggleStatus();
  render();
}

function render() {
  const bookContainer = document.querySelector('.book-container');
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
    status.classList.add('status-btn');

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    deleteButton.innerText = 'Delete';

    book.appendChild(title);
    book.appendChild(author);
    book.appendChild(numPages);
    book.appendChild(status);
    book.appendChild(deleteButton);
    bookContainer.appendChild(book);

    deleteButton.addEventListener('click', () => removeBook(index));
    status.addEventListener('click', () => changeStatus(index));
  });
}

function addNewBook(e) {
  e.preventDefault();

  const title = document.querySelector('#title');
  const author = document.querySelector('#author');
  const numPages = document.querySelector('#numPages');
  const status = document.querySelector('#status');

  const newBook = new Book(author.value, title.value, numPages.value, status.value.toLowerCase());
  addBookToLibrary(newBook);

  title.value = '';
  author.value = '';
  numPages.value = '';
}

function toggleForm() {
  const form = document.querySelector('.form');
  if (form.hasAttribute('style')) {
    form.removeAttribute('style');
  } else {
    form.setAttribute('style', 'display:block !important');
  }
}

init();

addBookToLibrary(new Book('Ferguson', 'Trail', 20, 'read'));
addBookToLibrary(new Book('Jackson', 'The Might', 560, 'unread'));
addBookToLibrary(new Book('Paul', 'Adventure', 60, 'read'));
