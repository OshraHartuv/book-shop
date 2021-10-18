'use strict';
const KEY = 'availableBooks';
const PAGE_SIZE = 4;
var gBooks;
var gSortBy = 'NAME';
var gPageIdx = 0;

_createBooks();

function moveToPage(pageNum) {
  gPageIdx = pageNum - 1;
}

function getPagesCount() {
  var books = loadBooksFromStorage();
  return Math.ceil(books.length / PAGE_SIZE);
}

function getSortedBooksPage() {
  var books = sortBooks(loadBooksFromStorage());
  const fromIdx = gPageIdx * PAGE_SIZE;
  books = books.slice(fromIdx, fromIdx + PAGE_SIZE);
  return books;
}

function prevPage() {
  console.log(gPageIdx);
  console.log(getPagesCount());
  if (!gPageIdx) return;
  gPageIdx--;
}

function nextPage() {
  gPageIdx++;
  if (gPageIdx * PAGE_SIZE >= gBooks.length) {
    gPageIdx--;
    return;
  }
}

function sortBooks(array) {
  if (gSortBy === 'NAME') {
    return array.sort((a, b) => {
      if (a.name.toUpperCase() < b.name.toUpperCase()) return -1;
      if (a.name.toUpperCase() > b.name.toUpperCase()) return 1;
      return 0;
    });
  } else {
    return array.sort((a, b) => {
      if (a.price < b.price) return -1;
      if (a.price > b.price) return 1;
      return 0;
    });
  }
}

function setSort(sortBy) {
  gSortBy = sortBy;
}

function addRate(initRate, bookId) {
  var bookRating = +initRate + 1;
  if (bookRating < 0) return;
  else if (bookRating > 10) return;
  var book = getBookById(bookId);
  bookRating = ++initRate;
  book.rate = bookRating;
  // console.log(book);
  saveBooksToStorage();
  return true;
}

function lowerRate(initRate, bookId) {
  var bookRating = +initRate - 1;
  if (bookRating < 0) return;
  else if (bookRating > 10) return;
  var book = getBookById(bookId);
  bookRating = --initRate;
  book.rate = bookRating;
  console.log(book);
  saveBooksToStorage();
  return true;
}

function getBookById(bookId) {
  return gBooks.find((book) => bookId === book.id);
}

function updateBook(bookId, bookPrice) {

  var book = getBookById(bookId);
  book.price = bookPrice;
  saveBooksToStorage();
}

function addBook(name, price) {
  var book = {
    name,
    price,
    id: makeId(),
    desc: makeLorem(),
    rate: 0,
  };
  gBooks.push(book);
  saveBooksToStorage();
}

function removeBook(bookId) {
  var bookIdx = gBooks.findIndex((book) => {
    return book.id === bookId;
  });
  gBooks.splice(bookIdx, 1);
  saveBooksToStorage();
  if (gPageIdx === getPagesCount()) onPrevPage();
  // console.log(gPageIdx);
  // console.log(getPagesCount());
}

function loadBooksFromStorage() {
  return loadFromStorage(KEY);
}

function saveBooksToStorage() {
  saveToStorage(KEY, gBooks);
}

function _createBooks() {
  var books = loadBooksFromStorage();
  if (!books || !books.length) {
    books = [
      _createBook('Round'),
      _createBook('Hobbit'),
      _createBook('Coraline'),
    ];
  }
  gBooks = books;
  // console.log(gBooks);
  saveBooksToStorage();
}

function _createBook(name) {
  var book = {
    name,
    price: getRandomIntInclusive(1, 150),
    id: makeId(),
    desc: makeLorem(),
    rate: 0,
  };
  // console.log(book);
  return book;
}
