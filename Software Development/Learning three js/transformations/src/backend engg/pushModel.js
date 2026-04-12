const http = require("http");

const WebSocketServer = require("websocket").server;


// List of connected clients
let connections = [];


const httpserver = http.createServer();


const websocket = new WebSocketServer({"httpServer":httpserver});

httpserver.listen(8080, () => console.log("Server listening on port 8080"));

websocket.on("request", request => {
    const connection = request.accept(null, request.origin);
    connection.on("message", message => {
        connections.forEach( conn => conn.send(`0=>${connection.socket.remotePort} says: ${message}`));
    });

connections.push(connection);
connections.forEach(c => c.send(`0=>${connection.socket.remotePort} is connected`));

});


// client code to spin them up
let wscl = new WebSocket("ws://localhost:8080");

wscl.onmessage = message => console.log(`${message.data}`);