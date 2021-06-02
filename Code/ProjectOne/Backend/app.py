import re
import time
from RPi import GPIO
from datetime import datetime, timedelta
import threading
from flask_cors import CORS
from flask_socketio import SocketIO, emit, send
from flask import Flask, jsonify

from repositories.DataRepository import DataRepository
from helpers.klasseMCP import MCP
from helpers.klasseLCD import Main
# from helpers.KlasseNeo import Neo

# Code voor Hardware
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)


mcp = MCP(1, 0)
lcd = Main()
# neo = Neo()


def read_temp():
    global value
    sensor_file_name = '/sys/bus/w1/devices/28-0216146ad6ee/w1_slave'
    sensorfile = open(sensor_file_name, 'r')
    for i, line in enumerate(sensorfile):
        if i == 1:  # 2de lijn
            value = int(line.strip('\n')[line.find('t=')+2:])/1000.0
            value = format(value, '.1f')
    return value


def omzetten_neerslag(waarde):
    if waarde == 0:
        return "None"
    if waarde > 0 & waarde < 500:
        return "Medium"
    if waarde > 500:
        return "A lot"


# Code voor Flask

app = Flask(__name__)
app.config['SECRET_KEY'] = 'geheim!'
socketio = SocketIO(app, cors_allowed_origins="*",
                    logger=False, engineio_logger=False, ping_timeout=1)

CORS(app)


@socketio.on_error()        # Handles the default namespace
def error_handler(e):
    print(e)


print("**** Program started ****")


# API ENDPOINTS


@app.route('/')
def hallo():
    return "Server is running, er zijn momenteel geen API endpoints beschikbaar."


@socketio.on('connect')
def initial_connection():
    print('A new client connect')
    # # Send to the client!

# neo.rainbow_cycle(0.001)

def waarde():
    lcd.show_status()

    while True:
        print('*** Temp doorgeven **')
        temp = read_temp()
        print(temp)
        date = datetime.now()+timedelta(hours=1)
        DataRepository.toevoegen_historiek(1, 1, temp, date)
        socketio.emit('B2F_waardeTemp_device', {
                      'waarde': temp}, broadcast=True)

        print('*** Licht doorgeven **')
        licht_percentage = mcp.read_channel(1)
        print(licht_percentage)
        date = datetime.now()+timedelta(hours=1)
        DataRepository.toevoegen_historiek(2, 8, licht_percentage, date)
        socketio.emit('B2F_waardeLicht_device', {
                      'waarde': licht_percentage}, broadcast=True)

        print('*** Neerslag doorgeven **')
        neerslag = mcp.read_channel(2)
        print(neerslag)
        woord_neerslag = omzetten_neerslag(neerslag)
        print(woord_neerslag)
        date = datetime.now()+timedelta(hours=1)
        DataRepository.toevoegen_historiek(3, 2, neerslag, date)
        socketio.emit('B2F_waardeRain_device', {
                      'waarde': woord_neerslag}, broadcast=True)
        time.sleep(10)

thread = threading.Timer(0.5, waarde)
thread.start()




if __name__ == '__main__':
    socketio.run(app, debug=False, host='0.0.0.0')
