import { listen } from "./listen/listen.js";

const args = process.argv.slice(2);

/**
 * No arguments -> hosting at '127.0.0.1:8000'
 * -a port -> hosting at '127.0.0.1:${port}'
 * -a ip:port -> hosting at '${ip}:${port}'
 */
switch (args.length) {
    case 0:
        startApi();
        break;
    case 1:
        if(args[0] === '-p') {
            console.log("    Incorrect number of parameters passed \'"+args+"\'. You can use:\n "+
            "\t -p port -> Listen on ip-address '127.0.0.1:${port}'\n"+
            "\t -p port ip -> Listen on ip-address'${ip}:${port}'"
            );
            process.exit(1);
        }
    case 2:
        if(args[0] === '-p') {
            startApi(args.slice(1));
            break;
        }
    case 3:
        if(args[0] === '-p') {
            startApi(args.slice(1));
            break;
        }
    default:
        console.log("    Incorrect flags or number of parameters\'"+args+"\'. You can use:\n "+
            "\t -p port -> Listen on ip-address '127.0.0.1:${port}'\n"+
            "\t -p port ip -> Listen on ip-address'${ip}:${port}'"
        );
        process.exit(1);
}

/**
 * Starts the server in ./listen/listen,js
 * @param {string} params passed parameters
 */
function startApi (params) {
    if(!params) {
        listen();
        return;
    }
    
    switch (params.length) {
        case 1:
            listen(undefined, params[0]);
            break;
        case 2:
            listen(params[1], params[0]);
            break;
        default:
            console.log("    Incorrect number of parameters passed. You can use:\n "+
            "\t -p port -> Listen on ip-address '127.0.0.1:${port}'\n"+
            "\t -p port ip -> Listen on ip-address'${ip}:${port}'"
            );
            process.exit(1);
    }
}