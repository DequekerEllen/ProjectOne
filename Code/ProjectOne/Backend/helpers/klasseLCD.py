import RPi.GPIO as io
import time
from subprocess import check_output

# LCD
rs = 25
enable = 24

# PCF8574
sda = 2
scl = 3
adres = 0x39


class Main:
    def __init__(self):
        io.setmode(io.BCM)
        io.setwarnings(False)

        self.pcf = PCF(sda, scl, adres)
        self.lcd = LCD(rs, enable, self.pcf)

    # show ip
    def show_status(self):
        self.lcd.clear_display()
        ips = check_output(['hostname', '--all-ip-addresses']).split()
        print(ips[0])
        self.lcd.write_message(str(ips[0].decode()))
        # self.lcd.write_message(ips[0].decode())
        if len(ips) > 1:
            self.lcd.set_cursor(1, 0)
            # self.lcd.write_message(ips[].decode())


class LCD:
    def __init__(self, rs, enable, pcf):
        self.rs = rs
        self.enable = enable
        self.pcf = pcf
        # Initialiseer alle GPIO pinnen.
        io.setup(self.rs, io.OUT)
        io.setup(self.enable, io.OUT)

        time.sleep(0.1)
        self.init_LCD()

    # stuur instructie
    def send_instruction(self, value):
        # rs laag: voor instruction
        io.output(self.rs, io.LOW)
        # enable hoog
        io.output(self.enable, io.HIGH)
        self.set_data_bits(value)
        # enable terug laag
        io.output(self.enable, io.LOW)
        time.sleep(0.01)

    # stuur 1 character
    def send_character(self, character):
        # rs hoog: voor data
        io.output(self.rs, io.HIGH)
        # enable hoog
        io.output(self.enable, io.HIGH)
        # data klaarzetten
        self.set_data_bits(character)
        # enable laag
        io.output(self.enable, io.LOW)
        # wait
        time.sleep(0.01)

    # set_data_bits(value)
    def set_data_bits(self, byte):
        self.pcf.write_outputs(byte)

    # write_message(message).
    def write_message(self, message):
        for char in message[:16]:
            self.send_character(ord(char))
        for char in message[16:]:
            self.move_screen()
            self.send_character(ord(char))

    def clear_display(self):
        self.send_instruction(0b00000001)
        # self.send_instruction(0b00000010)

    # init_LCD()
    def init_LCD(self):
        # set datalengte op 8 bit (= DB4 hoog), 2 lijnen (=DB3), 5x7 display (=DB2).
        self.send_instruction(0b00111000)
        # display on (=DB2), cursor on (=DB1), blinking on (=DB0)
        self.send_instruction(0b00001111)
        # clear display en cursor home (DB0 hoog)
        self.clear_display()

    # set cursor
    def set_cursor(self, row, col):
        # byte maken: row (0 of 1) = 0x0* voor rij 0 of 0x4* voor rij 1. col = 0x*0 - 0x*F
        byte = row << 6 | col
        # byte | 128 want DB7 moet 1 zijn
        self.send_instruction(byte | 128)

    # move screen: verplaatst het scherm
    def move_screen(self):
        self.send_instruction(0b00011000)


class PCF:
    def __init__(self, SDA, SCL, address):
        self.sda = SDA
        self.scl = SCL
        self.__address = address
        self.delay = 0.002

        # io setup
        self.__setup()

    def write_outputs(self, data: int):
        # data schrijven
        self.__writebyte(data)
        # ack simuleren door 1 bit te writen
        self.__writebit(1)

    @property
    def address(self):
        return self.__address

    # om het adres van het device te wijzigen
    @address.setter
    def address(self, value):
        self.__address = value

    def __setup(self):
        io.setmode(io.BCM)
        io.setup(self.sda, io.OUT)
        io.setup(self.scl, io.OUT)

        time.sleep(0.1)

        # startconditie
        self.__start_conditie()
        # adres doorklokken + RW=0 om te schrijven
        self.__writebyte(self.__address << 1)
        # ack
        self.__ack()

    def __start_conditie(self):
        io.output(self.sda, io.HIGH)
        time.sleep(self.delay)
        io.output(self.scl, io.HIGH)
        time.sleep(self.delay)
        io.output(self.sda, io.LOW)
        time.sleep(self.delay)
        io.output(self.scl, io.LOW)
        time.sleep(self.delay)

    def stop_conditie(self):
        io.output(self.scl, io.HIGH)
        time.sleep(self.delay)
        io.output(self.sda, io.HIGH)
        time.sleep(self.delay)

    def __writebit(self, bit):
        # sda bitwaarde geven
        io.output(self.sda, bit)
        time.sleep(self.delay)
        # clock hoog
        io.output(self.scl, io.HIGH)
        time.sleep(self.delay)
        # clock laag na delay
        io.output(self.scl, io.LOW)
        time.sleep(self.delay)

    def __ack(self):
        # setup input + pullup van sda pin
        io.setup(self.sda, io.IN, pull_up_down=io.PUD_UP)
        # klok omhoog brengen
        io.output(self.scl, io.HIGH)
        time.sleep(self.delay)
        # sda pin inlezen: laag = OK
        status = io.input(self.sda) == io.LOW
        # setup output van sda pin
        io.setup(self.sda, io.OUT)
        # klok omlaag
        io.output(self.scl, io.LOW)
        time.sleep(self.delay)
        return status

    def __writebyte(self, byte):
        # 8 keer een bit schrijven
        mask = 0x80
        for i in range(8):
            self.__writebit(byte & (mask >> i))


if __name__ == "__main__":
    main = Main()
    try:
        main.show_status()
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print('quitting...')
    finally:
        main.lcd.clear_display()
        main.lcd.pcf.stop_conditie()
        # io.cleanup()
