from RPi import GPIO
import time

# klasses + repository
from repositories.klasseMCP import MCP
from repositories.klasseSlot import Lock
from repositories.DataRepository import DataRepository

mcp = MCP()
lock = Lock()
data = DataRepository()

magnet = 23


def setup():
    print("starting...")
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(magnet, GPIO.OUT)


try:
    setup()
    while True:
        print(lock.state_hatch())
        state = lock.state_hatch()
        lock.hatch(state, magnet)


except KeyboardInterrupt as e:
    print("quitting...")
finally:
    GPIO.cleanup()
