import * as process from '../process/process.js'
import { ApiError } from '../talk/apiError.js';
import { sendError } from '../talk/talk.js';

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
    
    try {
        if (endpoints[0] !== 'api') 
            throw new ApiError(400,"Must use \"/api/\" in front of URL for requests to the API");

        if (!(method in routes))
            throw new ApiError(405,"HTTP-method not allowed");

        let endpointAtRoute = parseRoute(endpoints.slice(1),routes[method], {}, req, res);
        
        if (!endpointAtRoute)
            throw new ApiError(400,"URL not found");
    
    } catch (error) {
        if(error instanceof ApiError)
            sendError(error,res);
        else
            console.log(error);
    }
    
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
            currentRoute(parameter, req, res);
            return true;
        }

        if(typeof currentRoute[''] === 'function') {
            currentRoute[''](parameter, req, res);
            return true;
        }
        return false;
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

            return parseRoute(endpoints.slice(1), currentRoute[routeKey], params, req, res);
        }
    }
}