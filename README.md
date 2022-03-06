# VQA- Automate Video Quality Assessment

**Business Problem:**

Currently, testers sit in front of TV watching several videos and asses the video quality. This is painful, cumbursome, time consuming, ineffective approach and sometime erroneous way of assessment.

**Abstract:**

A video is nothing but a collection of images, and our approach is to extract these images or frames from the TV video and use an implementation of image assessment to
collect the scores for each of the frames. The mean-standard deviation of these scores will be the quantitative score or an approximate value representing the video quality.

**Goals:**

Elimination of Human intervention in long-time streaming to access quality thereby helping testers to focus on the productive tasks. Perhaps, these testers are the only people in the world who doesn't want to watch TV after they return back home :)
Identification of possible distortions beyond human judgement
Run anywhere Web application
Can be integrated with live streaming feed

**Vital factors that drives the image quality assessment are:**

Compression artifacts / Noise / Blur / Color Artifacts
   
**Solution Approach:**

Videos are captured using a camera and match the framerates of the camera and TV
Uploaded videos are then processed into a staging area
Detect and extract key frames as images using FFmpeg
Then assess each image using Nueral Image Assessment framework using trained dataset (CNN) from ImageNet. Once assessed, each image is classified and scored based on the weights.

**Datasets used:**

NIMA model for image quality assessment
Aesthetic Visual Analysis(AVA): 255K images rated by professional photographers
Tampere Image Database(TID): 3K images curated for evaluating perceptual image quality
LIVE in the wild Image Quality Challenge Database: 1.16 K images captured by mobile

**GUI Application Screenshots:**


![vqa_1](https://user-images.githubusercontent.com/4612047/156910901-c59e9f51-d7d2-47ab-b773-f4dfd5f3ba57.PNG)


![image](https://user-images.githubusercontent.com/4612047/156910894-553c9c23-3226-4235-81cd-3ad835135caa.png)
