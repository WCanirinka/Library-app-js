let myLibrary = [
  { title: 'Grand Entry', author: 'Martin', numPages: 45, status: 'unread' }
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

function render() {
  myLibrary.forEach((elem, index) => {
    const bookHtml = `<div class="book-display" id=${index}>
        <h4>${elem.title}</h4>
        <h5>${elem.author}</h5>
        <p>${elem.numPages}</p>
        <button>${elem.status ? 'unread' : 'read'}</button>
        <button class="delete-btn">Delete</button>
        </div>`;

    bookContainer.innerHTML = bookHtml;
  });
  app.appendChild(bookContainer);
}

render();

addBookToLibrary(new Book('Mark', 'Mercury Node', 60, 'read'));
