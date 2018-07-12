import os
import cv2
import numpy as np
from path import Path
import argparse
import argparse as arg
from natsort import natsorted, ns


def FramesExtract(video_path, VideoDir, filename):
    p_frame_thresh = 0
    cap = cv2.VideoCapture(video_path)
    totalFrames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    ret, prev_frame = cap.read()
    # f = open(VideoDir+"\\"+"progress.txt", "w+")
    count = 0
    percentage=0
    while ret:
        ret, curr_frame = cap.read()
        if ret:
            count += 1
            diff = cv2.absdiff(curr_frame, prev_frame)
            non_zero_count = np.count_nonzero(diff)
            if non_zero_count > p_frame_thresh:
                if count % 25 == 0:
                    percentage=int((count/totalFrames)*100)
                    cv2.imwrite(VideoDir+"\\" + filename + "-" + str(count) + ".png",curr_frame)
                    print(percentage)
                    # f.writelines(str(percentage)+"\n")
            prev_frame = curr_frame
    # f.close()
    print("100")


parser = argparse.ArgumentParser()
parser.add_argument('-vid', type=str, default=None, help='Pass the path of the video to extract frames')
args = parser.parse_args()

if args.vid is not None:
    vidPath = args.vid
else:
    raise RuntimeError('-vid arguments must be passed')

temp = vidPath.split("\\")
VideoDir = "\\".join(temp[0:len(temp)-1])
filename = temp[-1:][0]
FramesExtract(vidPath, VideoDir, filename)
