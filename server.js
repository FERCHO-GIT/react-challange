const { createServer } = require("http");
const { createReadStream } = require("fs");
const port = 3000;

createServer((request, response) => {
    switch (request.url) {
        case "/": return getFile(response, 200, "text/html", "./index.html");
        case "/js/app.js": return getFile(response, 200, "text/javascript", "./js/app.js");
        case "/css/style.css": return getFile(response, 200, "text/css", "./css/style.css");
    }
}).listen(port);

function getFile(response, status, type, path) {
    response.writeHead(status, { 
        "Content-Type": type
    });

    createReadStream(path).pipe(response);
}

console.log(`Servidor en puerto ${port}`);