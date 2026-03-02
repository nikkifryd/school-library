const ip = '127.0.0.1:8000';

export async function getAllBooks() {
    let response = await fetch(ip+'/api/books', {
        method: 'GET'
    });

    return response;
}