import re
import time
from datetime import datetime, timedelta
import threading
from flask_cors import CORS
from flask_socketio import SocketIO, emit, send
from flask import Flask, jsonify

from repositories.DataRepository import DataRepository


def read_temp():
    global value
    sensor_file_name = '/sys/bus/w1/devices/28-0216146ad6ee/w1_slave'
    sensorfile = open(sensor_file_name, 'r')
    for i, line in enumerate(sensorfile):
        if i == 1:  # 2de lijn
            value = int(line.strip('\n')[line.find('t=')+2:])/1000.0
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
        print('*** Waarde doorgeven **')
        temp = read_temp()
        print(temp)
        date = datetime.now()+timedelta(hours=1)
        DataRepository.toevoegen_historiek(1, temp, 0, date)
        socketio.emit('B2F_waarde_device', {'waarde': temp}, broadcast=True)
        time.sleep(10)


thread = threading.Timer(0.5, waarde)
thread.start()


    # sensorfile.close()
if __name__ == '__main__':
    socketio.run(app, debug=False, host='0.0.0.0')
