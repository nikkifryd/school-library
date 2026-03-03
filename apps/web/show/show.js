const bookTable = document.getElementById("bookTable");

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
        row.className = "hoverZoom";
        rowListen(row);
        
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