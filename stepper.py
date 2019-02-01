import RPi.GPIO as GPIO
import time

servoPIN = 17
control_pins = [6,13,19,26]
totalLifeCycleForStepper = 64

halfstep_seq = [
  [1,0,0,0],
  [1,1,0,0],
  [0,1,0,0],
  [0,1,1,0],
  [0,0,1,0],
  [0,0,1,1],
  [0,0,0,1],
  [1,0,0,1]
]

halfstep_seq1 = [
  [0,0,0,1],
  [0,0,1,1],
  [0,0,1,0],
  [0,1,1,0],
  [0,1,0,0],
  [1,1,0,0],
  [1,0,0,0],
  [1,0,0,1]
]

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)
GPIO.setup(servoPIN, GPIO.OUT)

p = GPIO.PWM(servoPIN, 50) # GPIO 17 for PWM with 50Hz
p.start(2.5) # Initialization
try:
  time.sleep(1)
  
  for pin in control_pins:
    GPIO.setup(pin, GPIO.OUT)
    GPIO.output(pin, 0)

  for i in range(totalLifeCycleForStepper):
    for halfstep in range(8):
      for pin in range(4):
        GPIO.output(control_pins[pin], halfstep_seq1[halfstep][pin])
      time.sleep(0.001)
  
  p.ChangeDutyCycle(11.5)
  time.sleep(1)
  
  for i in range(totalLifeCycleForStepper):
    for halfstep in range(8):
      for pin in range(4):
        GPIO.output(control_pins[pin], halfstep_seq[halfstep][pin])
      time.sleep(0.001)
  
  p.ChangeDutyCycle(2.5)
  time.sleep(1)
  p.ChangeDutyCycle(0)
  
  for i in range(totalLifeCycleForStepper):
    for halfstep in range(8):
      for pin in range(4):
        GPIO.output(control_pins[pin], halfstep_seq1[halfstep][pin])
      time.sleep(0.001)
      
  for i in range(totalLifeCycleForStepper):
    for halfstep in range(8):
      for pin in range(4):
        GPIO.output(control_pins[pin], halfstep_seq[halfstep][pin])
      time.sleep(0.001)
  time.sleep(0.5)
  GPIO.cleanup()
except KeyboardInterrupt:
  p.ChangeDutyCycle(0)
  p.stop()
  GPIO.cleanup()
