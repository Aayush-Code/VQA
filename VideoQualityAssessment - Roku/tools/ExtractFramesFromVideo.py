import sys
import cv2
import numpy as np
import argparse


def FramesExtract(video_path, filename, savepath):
  p_frame_thresh = 0
  cap = cv2.VideoCapture(video_path)
  ret, prev_frame = cap.read()
  count = 0
  while ret:
    ret, curr_frame = cap.read()
    if ret:
      count += 1
      diff = cv2.absdiff(curr_frame, prev_frame)
      non_zero_count = np.count_nonzero(diff)
      if non_zero_count > p_frame_thresh:
        if count % 25 == 0:
          cv2.imwrite(savepath + "/" + filename + "-" + str(count) + ".png", curr_frame)
          print(savepath + "/" + filename + "-" + str(count) + ".png")
          sys.stdout.flush()
      prev_frame = curr_frame


parser = argparse.ArgumentParser()
parser.add_argument('-vid', type=str, default=None, help='Pass the path of the video to extract frames')
parser.add_argument('-dir', type=str, default=None, help='Pass the path where frames will be saved')
args = parser.parse_args()

if args.vid is not None:
  vidPath = args.vid
if args.dir is not None:
  saveDir = args.dir
else:
  raise RuntimeError('-vid arguments must be passed')

temp = vidPath.split("/")
filename = temp[-1:][0]
FramesExtract(vidPath, filename, saveDir)
