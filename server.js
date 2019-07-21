const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io').listen(http);
const socketio = require('socket.io-client');
const path = require('path');
const port = process.env.PORT || 3000;

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
});

http.listen(port, () => {
    console.log(`Server is running... ${port}`);
});

let connections = [];

io.sockets.on('connection', (socket) => {
    // when someone connects to your server, add socket object to array
    connections.push(socket);
    console.log('Connected!');

    socket.on('disconnect', data => {
        socket.emit('getPeopleOnline', connections.length);
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected!');
    });

    socket.on('send message', data => {
        io.sockets.emit('add message', {name: data.name, message: data.message});
    });

    socket.emit('getPeopleOnline', connections.length);
});