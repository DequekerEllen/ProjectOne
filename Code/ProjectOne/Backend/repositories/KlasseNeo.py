import time
import board
import neopixel


# Choose an open pin connected to the Data In of the NeoPixel strip, i.e. board.D18
# NeoPixels must be connected to D10, D12, D18 or D21 to work.
pixel_pin = board.D12

# The number of NeoPixels
num_pixels = 1

# The order of the pixel colors - RGB or GRB. Some NeoPixels have red and green reversed!
# For RGBW NeoPixels, simply change the ORDER to RGBW or GRBW.
ORDER = neopixel.GRB

pixels = neopixel.NeoPixel(
    pixel_pin, num_pixels, brightness=0.05, auto_write=False, pixel_order=ORDER
)


class Neo:

    def wheel(self, pos):
        # Input a value 0 to 255 to get a color value.
        # The colours are a transition r - g - b - back to r.
        if pos < 0 or pos > 255:
            r = g = b = 0
        elif pos < 85:
            r = int(pos * 3)
            g = int(255 - pos * 3)
            b = 0
        elif pos < 170:
            pos -= 85
            r = int(255 - pos * 3)
            g = 0
            b = int(pos * 3)
        else:
            pos -= 170
            r = 0
            g = int(pos * 3)
            b = int(255 - pos * 3)
        return (r, g, b) if ORDER in (neopixel.RGB, neopixel.GRB) else (r, g, b, 0)

    def rainbow_cycle(self, wait):
        for j in range(255):
            for i in range(num_pixels):
                pixel_index = (i * 256 // num_pixels) + j
                pixels[i] = self.wheel(Neo, pixel_index & 255)
            pixels.show()
            time.sleep(wait)

    def hatch(self, state):
        # r g b
        if state == 0:
            pixels.show()
            pixels.fill((255, 0, 0))
        elif state == 1:
            pixels.show()
            pixels.fill((0, 255, 0))
        else:
            print("wrong value")


while True:
#     # Comment this line out if you have RGBW/GRBW NeoPixels
#     # pixels.fill((255, 0, 0))
#     # Uncomment this line if you have RGBW/GRBW NeoPixels
#     # pixels.fill((255, 0, 0, 0))
#     # pixels.show()
#     # time.sleep(1)

#     # Comment this line out if you have RGBW/GRBW NeoPixels
#     # pixels.fill((0, 255, 0))
#     # Uncomment this line if you have RGBW/GRBW NeoPixels
#     # pixels.fill((0, 255, 0, 0))
#     # pixels.show()
#     # time.sleep(1)

#     # Comment this line out if you have RGBW/GRBW NeoPixels
#     # pixels.fill((0, 0, 255))
#     # Uncomment this line if you have RGBW/GRBW NeoPixels
#     # pixels.fill((0, 0, 255, 0))
#     # pixels.show()
#     time.sleep(1)

    Neo.rainbow_cycle(Neo, 0.001)  # rainbow cycle with 1ms delay per step
