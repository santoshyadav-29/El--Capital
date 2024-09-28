const express = require("express");
const multer = require("multer");
const fs = require("fs");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json
const upload = multer({ dest: "uploads/" });

// Roboflow API details
const ROBOFLOW_API_URL = "https://detect.roboflow.com"; // Base URL
const API_KEY = "YoG4SVJnZZJMD9xWywUA"; // Replace with your Roboflow API key
const MODEL_ID = "multiple-fish-disease/3"; // Replace with your model ID

// Image upload and inference route
app.post("/upload", upload.single("image"), async (req, res) => {
  const imagePath = req.file.path;

  try {
    // Read the image file (you can process the image if needed)
    const imageBuffer = fs.readFileSync(imagePath);

    // Send the image to Roboflow for inference
    const response = await axios.post(
      `${ROBOFLOW_API_URL}/${MODEL_ID}`,
      imageBuffer,
      {
        headers: {
          "Content-Type": "application/octet-stream",
          Authorization: `Bearer ${API_KEY}`, // Add the authorization header
        },
      }
    );

    // Clean up: remove the uploaded file
    fs.unlinkSync(imagePath);

    // Send the inference result back to the client
    res.json(response.data);
  } catch (error) {
    console.error("Error during inference:", error);
    // Clean up: remove the uploaded file even in case of error
    fs.unlinkSync(imagePath);
    res.status(500).send("Error occurred while processing the image");
  }
});

// Prediction route
app.post("/predict", async (req, res) => {
  // Extract chemical parameters from the request body
  const { pH, water_temp, turbidity, DO, TN, TP } = req.body;

  // Example logic for prediction (you can replace this with your actual logic)
  const harmfulThresholds = {
    pH: 8.5, // Example threshold for pH
    water_temp: 30, // Example threshold for temperature in °C
    turbidity: 10, // Example threshold for turbidity in NTU
    DO: 5, // Example threshold for Dissolved Oxygen in mg/l
    TN: 2, // Example threshold for Total Nitrogen in mg/l
    TP: 0.5, // Example threshold for Total Phosphorous in mg/l
  };

  // Simple prediction logic
  const isHarmful =
    pH > harmfulThresholds.pH ||
    water_temp > harmfulThresholds.water_temp ||
    turbidity > harmfulThresholds.turbidity ||
    DO < harmfulThresholds.DO ||
    TN > harmfulThresholds.TN ||
    TP > harmfulThresholds.TP;

  // Response object
  const result = {
    isHarmful: isHarmful,
    message: isHarmful
      ? "Harmful algal bloom detected!"
      : "Algal bloom is not harmful.",
  };

  // Send the result back to the client
  res.json(result);
});

// Default route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
