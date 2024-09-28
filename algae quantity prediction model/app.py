# app.py
from fastapi import FastAPI, Request
from pydantic import BaseModel
import pickle
import numpy as np
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS for all origins, methods, and headers to avoid CORS issues when making requests from React, Axios, etc.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Load the trained model
with open('best_model.pkl', 'rb') as f:
    model = pickle.load(f)

# Input schema for FastAPI
class AlgaeInput(BaseModel):
    Light: float
    Nitrate: float
    Iron: float
    Phosphate: float
    Temperature: float
    pH: float
    CO2: float

# Root endpoint to check if the API is running
@app.get("/")
def greet_json():
    return {"Hello": "World!, the prediction is at /predict"}

# Prediction endpoint to accept input data and return the predicted algae quantity
@app.post("/predict")
async def predict_algae(input_data: AlgaeInput):
    try:
        # Convert input data to the correct format
        input_array = np.array([[input_data.Light, input_data.Nitrate, input_data.Iron,
                                 input_data.Phosphate, input_data.Temperature,
                                 input_data.pH, input_data.CO2]])
        
        # Perform prediction
        prediction = model.predict(input_array)
        
        # Return the prediction as a JSON response
        return {"predicted_population": prediction[0]}
    except Exception as e:
        # Return an error message if prediction fails
        return {"error": str(e)}
