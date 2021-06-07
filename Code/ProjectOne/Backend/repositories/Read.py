#!/usr/bin/env python
# -*- coding: utf8 -*-


import RPi.GPIO as GPIO
from repositories.MFRC522Python import MFRC522
from repositories.MFRC522Python import MFRC522B
import signal

buiten = MFRC522.MFRC522()
binnen = MFRC522B.MFRC522B()

continue_reading = True

# Capture SIGINT for cleanup when the script is aborted


class RFID:

    def buiten(self):
        while True:
            # Scan for cards
            (status, TagType) = buiten.MFRC522_Request(buiten.PICC_REQIDL)
            # If a card is found
            if status == buiten.MI_OK:
                print("Card detected Outside")
            # Get the UID of the card
            (status, uid) = buiten.MFRC522_Anticoll()
            # If we have the UID, continue
            if status == buiten.MI_OK:
                # Print UID
                id = ("%s,%s,%s,%s" % (uid[0], uid[1], uid[2], uid[3]))
                print(id)
                # print("Card read UID: %s,%s,%s,%s" % (uid[0], uid[1], uid[2], uid[3]))

                # This is the default key for authentication
                key = [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]

                # Select the scanned tag
                buiten.MFRC522_SelectTag(uid)

                # Authenticate
                status = buiten.MFRC522_Auth(buiten.PICC_AUTHENT1A, 9, key, uid)

                # Check if authenticated
                if status == buiten.MI_OK:
                    data = buiten.MFRC522_Read(8)

    def dataB(self):
        self.buiten()
