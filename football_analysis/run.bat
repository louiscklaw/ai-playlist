
@REM need to check if cuda version 12 installed 
@REM install pytorch
@REM pip3 uninstall torch torchvision torchaudio
@REM pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121

@REM install sklearn
@REM pip install -U scikit-learn

@REM python ./yolo_inference.py

python ./main.py
@REM mv ".\output_videos\output_video.avi" ".\output_videos\output_video_2.avi"

@REM python ./main.py
@REM mv ".\output_videos\output_video.avi" ".\output_videos\output_video_3.avi"

@REM python ./main.py
@REM mv ".\output_videos\output_video.avi" ".\output_videos\output_video_4.avi"

@REM python ./main.py
@REM mv ".\output_videos\output_video.avi" ".\output_videos\output_video_5.avi"



echo "done"
