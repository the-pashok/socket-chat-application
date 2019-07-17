const express = require('express');
const app = express();
const server = require('http').createServer(app);
const socketio = require('socket.io')(server);

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
});

let users = [];
let connections = [];

socketio.sockets.on('connection', (socket) => {
    // when someone connects to your server, add socket object to array
    connections.push(socket);
    console.log('Successfully connected!');

    socket.on('disconnect', (data) => {
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected!');
    });

    socket.on('sendMessage', message => {
        socket.emit('addMessage', ({msg: message}));
    });
});

server.listen(process.env.PORT || 3000);