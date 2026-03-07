import {elements} from '../components.js';
import * as process from '../process/process.js';

export function listenBookTableRows () {
    for (let row of booksTable.rows) {
        row.addEventListener('click', (event) => {
            let bookid = event.target.parentElement.querySelector('#id').innerHTML;
        
            process.loadLendingWindow(bookid);
        });
    }
}

export function listenSearchBar () {
    searchBar.addEventListener('input', (event) => {
        process.searchBook(searchBar.value);
    });
}