import * as http from "node:http";
import { ApiError } from "./apiError.js";

/**
 * Sends the result to the client
 * @param {http.ServerResponse} res 
 */
export function sendResult(result, res) {
    res.writeHead(200,{
        'server': 'Node.js and MariaDB',
        'content-language': 'de',
        'content-type': 'application/json',
        'access-control-allow-origin': '*'
    });
    res.end(JSON.stringify(result));
}

/**
 * Sends the given error to the client
 * @param {ApiError} error 
 * @param {http.ServerResponse} res
 */
export function sendError(error, res) {
    if(error.errorCode === 405)
        res.setHeader('Allow','GET');

    res.writeHead(error.errorCode, {
        'server': 'Node.js and MariaDB',
        'content-type': 'text/plain'
    });
    res.end(error.errorCode+' - '+error.message);
}