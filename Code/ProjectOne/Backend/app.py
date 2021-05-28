from helpers.klasseMCP import MCP
import re
import time
from datetime import datetime, timedelta
import threading
from flask_cors import CORS
from flask_socketio import SocketIO, emit, send
from flask import Flask, jsonify

from repositories.DataRepository import DataRepository

mcp = MCP(1, 0)


def read_temp():
    global value
    sensor_file_name = '/sys/bus/w1/devices/28-0216146ad6ee/w1_slave'
    sensorfile = open(sensor_file_name, 'r')
    for i, line in enumerate(sensorfile):
        if i == 1:  # 2de lijn
            value = int(line.strip('\n')[line.find('t=')+2:])/1000.0
            value = format(value, '.1f')
    return value


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


def waarde():
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
        time.sleep(10)


thread = threading.Timer(0.5, waarde)
thread.start()

# sensorfile.close()
if __name__ == '__main__':
    socketio.run(app, debug=False, host='0.0.0.0')
