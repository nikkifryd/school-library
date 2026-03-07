var apiAddress = 'http://127.0.0.1:8000/api';

export function setApiAddress (address) {
    if(address)
        apiAddress = address;
}

export async function getAllBooks() {
    let response = await fetch(apiAddress+'/books', {
        method: 'GET'
    }).then((response) => response.json());

    return response;
}

export async function getBook(bookid) {
    let response = await fetch(apiAddress+'/books/'+bookid, {
        method: 'GET'
    }).then((response) => response.json());

    return response;
}

export async function getBookTransactions(bookid) {
    let response = await fetch(apiAddress+'/books/'+bookid+'/lending/log',{
        method: 'GET'
    }).then((response) => response.json());

    return response;
}