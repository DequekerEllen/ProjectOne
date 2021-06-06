
class Wire:
    def read_temp(self):
        global value
        sensor_file_name = '/sys/bus/w1/devices/28-0216146ad6ee/w1_slave'
        sensorfile = open(sensor_file_name, 'r')
        for i, line in enumerate(sensorfile):
            if i == 1:  # 2de lijn
                value = int(line.strip('\n')[line.find('t=')+2:])/1000.0
                value = format(value, '.1f')
        return value

    def omzetten_neerslag(self, waarde):
        if waarde == 0:
            return "None"
        if waarde > 0 & waarde < 500:
            return "Medium"
        if waarde > 500:
            return "A lot"
