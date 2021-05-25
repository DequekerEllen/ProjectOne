import re
import time
from datetime import datetime
# from helpers.klasseOneWire import OneWire
from repositories.DataRepository import DataRepository

nummer = 1

sensor_file_name = '/sys/bus/w1/devices/28-0216146ad6ee/w1_slave'
sensorfile = open(sensor_file_name, 'r')

def read_temp():
    for i, line in enumerate(sensorfile):
        if i == 1:  # 2de lijn
            temp = int(line.strip('\n')[line.find('t=')+2:])/1000.0
    return temp

try:
    nummer += 1
    print(nummer)
    temp = read_temp()
    date = datetime.now()
    DataRepository.toevoegen_historiek(nummer, 1, temp, 0, date)
    time.sleep(2)

except KeyboardInterrupt as e:
    print(e)

finally:
    print("Ended")
    sensorfile.close()