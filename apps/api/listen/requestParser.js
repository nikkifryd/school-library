import * as database from '../process/process.js'

/**Notation:
 * -'' on top
 * -clear next
 * -keys last
 * -Only one at one level
 */
const routes = {
    'GET': {
        'books': {
            '' : {},
            '$id': {
                '': {},
                'author': {}
            }
        },
        'students': {

        },
        'test': {
            'lurch': {
                '': (res, params) => console.log("Desch is a lurch, ganz klar sigg i des"),
                'baby':(res,params) => console.log('BABY LURCH AWW')
            },
            '$tier': (res, params) => console.log("Es ist ein: " + params.tier),

            '$gattung': {
                '':(res, params) => console.log('Nur die Gattung '+ params.gattung),
                '$tier': {
                    '':(res, params) => console.log('Es ist ein '+params.tier+' der Gattung '+params.gattung),
                    'pfote': (res, params) => console.log('Es ist eine '+params.tier+'-Pfote aus der Gattung '+params.gattung),
                    '$koerperteil': (res, params) => console.log('Es ist eins '+params.tier+'-'+params.koerperteil+' aus der Gattung '+params.gattung)
                },
            }
        }
    }
};

 /** Parse client request
 * @param {http.IncomingMessage} req Client request
 * @param {http.ServerResponse} res Server response
 */
export function handleRequest (req,res) {
    //filter(Boolean) gets rid of empty entries
    let endpoints = req.url.split('/').filter(Boolean);
    let method = req.method;

    if (!(routes[method]) || endpoints[0] !== 'api') {
        res.writeHead(501);
        res.end();
        return;
    }

    parseRoute(routes[method], endpoints.slice(1), {}, req, res);
}

/**
 * Parses the requested URL along the above defined routes recursively
 * @param {[string]} endpoints Endpoints contained in the URL
 * @param {object} currentRoute The point in the route currently at
 * @param {object} parameter The parameters passed in the keys
 * @param {http.IncomingMessage} req IncomingMessage passed down to the function at the route
 * @param {http.ServerResponse} res ServerResponse passed down to the function at the route
 * @returns {Function} The function called at the end of the route
 */
function parseRoute (endpoints, currentRoute, parameter, req, res) {
    if(endpoints.length === 0) {
        if (typeof currentRoute === 'function') {
            return currentRoute(parameter, req, res);
        }

        if(typeof currentRoute[''] === 'function') {
            return currentRoute[''](parameter, req, res);
        }
    }


    let nextEndpoint = endpoints[0];
    let params = parameter;

    if(nextEndpoint in currentRoute) {
        return parseRoute(endpoints.slice(1), currentRoute[nextEndpoint], params, req, res);
    }

    for(let routeKey in currentRoute) {
        if(routeKey.startsWith('$')) {
            let paramName = routeKey.slice(1);
            params[paramName] = nextEndpoint;

            let keyValue = parseRoute(endpoints.slice(1), currentRoute[routeKey], params, req, res);
            if(typeof keyValue === 'function') 
                return keyValue(params, req, res);
        }
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