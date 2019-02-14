const app = require('express')();
const socket = require('socket.io');
const http = require('http');

const server = http.Server(app);
const io = new socket(server);

let slave = {};
let gateOpen = true;

io.on('connection', (socket) => {
    console.log('connected:', socket.client.id);
    slave = socket;
    socket.on('disconnect', () => {
        console.log('disconnect');
        slave = {};
    });
});

app.get('/gong', (req, res) => {
    if (Object.keys(slave).length !== 0) {
        if (gateOpen) {
            gateOpen = false;
            slave.emit('soundTheGong');
            res.status(200);
            res.send(`GONG ${slave.client.id}`);
            setTimeout(() => { gateOpen = true }, 6000);
        } else {
            res.status(503);
            res.send('GONG is busy');
        }
    } else {
        res.status(404);
        res.send('GONG is down!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    }
});

app.post('/gong', (req, res) => {
    if (Object.keys(slave).length !== 0) {
        if (gateOpen) {
            gateOpen = false;
            slave.emit('soundTheGong');
            res.status(200);
            res.send(`GONG ${slave.client.id}`);
            setTimeout(() => { gateOpen = true }, 6000);
        } else {
            res.status(503);
            res.send('GONG is busy');
        }
    } else {
        res.status(404);
        res.send('GONG is down!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    }
});

server.listen(3000);