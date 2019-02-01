const app = require('express')();
const socket = require('socket.io');
const http = require('http');

const server = http.Server(app);
const io = new socket(server);

io.on('connection', (socket) => {
    console.log('connected:', socket.client.id);

    app.get('/gong', (req, res) => {
        socket.emit('soundTheGong');
        res.send('GONG');
    });
});

server.listen(3000);