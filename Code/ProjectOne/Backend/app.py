import re
import time
from RPi import GPIO
from datetime import datetime, timedelta
import threading
from flask_cors import CORS
from flask_socketio import SocketIO, emit, send
from flask import Flask, jsonify

from repositories.DataRepository import DataRepository
from repositories.klasseMCP import MCP
from repositories.klasseLCD import Main
from repositories.klasseOneWire import Wire
from repositories.klasseSlot import Lock
from repositories.Read import RFID
# from helpers.KlasseNeo import Neo

magnet = 23

# Code voor Hardware
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)
GPIO.setup(magnet, GPIO.OUT)


# klasses
mcp = MCP(1, 0)
lcd = Main()
wire = Wire()
lock = Lock()
rfid = RFID()
# neo = Neo()


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


@socketio.on('F2B_switch')
def switch_hatch(data):
    # Ophalen van de data
    new_status = data['new_status']
    new_waarde = data['new_waarde']
    date = datetime.now()+timedelta(hours=1)
    print(f"Magneet wordt geswitcht naar {new_status}")

    # Stel de status in op de DB
    DataRepository.toevoegen_historiek(6, new_status, new_waarde, date)


def waarde():
    while True:
        print('*** Temp doorgeven **')
        temp = wire.read_temp()
        # print(temp)
        date = datetime.now()+timedelta(hours=1)
        DataRepository.toevoegen_historiek(1, 1, temp, date)
        socketio.emit('B2F_waardeTemp_device', {
                      'waarde': temp}, broadcast=True)

        print('*** Licht doorgeven **')
        licht_percentage = mcp.read_channel(1)
        # print(licht_percentage)
        date = datetime.now()+timedelta(hours=1)
        DataRepository.toevoegen_historiek(2, 8, licht_percentage, date)
        socketio.emit('B2F_waardeLicht_device', {
                      'waarde': licht_percentage}, broadcast=True)

        print('*** Neerslag doorgeven **')
        neerslag = mcp.read_channel(2)
        # print(neerslag)
        woord_neerslag = wire.omzetten_neerslag(neerslag)
        # print(woord_neerslag)
        date = datetime.now()+timedelta(hours=1)
        DataRepository.toevoegen_historiek(3, 2, neerslag, date)
        socketio.emit('B2F_waardeRain_device', {
                      'waarde': woord_neerslag}, broadcast=True)
        time.sleep(10)


def slot():
    lcd.show_status()

    while True:
        temp = float(wire.read_temp())
        neerslag = float(mcp.read_channel(2))
        licht_percentage = float(mcp.read_channel(1))
        state = lock.state_hatch()
        lock.hatch(state, magnet)
        lock.change_state(state, temp, licht_percentage, neerslag)
        # Vraag de (nieuwe) status op van het slot en stuur deze naar de frontend.
        socketio.emit('B2F_verandering_magnet', {
                      'status': state}, broadcast=True)
        # print(state)
        time.sleep(2)


def readers():
    while True:
        rfid.buiten()
        time.sleep(1)


thread = threading.Timer(0.2, waarde)
thread2 = threading.Timer(0.01, slot)
thread3 = threading.Timer(0.01, readers)
thread.start()
thread2.start()
thread3.start()


if __name__ == '__main__':
    socketio.run(app, debug=False, host='0.0.0.0')
