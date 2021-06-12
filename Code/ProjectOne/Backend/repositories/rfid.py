from time import sleep
import sys
from mfrc522 import SimpleMFRC522
from mfrc522 import SimpleMFRC522B
readerBinnen = SimpleMFRC522()
readerBuiten = SimpleMFRC522B()

readings = {}

try:
    while True:
        id = readerBinnen.read_id_no_block()
        idB = readerBuiten.read_id_no_block()
        if id is not None:
            print("ID Inside: %s" % (id))
            readings['Inside'] = id

        if idB is not None:
            print("ID Outside: %s" % (idB))
            readings['Outside'] = idB

        print(readings)
        keys = list(readings.keys())
        values = list(readings.values())
        if len(readings) > 1:
            key_1 = keys[0]
            value_1 = values[0]
            key_2 = keys[1]
            value_2 = values[1]
            if key_1 == 'Outside' and key_2 == 'Inside':
                if value_1 == value_2:
                    print('Cat Inside')
                    readings = {}
                else:
                    readings = {}
            if key_1 == 'Inside' and key_2 == 'Outside':
                if value_1 == value_2:
                    print('Cat Outside')
                    readings = {}
                else:
                    readings = {}
        sleep(1)
except KeyboardInterrupt as e:
    print(e)
