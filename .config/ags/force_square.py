from PIL import Image, ImageDraw
import sys, os, shutil

if not os.path.exists('/home/n3rdium/.config/ags/square_cache/'):
    os.makedirs('/home/n3rdium/.config/ags/square_cache/')
# TODO: Periodically clear cache

filename = sys.argv[1].replace('file://', '')
file_base = os.path.basename(filename)
# As the file has no ext, copy it with ext
shutil.copy(filename, os.path.join('/home/n3rdium/.config/ags/square_cache/', file_base + '-modified.png'))
filename = os.path.join('/home/n3rdium/.config/ags/square_cache/', file_base + '-modified.png')
file_base = os.path.basename(filename)
im = Image.open(filename)
width, height = im.size   # Get dimensions

if im.width > im.height:
    left = (width - im.height)/2
    top = (height - im.height)/2
    right = (width + im.height)/2
    bottom = (height + im.height)/2
elif im.height > im.width:
    left = (width - im.width)/2
    top = (height - im.width)/2
    right = (width + im.width)/2
    bottom = (height + im.width)/2

# Crop the center of the image
im = im.crop((left, top, right, bottom))
if not im.mode in ('RGBA', 'LA'):
    im = im.convert('RGBA')  # Convert to RGBA mode if not already in that mode
width, height = im.size

# Add rounded corners with transparency
rounded_size = (width, height)  # Keep original size
mask = Image.new('L', rounded_size, 0)  # Create a grayscale mask
draw = ImageDraw.Draw(mask)

# Set corner radius
corner_radius = 16
draw.rounded_rectangle((0, 0, width, height), corner_radius, fill=255)  # Fill with white

# Apply mask to the image
im.putalpha(mask)

# Save to /home/n3rdium/.config/ags/square_cache/{img name}
im.save(os.path.join('/home/n3rdium/.config/ags/square_cache/', file_base))
print(os.path.join('/home/n3rdium/.config/ags/square_cache/', file_base))