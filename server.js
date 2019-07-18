const express = require('express');
const app = express();
const server = require('http').createServer(app);
const socketio = require('socket.io')(server);
const path = require('path');

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
});

let users = [];
let connections = [];

socketio.sockets.on('connection', (socket) => {
    // when someone connects to your server, add socket object to array
    connections.push(socket);
    console.log('Connected!');

    socket.on('disconnect', (data) => {
        socket.emit('getPeopleOnline', connections.length);
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected!');
    });

    socket.on('sendMessage', data => {
        socket.emit('addMessage', ({mess: data.mess, name: data.name}));
    });

    socket.emit('getPeopleOnline', connections.length);
});

server.listen(process.env.PORT || 3000);