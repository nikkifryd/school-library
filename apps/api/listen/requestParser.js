import { parse } from 'path';
import * as database from '../process/process.js'
import http from "http"

const routes = {
    'GET': {
        'books': {
            null : getBooks(res),
            '$id': {
                null: getBook(res, parameter),
                'author': (res, parameter) => console.log('Autor des Buches mit der ID:'+parameter.id)
            }
        },
        'students': (res, params) => id ? getStudent(res, id) : getStudents(res, id),
        'test': {
            // GET /api/test/lurch => "lurch"
            'lurch': (res, params) => "lurch",

            // GET /api/test/Hund => "Es ist ein: Hund"
            // GET /api/test/Katze => "Es ist ein: Katze"
            '$tier': (res, params) => console.log("Es ist ein: " + params.tier),

            '$gattung': {
                // GET /api/test/Canine/Wolf => "Gattung: Canine Tier: Wolf"
                '$tier': (res, params) => console.log('Gattung: ${params.gattung} Tier: ${params.tier}')
            }
        }
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

    endpoints = endpoints.slice(1);

    parseRoute(routes[method], endpoints.slice(1), {});
}

/**
 * 
 * @param {object} currentRoute 
 * @param {[string]} endpoints
 * @param {object} parameter 
 */
function parseRoute (currentRoute, endpoints, parameter) {
    let nextEndpoint = endpoints[0];
    let params = parameter;

    if(nextEndpoint in currentRoute) {
        parseRoute(currentRoute[nextEndpoint], endpoints.slice(1), params);
    }
    else {
        for(routeKey in currentRoute) {
            if(routeKey.startsWith('$')) {
                let paramName = routeKey.slice(1);

                params[paramName] = nextEndpoint;
                
            }
        }
    }
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