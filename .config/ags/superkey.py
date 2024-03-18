#!/bin/python
import evdev
from uuid import uuid4
from evdev import ecodes

devices = [evdev.InputDevice(path) for path in evdev.list_devices()]
keyboard = None
for device in devices:
    if 'keyboard' in str(device.name).lower():
        keyboard = device
        break

polluted = False
super_held = False

superkey = '/home/n3rdium/.config/ags/super_key'
def notify_superkey():
    with open(superkey, 'w') as f:
        f.write(str(uuid4()))

audiokey = '/home/n3rdium/.config/ags/audio_key'
def notify_audiokey():
    with open(audiokey, 'w') as f:
        f.write(str(uuid4()))

for event in keyboard.read_loop():
    if event.type == ecodes.EV_KEY:
        print(event.code)
        if event.code == 125:
            if event.value == 1:
                super_held = True
                polluted = False
            elif not event.value == 2:
                super_held = False
                if polluted == False:
                    notify_superkey()
                polluted = False

        if not event.code == 125 and event.value == 1:
            polluted = True