import *  as db from 'mariadb';

const connectionPool = await db.createPool({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database:'library'
    });
export async function getAllStudents() {
        const response = await connectionPool.query('SELECT * FROM students');
        return response;
}