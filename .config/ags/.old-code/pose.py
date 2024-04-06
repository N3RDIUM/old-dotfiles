import os

file = '/home/n3rdium/.config/ags/pose'
if not os.path.exists(file):
    with open(file, 'w') as f:
        f.write(str(int(bool(True))))

with open(file, 'r') as f:
    contents = bool(int(f.read()))
    
with open(file, 'w') as f:
    f.write(str(int(bool(not contents))))