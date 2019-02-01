const io = require('socket.io-client');
const exec = require('child_process').exec;
const socket = io.connect("http://localhost:3000/", {
    reconnection: true
});

const func = () => {
    exec('python stepper.py');
    console.log('GONG');  
}

socket.on('connect', () => {
    
    console.log('connected to localhost:3000');
    socket.on('soundTheGong', func);
    socket.on('disconnect', () => {
        socket.removeEventListener('soundTheGong', func);
    })
});

