import *  as db from 'mariadb';

export async function getAllStudents() {
    const connection = await db.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database:'library'
    });

    try {
        const response = await connection.query('SELECT * FROM students');
        //console.log(response);
    } finally {
        connection.end();
        return response.query;
    }
}