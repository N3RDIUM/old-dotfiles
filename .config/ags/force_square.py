from PIL import Image
import sys, os, shutil

if not os.path.exists('/home/n3rdium/.config/ags/square_cache/'):
    os.makedirs('/home/n3rdium/.config/ags/square_cache/')

filename = sys.argv[1]
file_base = os.path.basename(filename)
# As the file has no ext, copy it with ext
shutil.copy(filename, os.path.join('/home/n3rdium/.config/ags/square_cache/', file_base + '.png'))
filename = os.path.join('/home/n3rdium/.config/ags/square_cache/', file_base + '.png')
file_base = os.path.basename(filename)
im = Image.open(filename)
width, height = im.size   # Get dimensions

left = (width - im.height)/2
top = (height - im.height)/2
right = (width + im.height)/2
bottom = (height + im.height)/2

# Crop the center of the image
im = im.crop((left, top, right, bottom))

# Save to /home/n3rdium/.config/ags/square_cache/{img name}
im.save(os.path.join('/home/n3rdium/.config/ags/square_cache/', file_base))
print(os.path.join('/home/n3rdium/.config/ags/square_cache/', file_base))