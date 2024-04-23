# Football Analysis Project

[https://www.youtube.com/watch?v=neBZ6huolkg](https://www.youtube.com/watch?v=neBZ6huolkg)

In this video, you'll learn how to use machine learning, computer vision and deep learning to create a football analysis system. This project utilizes YOlO a state of the art object detector to detect the players, referees and footballs. It also utilizes trackers to track those object across frames. We also train our own object detector to enhance the output of the state-of-the-art models. Additionally, we will assign players to teams based on the colors of their t-shirts using Kmeans for pixel segmentation and clustering. We will also use optical flow to measure camera movement between frames, enabling us to accurately measure a player's movement. Furthermore, we will implement perspective transformation to represent the scene's depth and perspective, allowing us to measure a player's movement in meters rather than pixels. Finally, we will calculate a player's speed and the distance covered. This project covers various concepts and addresses real-world problems, making it suitable for both beginners and experienced machine learning engineers.

In this video you will learn how to:

1. Use ultralytics and YOLOv8 to detect objects in images and videos.
2. Fine tune and train your own YOLO on your own custom dataset.
3. Use KMeans to cluster pixles and segment players from the background to get the t-shirt color accurately.
4. Use optical flow to measure the camera movement.
5. Use CV2's (opencv) perspective transformation to represent the scene's depth and perspective.
6. Measure player's speed and distance covered in the image.

Datasets:
kaggle Dataset: https://www.kaggle.com/competitions/d...
Robowflow Football Dataset: https://universe.roboflow.com/roboflo...

Github Link: https://github.com/abdullahtarek/foot...

# 🔑 TIMESTAMPS

0:00 - Introduction
1:19 - Object detection (YOLO) and tracking
1:55:30 - Player color assignment
2:32:00 - Ball interpolation
3:06:25 - Camera movement estimator
3:41:50 - Perspective Transformer
4:05:40 - Speed and distance Estimator

## Introduction

The goal of this project is to detect and track players, referees, and footballs in a video using YOLO, one of the best AI object detection models available. We will also train the model to improve its performance. Additionally, we will assign players to teams based on the colors of their t-shirts using Kmeans for pixel segmentation and clustering. With this information, we can measure a team's ball acquisition percentage in a match. We will also use optical flow to measure camera movement between frames, enabling us to accurately measure a player's movement. Furthermore, we will implement perspective transformation to represent the scene's depth and perspective, allowing us to measure a player's movement in meters rather than pixels. Finally, we will calculate a player's speed and the distance covered. This project covers various concepts and addresses real-world problems, making it suitable for both beginners and experienced machine learning engineers.

![Screenshot](output_videos/screenshot.png)

## Modules Used

The following modules are used in this project:

- YOLO: AI object detection model
- Kmeans: Pixel segmentation and clustering to detect t-shirt color
- Optical Flow: Measure camera movement
- Perspective Transformation: Represent scene depth and perspective
- Speed and distance calculation per player

## Trained Models

- [Trained Yolo v5](https://drive.google.com/file/d/1DC2kCygbBWUKheQ_9cFziCsYVSRw6axK/view?usp=sharing)

## Sample video

- [Sample input video](https://drive.google.com/file/d/1t6agoqggZKx6thamUuPAIdN_1zR9v9S_/view?usp=sharing)

## Requirements

To run this project, you need to have the following requirements installed:

- Python 3.x
- ultralytics
- supervision
- OpenCV
- NumPy
- Matplotlib
- Pandas
