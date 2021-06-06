from RPi import GPIO
import time

magnet = 23

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)
GPIO.setup(magnet, GPIO.OUT)

GPIO.output(magnet, GPIO.HIGH)
time.sleep(4)
GPIO.output(magnet, GPIO.LOW)
