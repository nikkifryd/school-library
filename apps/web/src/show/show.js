import { elements } from '../components.js';
import * as web from '../web.js';

function emptyBookTable () {
    let rowsCount = elements.booksTable.rows.length;

    for(let i = rowsCount-1; i>0; i--) {
        elements.booksTable.deleteRow(i)
    }
}

export function fillBookTable(books) {
    emptyBookTable();

    for (let book of books) {
        let row = document.createElement('tr');

        for(let attribute in book) {
            let cell = document.createElement('td');
            cell.setAttribute("id", attribute);
            cell.appendChild(document.createTextNode(book[attribute]));

            row.appendChild(cell);
        }

        elements.booksTable.appendChild(row);
    };
}

export function fillLendingWindow(book, transactions) {
    toggleLendingWindow(1);

    elements.lendingBookid.innerHTML = book.id;
    elements.lendingBookTitle.innerHTML = book.title;
    
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

        elements.lendingTable.appendChild(row);
    }
}

function toggleLendingWindow(status) {
    if (status) {
        elements.overlay.style.display = 'flex';
        elements.lendingWindow.style.display = 'flex';

        document.body.style.overflow='hidden';
    }
    else {
        elements.overlay.style.display = 'none';
        elements.lendingWindow.style.display = 'none';

        document.body.style.overflow='auto';
    }
}