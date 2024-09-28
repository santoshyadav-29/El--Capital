import requests
from PIL import Image, ImageDraw, ImageFont
import io
import base64
import matplotlib.pyplot as plt

# The FastAPI endpoint URL
url = "https://02d0-110-34-13-5.ngrok-free.app/predict/"

# Path to the image you want to test with
image_path = "60.jpeg"

# Open and read the image file
with open(image_path, "rb") as img_file:
    image_bytes = img_file.read()

# Send a POST request to FastAPI with the image file
response = requests.post(url, files={"file": image_bytes})

# Check if the request was successful
if response.status_code == 200:
    # Get the base64 image from the response
    data = response.json()
    img_base64 = data["image"]

    # Print the detected classes (only object labels, without coordinates)
    if "detected_objects" in data:
        detected_objects = data["detected_objects"]
        object_classes = [obj['label'] for obj in detected_objects]
        print("Detected Objects and Classes:", object_classes)

    # Decode the base64 string back into an image
    img_data = base64.b64decode(img_base64)
    img = Image.open(io.BytesIO(img_data))

    # Draw the labels on the image more clearly by improving visibility
    draw = ImageDraw.Draw(img)
    font = ImageFont.load_default()

    # Assuming the labels are included in the FastAPI response as `detected_objects`
    for obj in detected_objects:
        # Get the bounding box coordinates and the class label
        label = obj['label']
        box = obj['box']  # Assuming it returns [x1, y1, x2, y2]

        x1, y1, x2, y2 = box
        # Draw bounding box with improved color visibility
        draw.rectangle([x1, y1, x2, y2], outline="red", width=2)

        # Get the size of the text using textbbox instead of textsize
        text_bbox = draw.textbbox((x1, y1), label, font=font)

        # Draw a black rectangle behind the text for better readability
        draw.rectangle([text_bbox[0], text_bbox[1], text_bbox[2], text_bbox[3]], fill="black")

        # Draw the text label in white over the black background
        draw.text((x1, y1), label, fill="white", font=font)

    # Display the image using matplotlib
    plt.imshow(img)
    plt.axis('off')  # Turn off axis labels
    plt.show()

else:
    print(f"Error: {response.status_code} - {response.text}")
