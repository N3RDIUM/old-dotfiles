from uuid import uuid4
monitorkey = '/home/n3rdium/.config/ags/monitor_key'
with open(monitorkey, 'w') as f:
    f.write(str(uuid4()))