import asyncio
import websockets
import base64
import json
from PIL import Image
import numpy as np
import tensorflow as tf
from io import BytesIO

# Load the saved model
model_dir = "/Volumes/Passport_HD/columbia-hack-2025/python_ws/american-sign-language-tensorflow2-american-sign-language-v1"
model = tf.saved_model.load(model_dir)

# Check the model's signatures and output names
print("Available signatures:", model.signatures.keys())
signature = model.signatures['serving_default']
print("Output names:", signature.structured_outputs)

# Function to preprocess image and make it compatible with the model input
def preprocess_image(image_data: bytes):
    # Load the image
    image = Image.open(BytesIO(image_data))
    
    # Convert to RGB (if not already in RGB)
    image = image.convert('RGB')

    # Resize the image to the required size for the model (224x224)
    image = image.resize((224, 224))

    # Convert the image to a numpy array and normalize it (if needed)
    image_np = np.array(image) / 255.0  # Normalize the image to [0, 1]
    
    # Add batch dimension (model expects a batch of images)
    image_np = np.expand_dims(image_np, axis=0)
    
    return image_np

# Function to classify the hand sign
def classify_hand_sign(image_bytes: bytes):
    # Preprocess the image
    image_np = preprocess_image(image_bytes)

    # Perform inference using the TensorFlow model
    predictions = model.signatures['serving_default'](tf.convert_to_tensor(image_np, dtype=tf.float32))

    # Access the output layer ('dense_1') which contains the probabilities for each class
    output = predictions['dense_1']
    
    # The output will be a vector of probabilities for each class (shape: [1, 29])
    predicted_class = np.argmax(output.numpy(), axis=1)  # Get the index of the max probability

    # List of labels for American Sign Language (A-Z, etc.)
    sign_language_labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Del', 'Ok', 'Please']

    # Map the predicted class index to a label
    predicted_label = sign_language_labels[predicted_class.item()]

    return predicted_label

# WebSocket handler for image processing
async def websocket_handler(websocket):
    try:
        async for message in websocket:
            print("Received message:", message)
            # Expecting a base64 encoded image
            data = json.loads(message)
            if 'image' in data:
                # Decode the base64 image data
                image_data = base64.b64decode(data['image'])

                # Classify the hand image using the TensorFlow model
                predicted_sign = classify_hand_sign(image_data)

                # Return the predicted sign language letter
                result = {'predicted_sign': predicted_sign}
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
