import * as process from '../process/process.js'

/**Notation:
 * -'' on top
 * -clear next
 * -keys last
 * -Only one at one level
 */
const routes = {
    'GET': {
        'books': {
            '' : (params,req,res) => process.getAllBooks(req,res),
            '$id': {
                '': (params,req,res) => process.getBook(params.id,req,res),
                'lending':{
                    '': (params,req,res) => process.getBookCurrentTransaction(params.id,req,res),
                    'log': (params,req,res) => process.getBookTransactions(params.id,req,res)
                }
            }
        },
        'students': {

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

    parseRoute(endpoints.slice(1),routes[method], {}, req, res);
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