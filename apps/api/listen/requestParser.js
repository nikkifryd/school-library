import * as database from '../process/process.js'

const routes = {
    'GET': {
        'books': {
            null : {},
            '$id': {
                null: {},
                'author': {}
            }
        },
        'students': {

        },
        'test': {
            // GET /api/test/lurch => "lurch"
            'lurch': (res, params) => "lurch",

            // GET /api/test/Hund => "Es ist ein: Hund"
            // GET /api/test/Katze => "Es ist ein: Katze"
            '$tier': (res, params) => console.log("Es ist ein: " + params.tier),

            '$gattung': {
                // GET /api/test/Canine/Wolf => "Gattung: Canine Tier: Wolf"
                '$tier': (res, params) => console.log('Es ist ein '+params.tier+' der Gattung '+params.gattung)
            }
        }
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

    parseRoute(routes[method], endpoints.slice(1), {});
}

/**
 * 
 * @param {object} currentRoute 
 * @param {[string]} endpoints
 * @param {object} parameter 
 */
function parseRoute (currentRoute, endpoints, parameter) {
    //tester delete
    console.log(endpoints+'('+parameter+'):\n');
    console.log(currentRoute);

    let nextEndpoint = endpoints[0];
    let params = parameter;

    if(endpoints.length === 0) {
        if (typeof currentRoute === 'function') {
            currentRoute(undefined,parameter);
        }
        return;
    }

    if(nextEndpoint in currentRoute) {
        parseRoute(currentRoute[nextEndpoint], endpoints.slice(1), params);
        return;
    }

    for(let routeKey in currentRoute) {
        if(routeKey.startsWith('$')) {
            let paramName = routeKey.slice(1);

            params[paramName] = nextEndpoint;
            parseRoute(currentRoute[routeKey], endpoints.slice(1),params);
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