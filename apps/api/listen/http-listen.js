import * as http from 'node:http';
import * as parser from './requestParser';
import { json } from 'node:stream/consumers';

const host = "127.0.0.1";
const port = 8000;

const server = http.createServer(
    parser.handleRequest(req,res)
);


server.listen(port,host, () => console.log('Listening on port '+port+'...'));

server.on('request',() => console.log('Request came in'));