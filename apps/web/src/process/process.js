
import * as talk from '../talk/talk.js';
import * as show from '../show/show.js';
import * as listen from '../listen/listen.js';
import { dateWithoutTime, pointNotation } from './dateFormat.js';

export async function loadStartPage (apiAddress) {
    talk.setApiAddress(apiAddress);
    let books = await talk.getAllBooks();

    show.fillBookTable(books);

    listen.listenBookTableRows();
    listen.listenSearchBar();
}

export async function loadLendingWindow (bookid) {
    let book = (await talk.getBook(bookid))[0];
    let transactions = await talk.getBookTransactions(bookid);

    listen.listenLendingButton();
    listen.listenOverlay();


    show.loadLendingWindow(book, transactions);
}

export async function startTransaction () {
    let currentDate = new Date();
    show.startTransaction(currentDate);
}

export function closeLendingWindow() {
    show.closeLendingWindow();
}

export async function searchBook (bookid) {
    let books = await talk.getBook(bookid);

    show.fillBookTable(books);

    listen.listenBookTableRows();
}