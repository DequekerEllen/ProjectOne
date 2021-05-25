import time
from RPi import GPIO
from helpers.klasseOneWire import OneWire

from flask_cors import CORS
from flask_socketio import SocketIO, emit, send
from flask import Flask, jsonify
from repositories.DataRepository import DataRepository

try:
    while True:
        OneWire

except KeyboardInterrupt as e:
    print(e)
    OneWire.sensorfile.close()
