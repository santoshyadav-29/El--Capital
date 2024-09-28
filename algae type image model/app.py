from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io
import torch
import numpy as np
import cv2
from ultralytics import YOLO
import base64

# Initialize FastAPI app
app = FastAPI()

# CORS settings
origins = [
    "http://localhost:3000",  # Allow your frontend origin (adjust port if needed)
    "http://127.0.0.1:3000",
    # Add any other domains you want to allow, or use "*" for all domains (but not recommended for production)
]

# Add CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to your frontend URL for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load your YOLOv8 model
model = YOLO("best_yolov8m_model.pt")

# Helper function to draw bounding boxes on the image
def draw_boxes(image, results):
    img = np.array(image)
    for result in results:
        for box, cls_id in zip(result.boxes.xyxy, result.boxes.cls):
            x1, y1, x2, y2 = map(int, box)
            cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)  # Draw bounding box
            label = result.names[int(cls_id)]
            cv2.putText(img, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255, 0, 0), 2)  # Label
    return Image.fromarray(img)

# Route to accept images for prediction
@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    # Load the image
    image_bytes = await file.read()
    img = Image.open(io.BytesIO(image_bytes))
    
    # Perform YOLOv8 inference
    results = model(img)
    
    detected_objects = []
    for result in results:
        for box, cls_id in zip(result.boxes.xyxy, result.boxes.cls):
            x1, y1, x2, y2 = map(int, box)
            label = result.names[int(cls_id)]
            detected_objects.append({
                "label": label,
                "box": [x1, y1, x2, y2]
            })
    
    # Draw bounding boxes on the image
    img_with_boxes = draw_boxes(img, results)
    
    # Convert image to bytes for response
    img_byte_arr = io.BytesIO()
    img_with_boxes.save(img_byte_arr, format='PNG')
    img_byte_arr = img_byte_arr.getvalue()

    # Encode image to base64
    img_base64 = base64.b64encode(img_byte_arr).decode('utf-8')

    return {"image": img_base64, "detected_objects": detected_objects}


# Run with: uvicorn app:app --reload
