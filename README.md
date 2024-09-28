import React, { useState } from 'react';

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [detectionResult, setDetectionResult] = useState(null);

  // Handle file input change
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Handle file upload (POST request)
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("https://your-ngrok-url.ngrok-free.app/predict/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Something went wrong.");
      }

      const result = await response.json();
      setDetectionResult(result);
      console.log(result);

    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <h1>Upload Image for Detection</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Image</button>

      {detectionResult && (
        <div>
          <h3>Detection Result:</h3>
          <pre>{JSON.stringify(detectionResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;