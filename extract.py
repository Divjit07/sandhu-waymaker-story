import cv2
import os

video_path = 'Product_explosion_view_202604061646.mp4'
output_dir = 'public/frames'

print("Clearing old frames...")
if not os.path.exists(output_dir):
    os.makedirs(output_dir)
else:
    for f in os.listdir(output_dir):
        if f.endswith('.jpg'):
            os.remove(os.path.join(output_dir, f))

print(f"Opening {video_path}...")
cap = cv2.VideoCapture(video_path)
count = 0

while True:
    ret, frame = cap.read()
    if not ret:
        break
    count += 1
    # Save as high-quality JPEG
    frame_name = os.path.join(output_dir, f'frame-{count:03d}.jpg')
    cv2.imwrite(frame_name, frame, [int(cv2.IMWRITE_JPEG_QUALITY), 95])

print(f"Extracted {count} frames.")
cap.release()

# Update the useScrollProgress.ts file to match the newly extracted total frames count
ts_file = r'src/hooks/useScrollProgress.ts'
with open(ts_file, 'r') as f:
    content = f.read()

import re
new_content = re.sub(r'const TOTAL_FRAMES = \d+;', f'const TOTAL_FRAMES = {count};', content)

with open(ts_file, 'w') as f:
    f.write(new_content)

print("Updated TOTAL_FRAMES to", count)
