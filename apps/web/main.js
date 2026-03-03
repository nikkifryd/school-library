
const elements = {
    searchBook: document.getElementById("searchBook"),
    tableRows: document.getElementById("bookTable").children
}

fetch('http://127.0.0.1:8000/api/books').then((response) => response.json())
.then(fillBookTable);

elements.searchBook.addEventListener('input', (event) => {
    fetch('http://127.0.0.1:8000/api/books/'+searchBook.value).then((response) => response.json())
    .then(fillSearchResult);
});

function rowListen(row) {
    console.log(row);

    row.addEventListener('click', (event) => {
        //fetch /api/books/$id/lending/log
    });
}


