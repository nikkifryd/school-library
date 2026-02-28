import * as http from 'node:http';
import * as parser from './requestParser.js';
import { ApiError } from '../talk/apiError.js';
import { sendError } from '../talk/talk.js';

var serverHost = "127.0.0.1";
var serverPort = 8000;

export function listen (host, port) {
    const server = http.createServer(onRequest);
    
    if(host)
        serverHost = host;
    if(port)
        serverPort = port;

    server.listen(serverPort,serverHost, () => console.log('Listening on '+serverHost+':'+serverPort+'...'));
}

function onRequest (req,res) {
    try {
        parser.handleRequest(req,res);
    } catch (error) {
        if(error instanceof ApiError)
            sendError(error,res);
        else
            console.log(error);
    }
}