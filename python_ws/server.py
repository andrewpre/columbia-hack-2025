import asyncio
import websockets
import base64
import json
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from PIL import Image
import numpy as np
import mediapipe as mp
from io import BytesIO

# Initialize MediaPipe hand detection
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(min_detection_confidence=0.5, min_tracking_confidence=0.5)

# FastAPI app
app = FastAPI()

# Function to process the image and extract the hand
def extract_hand_from_image(image_data: bytes) -> bytes:
    # Load the image
    image = Image.open(BytesIO(image_data))
    
    # Convert image to RGB (MediaPipe needs RGB)
    image_rgb = np.array(image.convert('RGB'))
    
    # Process the image to detect hands
    results = hands.process(image_rgb)

    if results.multi_hand_landmarks:
        for landmarks in results.multi_hand_landmarks:
            # Get the bounding box for the hand (from landmarks)
            min_x = min([landmark.x for landmark in landmarks.landmark])
            max_x = max([landmark.x for landmark in landmarks.landmark])
            min_y = min([landmark.y for landmark in landmarks.landmark])
            max_y = max([landmark.y for landmark in landmarks.landmark])

            # Convert the normalized coordinates to pixel values
            width, height = image.size
            min_x_pixel = int(min_x * width)
            max_x_pixel = int(max_x * width)
            min_y_pixel = int(min_y * height)
            max_y_pixel = int(max_y * height)

            # Crop the hand region from the image
            hand_image = image.crop((min_x_pixel, min_y_pixel, max_x_pixel, max_y_pixel))

            # Resize the cropped image to 30x30px
            hand_image_resized = hand_image.resize((30, 30))

            # Save the image as a byte array
            byte_io = BytesIO()
            hand_image_resized.save(byte_io, format="PNG")
            return byte_io.getvalue()
    
    return None  # Return None if no hand is detected


# WebSocket handler for image processing
async def websocket_handler(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            message = await websocket.receive_text()
            print("Received message:", message)
            # Expecting a base64 encoded image
            data = json.loads(message)
            if 'image' in data:
                # Decode the base64 image data
                image_data = base64.b64decode(data['image'])

                # Extract the hand from the image and resize it
                hand_image_bytes = extract_hand_from_image(image_data)

                if hand_image_bytes:
                    # Return the hand image as a base64 encoded PNG
                    hand_image_base64 = base64.b64encode(hand_image_bytes).decode('utf-8')
                    result = {'hand_image': hand_image_base64}
                else:
                    result = {'error': 'No hand detected in the image.'}

                # Send the result back to the client
                await websocket.send_text(json.dumps(result))
    except WebSocketDisconnect:
        print("Client disconnected")


# FastAPI route to start the WebSocket server
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket_handler(websocket)


# Run the FastAPI app with uvicorn
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)
