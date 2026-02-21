import * as http from 'node:http';
import { json } from 'node:stream/consumers';

const host = "127.0.0.1";
const port = 8000;

const server = http.createServer((req,res) => {
    console.log(req.headers);
    
    if (req.method === 'GET') {
        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('Handling GET requests');
        res.end();
    }
    else if (req.method === 'POST') {
        res.writeHead(200, {'content-type':'text/plain'});
        res.end('Handling POST request');
    }
    else {
        res.writeHead(406, {'content-type':'text/plain'});
        res.end('UnacceptaaaBLEEEEE!!1!!11!')
    }
});

server.listen(port,host, () => console.log('Listening on port '+port+'...') );

server.on('connection',(socket) => console.log('New connection'));

