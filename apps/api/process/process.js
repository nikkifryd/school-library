import *  as db from 'mariadb';

const connectionPool = await db.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database:'library'
});

export async function getAllStudents() {
    let query = 'SELECT * FROM students';

    const response = await connectionPool.query(query);
    return response;
}

export async function getAllBooks() {
    let query = 'SELECT * FROM books ORDER BY id';

    const response = await connectionPool.query(query);
    return response;
}

/**
 * Returns all transactions for the given book
 * @param {int} bookid id
 * @returns {[String: studentName, Date: startLend, Date: endLend]}
 * Who lent this book and when
 */
export async function getTransactionsForBook(bookid) {
    let query = 
        'SELECT * '+
        'FROM lending l '+
        'WHERE book = '+bookid+' '+
        'ORDER BY start;';

    const response = await connectionPool.query(query);
    return response;
}

//helpers -> Delete
console.log(await getAllStudents());
console.log(await getAllBooks());
console.log(await getTransactionsForBook(1));