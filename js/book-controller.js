'use strict';

function onInit() {
  console.log('ready');
  renderBooks();
}

function renderPaging() {
  var pages = getPagesCount();
  var elPagesSpan = document.querySelector('.next-page-btn span');
  var strHTML = '';
  for (var i = 0; i < pages; i++) {
    strHTML += `<button onclick="onMoveToPage(this)">${i+1}</button>`;
  }
  elPagesSpan.innerHTML = strHTML
}

function onMoveToPage(elBtn){
  var pageNum = elBtn.innerText
  moveToPage(pageNum)
  renderBooks()
}

function onPrevPage() {
  prevPage();
  renderBooks();
}

function onNextPage() {
  nextPage();
  renderBooks();
}

function onSort(sortBy) {
  setSort(sortBy);
  renderBooks();
}

function renderModal(book) {
  var elModal = document.querySelector('.modal');
  elModal.innerHTML = `<h5>${book.name}</h5>
    <img src="../img/${book.name}.jpg">
    <p>${book.desc}</p>
    <div class="book-rate"><h6>Book rating</h6>
    <button onclick="onLowerRate('${book.id}')">-</button>
    <span>${book.rate}</span>
    <button onclick="onAddRate('${book.id}')">+</button></div>
    <button class="close-modal" onclick="onCloseModal()">X</button>`;
  elModal.hidden = false;
}

function onAddRate(bookId) {
  var elModalSpan = document.querySelector('.modal span');
  if (addRate(elModalSpan.innerText, bookId)) elModalSpan.innerText++;
}

function onLowerRate(bookId) {
  var elModalSpan = document.querySelector('.modal span');
  if (lowerRate(elModalSpan.innerText, bookId)) elModalSpan.innerText--;
}

function onBookDetails(bookId) {
  var book = getBookById(bookId);
  renderModal(book);
}

function onCloseModal() {
  document.querySelector('.modal').hidden = true;
  // removeBookReading();
}

function onUpdateBook(bookId) {
  var bookPrice = prompt('Enter new price');
  if (isNaN(bookPrice)) {
    alert('Please add valid book price')
    return;
  }
  updateBook(bookId, bookPrice);
  renderBooks();
}

function onAddBook() {
  const elName = document.querySelector('.name-input');
  const name = elName.value;
  const elPrice = document.querySelector('.price-input');
  var price = parseInt(elPrice.value);
  if (!name || !price) {
    confirm('Please enter a name and a price');
    return;
  }
  addBook(name, price);
  renderBooks();
  elPrice.value = '';
  elName.value = '';
}

function onRemoveBook(bookId) {
  removeBook(bookId);
  renderBooks();
}

function renderBooks() {
  var books = getSortedBooksPage();
  var strHTML = '';
  for (var i = 0; i < books.length; i++) {
    var currBook = books[i];
    strHTML += `<tr>`;
    strHTML += `<td class="cell">${currBook.id}</td>`;
    strHTML += `<td class="cell">${currBook.name}</td>`;
    strHTML += `<td class="cell">${currBook.price}</td>`;
    strHTML += `<td class="cell"><button onclick="onBookDetails('${currBook.id}')">Read</button></td>`;
    strHTML += `<td class="cell"><button onclick="onUpdateBook('${currBook.id}')">Update</button></td>`;
    strHTML += `<td class="cell"><button onclick="onRemoveBook('${currBook.id}')">Delete</button></td>`;
    strHTML += '</tr>';
  }
  var elTable = document.querySelector('tbody');
  elTable.innerHTML = strHTML;
  renderPaging();
}
