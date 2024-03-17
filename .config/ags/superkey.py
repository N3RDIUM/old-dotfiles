#!/bin/python

import evdev
from evdev import categorize, ecodes
devices = [evdev.InputDevice(path) for path in evdev.list_devices()]
keyboard = None
for device in devices:
    if 'keyboard' in str(device.name).lower():
        keyboard = device
        break

polluted = False
super_held = False

for event in device.read_loop():
    if event.type == ecodes.EV_KEY:
        if event.code == 125:
            if event.value == 1:
                super_held = True
                polluted = False
            elif not event.value == 2:
                super_held = False
                if polluted == False:
                    print('only super pressed')
                    break
                polluted = False

        if not event.code == 125 and event.value == 1:
            polluted = True