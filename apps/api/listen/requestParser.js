import * as database from '../process/process.js'
import http from "http"

const routes = {
    'GET': {
        // GET /api/books
        'books': (res, id) => id ? getBook(res, id) : getBooks(res, id),
        'book': {
            // GET /api/book/1234
            '{id}': (res, _, params) => getBook(res, params.id)
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
    let pathParts = req.url.split('/').filter(Boolean)
    let method = req.method

    if (!routes[method] || pathParts[0] !== 'api') {
        res.writeHead(501)
        res.end()
        return
    }

    const params = {}

    let currentRouteConfig = routes[method]
    for (const part of pathParts.slice(1)) {
        if (typeof currentRouteConfig !== "object") {
            console.error("TBD: dinge sollten passieren")
            return
        }

        if (part in currentRouteConfig) {
            currentRouteConfig = currentRouteConfig[part]
            continue
        }

        for (const routeKey in currentRouteConfig) {
            if (!routeKey.startsWith("{") || !routeKey.endsWith("}")) {
                continue
            }

            const paramName = routeKey.slice(1, -1)
            params[paramName] = part

            currentRouteConfig = currentRouteConfig[routeKey]
            break
        }
    }

    if (typeof currentRouteConfig === "function") {
        currentRouteConfig(res, undefined, params)
    } else {
        console.log("Error", currentRouteConfig)
    }
}


async function getBook(res, id) {
    console.log('single book')
    res.end()
}

async function getBooks(res, id) {
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