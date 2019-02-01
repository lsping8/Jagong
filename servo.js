const Raspi = require('raspi-io');
const five = require("johnny-five");
const board = new five.Board({
    io: new Raspi()
  });

board.on("ready", () => {
  const servo = new five.Servo('GPIO18');
  servo.center();
})