import *  as db from 'mariadb';

const connectionPool = await db.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database:'library'
});

/**
 * Returns all open transactions for given student
 * @param {string} name 
 * @returns 
 */
export async function getTransactionsForStudent(name) {
    let query = 'SELECT * FROM lending '+
        'WHERE student = '+name+' '+
        'AND end IS NULL;';

    let response = await connectionPool.query(query);
    return response;
}

export async function getAllStudents() {
    let query = 'SELECT * FROM students';

    let response = await connectionPool.query(query);
    return response;
}

/**
 * Get book information for book with given id
 * @param {int} bookid
 * @returns {}
 */
export async function getBook(bookid) {
    let query = 'SELECT * FROM books WHERE id = '+bookid+';'

    let response = await connectionPool.query(query);
    return response;
}

export async function getAllBooks() {
    let query = 'SELECT * FROM books ORDER BY id';

    let response = await connectionPool.query(query);
    return response;
}

/**
 * Returns all transactions for the given book
 * @param {int} bookid id of book
 * @returns {[id: int, book: int, student: String, start: Date, end: Date]} Who lent this book and when
 */
export async function getTransactions(bookid) {
    let query = 
        'SELECT * '+
        'FROM lending l '+
        'WHERE book = '+bookid+' '+
        'ORDER BY start;';

    let response = await connectionPool.query(query);
    return response;
}

/**
 * Returns who the given book is currently lent out to
 * @param {int} bookid id of book
 * @returns {id: int, book: int, student: String, start: Date, end: Date} Who is currently borrowing the given book
 */
export async function getCurrentTransaction(bookid) {
    let query = 
        'SELECT * '+
        'FROM lending l '+
        'WHERE book = '+bookid+' '+
        'AND end IS NULL;';

    let response = await connectionPool.query(query);
    return response[0];
}

/**
 * Queries the database for all lent out books
 * @returns {[id: int, book: int, student: String, start: Date, end: Date]} 
 */
export async function getOpenTransactions() {
    let query = 
        'SELECT * '+
        'FROM lending l '+
        'WHERE end IS NULL;';

    let response = await connectionPool.query(query);
    return response;
}

export async function put(params) {
    
}


//testers -> Delete
console.log(await getAllStudents());
console.log(await getAllBooks());
console.log(await getTransactions(1));
console.log(await getCurrentTransaction(1));