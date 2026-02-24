// import requestParser from "./listen/requestParser"

const args = process.argv.slice(2)


const showHelp = () => {
    console.log("TODO: show help")
}

if (args.length === 0) {
    showHelp()
    exit(0)
}

switch (args[0]) {
    case "serve": {
        const host = "127.0.0.1"
        const port = 8000

        const server = http.createServer(requestParser.handleRequest)

        server.listen(port, host, () => console.log('Listening on port ' + port + '...'))
        server.on('request', () => console.log('Request came in'))
        break
    }

    case "test": {
        const obj = {
            books: "bücher"
        }

        const key = "books"

        // console.log(obj.get(key)) // <- java
        console.log(obj[key]) // <- javascript
        console.log(obj.books)
        console.log(key in obj)

        console.log("{asdf}".slice(1, -1))

        break
    }

    default: {
        showHelp()
    }
}

