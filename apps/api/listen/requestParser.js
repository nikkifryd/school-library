import * as database from '../process/process.js'

const routes = {
    'GET': {
        'books': (res, id) => id ? getBook(res,id) : getBooks(res,id),
        'students': (res, id) => id ? getStudent(res,id): getStudents(res,id)
    }
};

 /* Decipher received client request
 * -find out method
 * -pass on body
 * @param {http.IncomingMessage} req Client request
 * @param {http.ServerResponse} res Server response
 */
export function handleRequest (req,res){
    //filter(Boolean) gets rid of empty entries
    let endpoints = req.url.split('/').filter(Boolean);
    let method = req.method;

    if (!(routes[method]) || endpoints[0] !== 'api') {
        res.writeHead(501);
        res.end();
        return;
    }

    if (routes[method][endpoints[1]]) {
        routes[method][endpoints[1]](res, endpoints[2]);
    }
}


async function getBook(res, id) {
    console.log('single book');
    res.end();
}

async function getBooks(res, id) {
    console.log('MEGA BOOKS');
    res.end();
}

async function getStudent(res, id) {
    console.log('single student');
    res.end();
}

async function getStudents(res, id) {
    console.log('MEGA STUDS');
    res.end();
}