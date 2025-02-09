import asyncio
import os
from groq import Groq
import websockets
import base64
import json
from PIL import Image
import numpy as np
from io import BytesIO
import mediapipe as mp

client = Groq(
    api_key="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",
)

possibilities = ""
# Initialize MediaPipe Hands
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(
    min_detection_confidence=0.5, 
    min_tracking_confidence=0.5,
    static_image_mode=True  # Ensures a consistent frame when processing images
)

# Function to detect hand and crop the image with padding
def detect_and_crop_hand(image_data: bytes, padding: int = 50):
    # Load the image
    image = Image.open(BytesIO(image_data)).convert('RGB')
    img_np = np.array(image)

    # Process the image to detect hands
    results = hands.process(img_np)

    if results.multi_hand_landmarks:
        # Get bounding box around the hand
        img_height, img_width, _ = img_np.shape
        hand_landmarks = results.multi_hand_landmarks[0]
        
        x_coords = [lm.x for lm in hand_landmarks.landmark]
        y_coords = [lm.y for lm in hand_landmarks.landmark]

        # Calculate bounding box coordinates
        xmin = max(int(min(x_coords) * img_width) - padding, 0)
        xmax = min(int(max(x_coords) * img_width) + padding, img_width)
        ymin = max(int(min(y_coords) * img_height) - padding, 0)
        ymax = min(int(max(y_coords) * img_height) + padding, img_height)

        # Crop the hand region with padding
        cropped_image = image.crop((xmin, ymin, xmax, ymax))
    else:
        # If no hand detected, use the full image
        cropped_image = image

    return cropped_image

# Function to preprocess image and make it compatible with the model input
def preprocess_image(image_data: bytes):
    # Detect and crop the hand with padding
    cropped_image = detect_and_crop_hand(image_data)

    # Resize the cropped image to the required size for the model (224x224)
    resized_image = cropped_image.resize((64, 64))
    # Convert the image to a numpy array and normalize it
    image_np = np.array(resized_image) / 255.0  # Normalize the image to [0, 1]
    
    # Add batch dimension (model expects a batch of images)
    image_np = np.expand_dims(image_np, axis=0)

    return image_np

# Function to classify the hand sign
def classify_hand_sign(image_bytes: bytes):
    completion = client.chat.completions.create(
    model="llama-3.2-90b-vision-preview",
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
"text": "Classify the sign language gesture based on ASL interpretation. Respond only with {possibilities} corresponding to the sign. If unsure, respond with 'UNSURE'. Do not provide any additional explanation or sentences."

                },
                {
                    "type": "image_url",
                    "image_url": {
                        "url": f"data:image/jpeg;base64,{image_bytes}",
                    }
                }
            ]
        }
    ],
    temperature=1,
    max_completion_tokens=1024,
    top_p=1,
    stream=False,
    stop=None,
)

    return completion.choices[0].message.content

# WebSocket handler for image processing
async def websocket_handler(websocket):
    try:
        async for message in websocket:

            # Expecting a base64 encoded image
            data = json.loads(message)
            if 'lookingFor' in data:
                possibilities = data['lookingFor']
            if 'image' in data:
                # Decode the base64 image data
                image_data = base64.b64decode(data['image'])

                # Detect and crop hand before classification
                # cropped_image = detect_and_crop_hand(image_data)
                # cropped_image = cropped_image.transpose(Image.FLIP_LEFT_RIGHT)
                # Convert the cropped image to base64
                # buffered = BytesIO()
                # cropped_image.save(buffered, format="PNG")
                # cropped_image_base64 = base64.b64encode(buffered.getvalue()).decode("utf-8")

                # Classify the hand image using the TensorFlow model
                predicted_sign = classify_hand_sign(data["image"])

                # Return both the predicted sign and processed image in base64 format
                result = {
                    'predicted_sign': predicted_sign,
                }
                print(result)
                await websocket.send(json.dumps(result))
    except Exception as e:
        print(f"Error: {e}")
    finally:
        print("Client disconnected")

# Start the WebSocket server
async def start_server():
    async with websockets.serve(websocket_handler, "localhost", 8000):
        print("WebSocket server started on ws://localhost:8000")
        await asyncio.Future()  # Keep the server running

# Run the event loop
if __name__ == "__main__":
    asyncio.run(start_server())
