
const elements = {
   booksTable: document.getElementById('booksTable'),
    lendingWindow: document.getElementById('lending'),
    lendingTable: document.getElementById('lendingTable'),
    overlay: document.getElementById('overlay'),
    searchBook: document.getElementById('searchBook'),
    tableRows: document.getElementById('booksTable').children
}

fetch('http://127.0.0.1:8000/api/books').then((response) => response.json())
.then(fillBookTable);

elements.searchBook.addEventListener('input', (event) => {
    fetch('http://127.0.0.1:8000/api/books/'+searchBook.value).then((response) => response.json())
    .then(fillSearchResult);
});

function rowListen(row) {
    row.addEventListener('click', (event) => {
        let bookId = event.target.parentElement.querySelector('#id').innerHTML;
        let bookTitle = event.target.parentElement.querySelector('#title').innerHTML;
        let bookAuthor = event.target.parentElement.querySelector('#author').innerHTML;
        let bookData = {id:bookId, title: bookTitle, author: bookAuthor};
        
        fetch('http://127.0.0.1:8000/api/books/'+bookId+'/lending/log').then((response) => response.json())
        .then((transactions) => {
            fillLendingWindow(transactions, bookData);
        });
            
    });
}


