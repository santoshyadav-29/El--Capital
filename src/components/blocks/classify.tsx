import { useState } from "react";
import Axios from "axios";
import defaultImage from "../../assets/algal bloom.jpeg";

const Classify = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [classificationResult, setClassificationResult] = useState<
    string | null
  >(null);

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

    Axios.post("http://localhost:3000/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("Classification Result:", response.data);
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  return (
    <div id="classify" className="mx-auto w-[90%] flex flex-col items-center justify-center min-h-screen ">
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
      <div id="classify-main " className="flex flex-col gap-1  items-center">
        <div className="flex  items-center justify-center gap-4">
          <label className="flex flex-col items-center justify-center w-[400px] h-[200px] border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 transition-all">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden" // Hide the default file input
            />
            <div className="flex flex-col items-center justify-center">
              {/* <img
              src="/path/to/upload-icon.png" // Replace with your upload icon path
              alt="Upload Icon"
              className="w-12 h-12 mb-2" // Icon size
            /> */}
              <p className="text-[100px] opacity-30">📷</p>
              <span className="text-gray-500">
                Drag and drop or click to upload
              </span>
            </div>
          </label>

          {/* Display Image Preview */}
          {
            <div className="flex flex-col items-center">
              <img
                src={previewImage || defaultImage}
                alt="Selected Algal Bloom"
                className="w-[400px] h-[200px] object-cover rounded-md shadow-lg border-2 border-green-500"
              />
            </div>
          }
        </div>
        <button
          onClick={handleImageSubmit}
          className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-all"
        >
          Classify Algal Bloom
        </button>
      </div>

      {/* Display Classification Result */}
      {classificationResult && (
        <div className="mt-6 bg-green-100 p-4 rounded-md shadow-md">
          <h3 className="text-lg font-bold">Classification Result:</h3>
          <p>{classificationResult}</p>
        </div>
      )}
    </div>
  );
};

export default Classify;
