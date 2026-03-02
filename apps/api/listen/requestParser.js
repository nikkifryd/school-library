import * as process from '../process/process.js'
import { ApiError } from '../talk/apiError.js';
import { sendError } from '../talk/talk.js';

/**
 * Contains the function and its parameters to be called
 * at the end of a route
 */
class RouteDestination {
    /**
     * 
     * @param {[string]} parameters 
     * @param {function} process 
     */
    constructor(process, parameters) {
        this.process = process;
        this.parameters = parameters;
    }
}

/**Notation:
 * -'' on top 
 * -clear next 
 * -keys last 
 * -Only one at one level 
 */
const routes = {
    'GET': {
        'books': {
            '' : new RouteDestination(process.getAllBooks),
            '$id': {
                '': new RouteDestination(process.getBook),
                'lending':{
                    '': new RouteDestination(process.getBookCurrentTransaction),
                    'log': new RouteDestination(process.getBookTransactions),
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
export async function handleRequest (req,res) {
    //filter(Boolean) gets rid of empty entries
    let endpoints = req.url.split('/').filter(Boolean);
    let method = req.method;
    
    if (endpoints[0] !== 'api') 
        throw new ApiError(400,"Must use \"/api/\" in front of URL for requests to the API");

    if (!(method in routes))
        throw new ApiError(405,"HTTP-method not allowed");

    let atRoute = parseRoute(endpoints.slice(1),routes[method], {});

    if (atRoute instanceof RouteDestination)
        await atRoute.process(atRoute.parameters,req,res);
    else
        throw new ApiError(400,"URL not found");
}

/**
 * Parses the requested URL along the above defined routes recursively
 * @param {[string]} endpoints Endpoints contained in the URL
 * @param {object} currentRoute The point in the route currently at
 * @param {object} parameters The parameters passed in the keys
 * @param {http.IncomingMessage} req IncomingMessage passed down to the function at the route
 * @param {http.ServerResponse} res ServerResponse passed down to the function at the route
 * @returns {Function} The function called at the end of the route
 */
function parseRoute (endpoints, currentRoute, parameters) {
    if(endpoints.length === 0) {
        if (currentRoute instanceof RouteDestination) {
            currentRoute.parameters = parameters;
            return currentRoute;
        }

        if(currentRoute[''] instanceof RouteDestination) {
            currentRoute[''].parameters = parameters;
            return currentRoute[''];
        }
        return false;
    }


    let nextEndpoint = endpoints[0];
    let params = parameters;

    if(nextEndpoint in currentRoute) {
        return parseRoute(endpoints.slice(1), currentRoute[nextEndpoint], params);
    }

    for(let routeKey in currentRoute) {
        if(routeKey.startsWith('$')) {
            let paramName = routeKey.slice(1);
            params[paramName] = nextEndpoint;

            return parseRoute(endpoints.slice(1), currentRoute[routeKey], params);
        }
    }
}