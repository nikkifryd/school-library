const bookTable = document.getElementById("bookTable");
const searchBook = document.getElementById("searchBook");


fetch('http://127.0.0.1:8000/api/books').then((response) => response.json())
.then(fillBookTable);

searchBook.addEventListener('input', (event) => {
    fetch('http://127.0.0.1:8000/api/books/'+searchBook.value).then((response) => response.json())
    .then(fillSearchResult);
})

function emptyBookTable () {
    for(let row of bookTable.children) {
        if(row.tagName === 'TR')
            bookTable.removeChild(row);
    }
}

function fillBookTable(books) {
    emptyBookTable();

    for (let book of books) {
        let row = document.createElement('tr');
        for(let attribute in book) {
            let cell = document.createElement('td');
            cell.appendChild(document.createTextNode(book[attribute]));

            row.appendChild(cell);
        }

        bookTable.appendChild(row);
    };
}

function fillSearchResult(books) {
    
    console.log(bookTable);
    emptyBookTable();    

    fillBookTable(books);
    console.log(bookTable);
}