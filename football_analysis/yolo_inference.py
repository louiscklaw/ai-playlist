# import torch
# print(torch.cuda.is_available())


from ultralytics import YOLO 

# model = YOLO('yolov8x')
model = YOLO('models/best.pt')

results = model.predict('input_videos/08fd33_4.mp4',save=True)
print(results[0])
print('=====================================')
for box in results[0].boxes:
    print(box)