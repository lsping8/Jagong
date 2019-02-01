const io = require('socket.io-client');
const exec = require('child_process').exec;
const socket = io.connect("http://localhost:3000/", {
    reconnection: true
});

socket.on('connect', () => {
    console.log('connected to localhost:3000');
    socket.on('soundTheGong', () => {
        exec('python stepper.py');
        console.log('GONG');
    });
});