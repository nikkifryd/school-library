const booksTable = document.getElementById('booksTable');
const popupWindow = document.getElementById('popup-window');
const lendingTable = document.getElementById('lendingTable');
const overlay = document.getElementById('overlay');

function emptyBookTable () {
    let rowsCount = booksTable.rows.length;

    for(let i = rowsCount-1; i>0; i--) {
        booksTable.deleteRow(i)
    }
}

function fillBookTable(books) {
    emptyBookTable();

    for (let book of books) {
        let row = document.createElement('tr');
        row.className = "hoverZoom";

        for(let attribute in book) {
            let cell = document.createElement('td');
            cell.setAttribute("id", attribute);
            cell.appendChild(document.createTextNode(book[attribute]));

            row.appendChild(cell);
        }
        rowListen(row);

        booksTable.appendChild(row);
    };
}

function fillSearchResult(books) {
    fillBookTable(books);
}

function toggleLendingWindow(status) {
    if (status) {
        overlay.style.display = 'flex';
        popupWindow.style.display = 'flex';

        document.body.style.overflow='hidden';
    }
    else {
        overlay.style.display = 'none';
        popupWindow.style.display = 'none';

        document.body.style.overflow='auto';
    }
}

function fillLendingWindow(transactions, bookData) {
    toggleLendingWindow(1);

    document.getElementById('window-title').innerHTML = bookData.title;
    document.getElementById('window-id').innerHTML = bookData.id;
    
    for (let transaction of transactions) {
        let row = document.createElement('tr');

        for(let attribute in transaction) {
            switch (attribute) {
                case 'student':
                case 'start':
                case 'end':
                    let cell = document.createElement('td');
                    cell.appendChild(document.createTextNode(transaction[attribute]));
                    
                    row.appendChild(cell);
                    break;
            }

        }

        lendingTable.appendChild(row);
    }
}