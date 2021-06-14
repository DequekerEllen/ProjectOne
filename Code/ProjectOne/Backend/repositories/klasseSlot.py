from re import M
from RPi import GPIO
from datetime import datetime, timedelta
import time

from repositories.DataRepository import DataRepository
from repositories.klasseLCD import Main

data = DataRepository()
main = Main()

date = datetime.now()+timedelta(hours=1)


class Lock:
    def state_hatch(self):
        hatch = data.read_status_luik(6)
        state = hatch["ActieID"]
        return state

    def hatch(self, state, magnet):
        if state == 4:
            print("*** Closed ***")
            main.lcd.set_cursor(1, 0)
            main.lcd.write_message("Lock locked")
            GPIO.output(magnet, GPIO.HIGH)
        elif state == 5:
            print("*** Open ***")
            main.lcd.set_cursor(1, 0)
            main.lcd.write_message("Lock open   ")
            GPIO.output(magnet, GPIO.LOW)

    def change_state(self, state, temp, light, rain):
        statusAlle = data.read_status_alle_katten()
        status = {}
        for i in statusAlle:
            if i['Status'] == 0:
                status['inside'] = 1
                status['outside'] = 0
            else:
                status['inside'] = 0
                status['outside'] = 1
        print(status)
        state = state
        if state == 5:
            if status['outside'] == 0:
                if temp < 5.0 or temp > 38.0 or light < 20.0 or rain > 15:
                    data.toevoegen_historiek(6, 4, 1, date)
                    print("*** Closing ***")
                else:
                    print("*** Stays Open ***")
        if state == 4:
            if temp > 5.0 and temp < 38.0 and light > 20.0 and rain < 15:
                data.toevoegen_historiek(6, 5, 0, date)
                print("*** Opening ***")
            else:
                print("*** Stays Closed ***")
