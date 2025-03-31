from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
import base64
import os
from ultralytics import YOLO

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load YOLO model
print("Loading model...")
try:
    model = YOLO("yolov8x.pt")    # Load a pretrained model
    print("Model loaded successfully!")
    # Print all available classes
    print("Available classes:", model.names)
except Exception as e:
    print(f"Error loading model: {str(e)}")
    model = None
    print("Using fallback mode - will return sample responses")

# COCO class mapping to waste types
coco_to_waste = {
    39: "plastic_bottle",  # bottle
    40: "glass_bottle",    # wine glass
    41: "glass_bottle",    # cup
    44: "plastic_bottle",  # bottle
    46: "food_waste",     # banana
    47: "food_waste",       #apple
    49: "food_waste",       # orange
    55: "food_waste",       # cake
    67: "electronic_waste", # cell phone
    72: "electronic_waste", # tv
    73: "electronic_waste", # laptop
    76: "electronic_waste", # keyboard
    77: "electronic_waste", # mouse
    84: "plastic_bottle",   # book (temporary mapping)
    86: "cardboard",       # cardboard box
    73: "books",           # book
}

# Database of waste items and their properties
waste_database = {
    "plastic_bottle": {
        "type": "Plastic Bottle",
        "disposalMethod": "Recycle in blue bin",
        "recyclability": 85
    },
    "food_waste": {
        "type": "Food Waste",
        "disposalMethod": "Compost in green bin",
        "recyclability": 100
    },
    "cardboard": {
        "type": "Cardboard",
        "disposalMethod": "Recycle in blue bin",
        "recyclability": 90
    },
    "glass_bottle": {
        "type": "Glass Bottle",
        "disposalMethod": "Recycle in blue bin",
        "recyclability": 95
    },
    "electronic_waste": {
        "type": "Electronic Waste",
        "disposalMethod": "Take to black dustbin (e-waste collection point)",
        "recyclability": 70
    },
    "books": {
        "type": "Books & Paper",
        "disposalMethod": "Compost in green bin",
        "recyclability": 100
    },
}

@app.route('/api/detect-waste', methods=['POST'])
def detect_waste():
    try:
        # Get base64 image from request
        image_data = request.json.get('image')
        if not image_data:
            return jsonify({"error": "No image provided"}), 400
        
        # Remove data URL prefix if present
        if 'base64,' in image_data:
            image_data = image_data.split('base64,')[1]
            
        # Decode base64 image
        image_bytes = base64.b64decode(image_data)
        np_arr = np.frombuffer(image_bytes, np.uint8)
        image = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
        
        if image is None:
            return jsonify({"error": "Invalid image data"}), 400
        
        # Perform detection with YOLO
        results = model(image)
        
        # Process detection results
        detections = []
        for result in results:
            boxes = result.boxes
            for box in boxes:
                # Get the class and confidence for each detection
                class_id = int(box.cls.item())
                confidence = float(box.conf.item())
                
                # Print debug information
                print(f"Detected class ID: {class_id}, Name: {model.names[class_id]}, Confidence: {confidence}")
                
                # Map COCO class to waste type
                if class_id in coco_to_waste:
                    waste_type = coco_to_waste[class_id]
                    waste_info = waste_database.get(waste_type, {
                        "type": "Unknown",
                        "disposalMethod": "Check local guidelines",
                        "recyclability": 50
                    })
                    
                    detections.append({
                        "waste_type": waste_type,
                        "confidence": confidence,
                        "original_class": model.names[class_id],  # Add original class name
                        **waste_info
                    })
                else:
                    print(f"Class ID {class_id} ({model.names[class_id]}) not mapped to any waste type")
        
        # If no detections, return "Found nothing"
        if not detections:
            print("No detections found in the image")
            return jsonify({
                "result": {
                    "type": "Found nothing",
                    "disposalMethod": "N/A",
                    "recyclability": 0
                },
                "message": "No waste detected in the image"
            })
        
        # Return the highest confidence detection
        best_detection = max(detections, key=lambda x: x["confidence"])
        print(f"Selected best detection: {best_detection}")
        return jsonify({
            "result": {
                "type": best_detection["type"],
                "disposalMethod": best_detection["disposalMethod"],
                "recyclability": best_detection["recyclability"],
                "original_class": best_detection.get("original_class", "unknown")  # Include original class
            },
            "confidence": best_detection["confidence"]
        })
    
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)