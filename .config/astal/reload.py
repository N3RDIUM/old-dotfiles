import os

os.system("killall gjs")
os.chdir(os.path.dirname(__file__))
os.system("npm run build && gjs -m dist/main.js")
