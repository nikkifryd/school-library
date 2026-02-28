import * as http from 'node:http';
import * as parser from './requestParser.js';
import { ApiError } from '../talk/apiError.js';
import { sendError } from '../talk/talk.js';

const host = "127.0.0.1";
const port = 8000;

const server = http.createServer(onRequest);

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

server.listen(port,host, () => console.log('Listening on port '+port+'...'));