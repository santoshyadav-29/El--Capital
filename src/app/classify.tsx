import { useState } from "react";
import axios from "axios";

const Classify = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [classificationResult, setClassificationResult] = useState<string | null>(null);

  // Handle Image Selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      // Create a preview URL for the image
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Send Image to the Backend
  const handleImageSubmit = async () => {
    if (!selectedImage) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const response = await axios.post(
        "https://your-backend-url.com/classify", // Replace with your backend URL
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Assuming the backend sends back a classification result
      setClassificationResult(response.data.result);
    } catch (error) {
      console.error("Error classifying image:", error);
    }
  };

  return (
    <div className="mx-auto w-[90%] flex flex-col items-center justify-center min-h-screen ">
      <h1 className="text-4xl text-center font-bold p-3 mt-8 ">
        Algal Blooms and its types
      </h1>
      <p className="text-lg text-center p-3 md:w-[80ch] text-gray-500">
        Algal blooms are the rapid growth of algae in water bodies. They are a
        natural part of the ecosystem, but when they grow out of control, they
        can have harmful effects on the environment and human health. There are
        several different types of algal blooms, each with its own
        characteristics and impacts.
      </p>
      <h2 className="text-2xl font-bold p-3">Classify its types</h2>

      {/* Image Picker and Preview */}
      <div className="flex flex-col items-center space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="p-2 border border-gray-300 rounded-md"
        />

        {/* Display Image Preview */}
        {previewImage && (
          <div className="flex flex-col items-center">
            <img
              src={previewImage}
              alt="Selected Algal Bloom"
              className="w-[200px] h-[200px] object-cover rounded-md shadow-lg"
            />
            <button
              onClick={handleImageSubmit}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md"
            >
              Classify Algal Bloom
            </button>
          </div>
        )}

        {/* Display Classification Result */}
        {classificationResult && (
          <div className="mt-6 bg-green-100 p-4 rounded-md shadow-md">
            <h3 className="text-lg font-bold">Classification Result:</h3>
            <p>{classificationResult}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Classify;
