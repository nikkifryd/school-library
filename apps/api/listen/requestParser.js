import * as database from '../process/process.js'

 /* Decipher received client request
 * -find out method
 * -pass on body
 * @param {http.IncomingMessage} req Client request
 * @param {http.ServerResponse} res Server response
 */
export function handleRequest (req,res){
    let url = req.url;
    let method = req.method;

    //Find out method and call appropriate receive-method
    switch (method) {
        case 'GET':
            receiveGet(url, req, res);
            break;

        case 'POST':
            receivePost(url, req, res);
            break;

         case 'PUT':
            receivePut(url, req, res);
            break;
        
         case 'DELETE':
            receiveDelete(url, req, res);
            break;

         case 'UPDATE':
            receiveUpdate(url, req, res);
            break;

        default:
            break;
    }
}     


/**
 * Decipher incoming GET request 
 * @param {string} url 
 * @param {http.IncomingMessage} req Client request
 * @param {http.ServerResponse} res Server response 
 */
async function receiveGet(url, req, res) {
    //read out endpoint
    switch (url) {
        case '/students':
            res.writeHead(200, {'Content-Type':'application/json'});
            let queryResult = await database.getAllStudents();
            res.end(JSON.stringify(queryResult));
            break;
    
        default:
            break;
    }
}

/**
 * Decipher incoming POST request 
 * @param {string} url 
 * @param {http.IncomingMessage} req Client request
 * @param {http.ServerResponse} res Server response 
 */
function receivePost(params) {
    //to fill
}

/**
 * Decipher incoming PUT request 
 * @param {string} url 
 * @param {http.IncomingMessage} req Client request
 * @param {http.ServerResponse} res Server response 
 */
function receivePut(params) {
    //to fill
}

/**
 * Decipher incoming DELETE request 
 * @param {string} url 
 * @param {http.IncomingMessage} req Client request
 * @param {http.ServerResponse} res Server response 
 */
function receiveDelete(params) {
    //to fill
}

/**
 * Decipher incoming UPDATE request 
 * @param {string} url 
 * @param {http.IncomingMessage} req Client request
 * @param {http.ServerResponse} res Server response 
 */
function receiveUpdate(params) {
    //to fill
}
