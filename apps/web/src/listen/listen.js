import {elements} from '../components.js';
import * as process from '../process/process.js';

export function listenBookTableRows () {
    for (let row of elements.booksTable.rows) {
        if(row.classList.contains('data-row'))
            row.addEventListener('click', (event) => {
                let bookid = event.target.parentElement.querySelector('#id').innerHTML;
            
                process.loadLendingWindow(bookid);
            });
    }
}

export function listenSearchBar () {
    elements.searchBar.addEventListener('input', (event) => {
        process.searchBook(searchBar.value);
    });
}

export function listenLendingButton () {
    let button = elements.lendingButton;

    button.addEventListener('click', (event => {
        if(button.classList.contains('lend')) {
            process.startTransaction();
        }
        else if(button.classList.contains('return')) {
            
        }
        else {
            throw new Error("Missing lendingButton-class");
        }
    }))
}

export function listenOverlay () {
    elements.overlay.addEventListener('click', (event) => {
        process.closeLendingWindow();
    },{once: true})
}