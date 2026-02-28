import * as http from "node:http";

/**
 * Sends the result
 * @param {http.ServerResponse} res 
 */
export function sendResult(result, res) {
    res.writeHead(200,{
        'server': 'Node.js and MariaDB',
        'content-language': 'de',
        'content-type': 'application/json',
    });
    res.end(JSON.stringify(result));
}