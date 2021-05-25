import time


import time 

class OneWire:
    while True:
        sensor_file_name = '/sys/bus/w1/devices/28-0216146ad6ee/w1_slave'

        sensorfile = open(sensor_file_name, 'r')
        for i, line in enumerate(sensorfile):
            if i == 1:  # 2de lijn
                temp = int(line.strip('\n')[line.find('t=')+2:])/1000.0
                print("{}°C".format(temp))
        time.sleep(1.5)

