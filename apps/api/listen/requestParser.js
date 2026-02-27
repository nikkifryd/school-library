import * as database from '../process/process.js'
import http from "http"

const routes = {
    'GET': {
        'books': {
            null : getBooks(res),
            '{id}': getBook(res,id)
        },
        'students': (res, id) => id ? getStudent(res, id) : getStudents(res, id),
        'test': {
            // GET /api/test/lurch => "lurch"
            'lurch': (res, id, params) => "lurch",

            // GET /api/test/Hund => "Es ist ein: Hund"
            // GET /api/test/Katze => "Es ist ein: Katze"
            '{tier}': (res, id, params) => "Es ist ein: " + params.tier,

            '{gattung}': {
                // GET /api/test/Canine/Wolf => "Gattung: Canine Tier: Wolf"
                '{tier}': (res, id, params) => `Gattung: ${params.gattung} Tier: ${params.tier}`,
            }
        },
    }
}

/** Decipher received client request
* -find out method
* -pass on body
* @param {http.IncomingMessage} req Client request
* @param {http.ServerResponse} res Server response
*/
export function handleRequest(req, res) {
    //filter(Boolean) gets rid of empty entries
    let endpoints = req.url.split('/').filter(Boolean);
    let method = req.method;

    if (!(routes[method]) || endpoints[0] !== 'api') {
        res.writeHead(501);
        res.end();
        return;
    }

    const params = {};

    let currentEndpoint = routes[method];
    for (const point of endpoints.slice(1)) {
        if (typeof currentEndpoint !== 'object') {
            console.error();
            return;
        }

        if (point in currentEndpoint) {
            currentEndpoint = currentEndpoint[point];
            continue;
        }

        for (const routeKey in currentEndpoint) {
            if (!routeKey.startsWith("{") || !routeKey.endsWith("}")) {
                continue
            }

            const paramName = routeKey.slice(1, -1)
            params[paramName] = point

            currentEndpoint = currentEndpoint[routeKey]
            break
        }
    }


    if (typeof currentEndpoint === "function") {
        currentEndpoint(res, undefined, params)
    } else {
        console.log("Error", currentEndpoint)
    }
}

/**
 * 
 * @param {[string]} endpoints 
 * @param {object} currentEndpoint 
 */
function parseURL (endpoints, currentEndpoint) {

}
async function getBook(res, id) {
    console.log('single book')
    res.end()
}

async function getBooks(res) {
    console.log('MEGA BOOKS')
    res.end()
}

async function getStudent(res, id) {
    console.log('single student')
    res.end()
}

async function getStudents(res, id) {
    console.log('MEGA STUDS')
    res.end()
}