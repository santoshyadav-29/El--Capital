const express = require("express");
const multer = require("multer");
const fs = require("fs");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
const upload = multer({ dest: "uploads/" });

// Image upload and inference route
app.post("/upload", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const imagePath = req.file.path;

  try {
    // Read the image file
    const imageBuffer = fs.readFileSync(imagePath);

    // Simulate classification (replace with actual classification logic)
    const random = Math.floor(Math.random() * 3) + 1;
    const classificationResults = ["Red Tide", "Green Algae", "Blue-green Algae"][random - 1];

    // Clean up: remove the uploaded file
    fs.unlinkSync(imagePath);

    // Send the classification result back to the client
    res.json({ classification: classificationResults });
  } catch (error) {
    console.error("Error during classification:", error);
    // Clean up: remove the uploaded file even in case of error
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
    res.status(500).send("Error occurred while processing the image");
  }
});

// Prediction route
app.post("/predict", async (req, res) => {
  const { pH, water_temp, turbidity, DO, TN, TP } = req.body;

  // Validate input
  if (![pH, water_temp, turbidity, DO, TN, TP].every(param => typeof param === 'number')) {
    return res.status(400).send("Invalid input. All parameters must be numbers.");
  }

  const harmfulThresholds = {
    pH: 8.5,
    water_temp: 30,
    turbidity: 10,
    DO: 5,
    TN: 2,
    TP: 0.5,
  };

  const isHarmful =
    pH > harmfulThresholds.pH ||
    water_temp > harmfulThresholds.water_temp ||
    turbidity > harmfulThresholds.turbidity ||
    DO < harmfulThresholds.DO ||
    TN > harmfulThresholds.TN ||
    TP > harmfulThresholds.TP;

  const result = {
    isHarmful: isHarmful,
    message: isHarmful
      ? "Harmful algal bloom detected!"
      : "Algal bloom is not harmful.",
    details: {
      pH: { value: pH, threshold: harmfulThresholds.pH },
      water_temp: { value: water_temp, threshold: harmfulThresholds.water_temp },
      turbidity: { value: turbidity, threshold: harmfulThresholds.turbidity },
      DO: { value: DO, threshold: harmfulThresholds.DO },
      TN: { value: TN, threshold: harmfulThresholds.TN },
      TP: { value: TP, threshold: harmfulThresholds.TP },
    }
  };

  res.json(result);
});

app.get("/", (req, res) => {
  res.send("Algal Bloom Classification Server");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});