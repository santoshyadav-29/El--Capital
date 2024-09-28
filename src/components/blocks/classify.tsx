import React, { useState } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import defaultImage from "../../assets/algal bloom.jpeg";

// Data for the different types of algae
interface AlgaeData {
  description: string;
  harmful_effects: string;
  recommendations: string;
}

const algaeClassificationData: Record<string, AlgaeData> = {
  "red-algae": {
    description: "Red algae, or Rhodophyta, are mostly marine algae known for their reddish color. They thrive in warm tropical waters and can often be found growing on coral reefs.",
    harmful_effects: "While not usually harmful, some species can produce toxins harmful to marine life and humans.",
    recommendations: "Monitor red algae growth and maintain water conditions to prevent overgrowth. Avoid consumption of unknown species.",
  },
  "blue-green-algae": {
    description: "Blue algae, or cyanobacteria, are bacteria that perform photosynthesis. They often appear blue-green and can grow quickly in nutrient-rich waters.",
    harmful_effects: "Cyanobacteria can produce toxins that are harmful to both aquatic life and humans. Exposure can lead to respiratory issues and skin irritation.",
    recommendations: "Avoid contact with water containing blue-green algae blooms. Reduce nutrient pollution by minimizing fertilizer runoff.",
  },
  "brown-algae": {
    description: "Green algae are a diverse group of algae found in both marine and freshwater environments. They are typically green due to their chlorophyll content.",
    harmful_effects: "Green algae blooms can reduce oxygen levels in water, harming aquatic life. Some species may produce toxins, though this is rare.",
    recommendations: "Control nutrient levels in water to prevent green algae overgrowth. Encourage the growth of beneficial aquatic plants.",
  },
};

const Classify = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>(defaultImage);
  const [classificationResult, setClassificationResult] = useState<string | null>(null);
  const [classificationImage, setClassificationImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [algaeData, setAlgaeData] = useState<AlgaeData | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
      setClassificationResult(null);
      setClassificationImage(null);
      setError(null);
    }
  };

  const handleImageSubmit = async () => {
    if (!selectedImage) {
      setError("Please select an image first!");
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", selectedImage);

    try {
      const response = await fetch(
        "https://02d0-110-34-13-5.ngrok-free.app/predict/",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong with the request.");
      }

      const result = await response.json();
      setClassificationImage(`data:image/png;base64,${result.image}`);
      setClassificationResult(result.detected_objects[0].label);
      setAlgaeData(algaeClassificationData[result.detected_objects[0].label]);
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("Failed to classify the image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
 
  

  

  

  return (
    <div id="classify" className="mx-auto w-[90%] flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl text-center font-bold p-3 mt-8">Algal Blooms and their Types</h1>
      <p className="text-lg text-center p-3 md:w-[80ch] text-gray-500">
        Algal blooms are the rapid growth of algae in water bodies. They are a natural part of the ecosystem, but when they grow out of control, they can have harmful effects on the environment and human health. There are several different types of algal blooms, each with its own characteristics and impacts.
      </p>
      <h2 className="text-2xl font-bold p-3">Classify Algal Bloom Types</h2>

      <div id="classify-main" className="flex flex-col gap-4 items-center">
        <div className="flex items-center justify-center gap-4">
          <label className="flex flex-col items-center justify-center w-[400px] h-[200px] border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 transition-all">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <div className="flex flex-col items-center justify-center">
              <p className="text-[100px] opacity-30">📷</p>
              <span className="text-gray-500">Drag and drop or click to upload</span>
            </div>
          </label>

          <div className="flex flex-col items-center">
            <img
              src={previewImage}
              alt="Selected Algal Bloom"
              className="w-[400px] h-[200px] object-cover rounded-md shadow-lg border-2 border-green-500"
            />
          </div>
        </div>
        <button
          onClick={handleImageSubmit}
          disabled={isLoading}
          className={`mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-all ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Classifying..." : "Classify Algal Bloom"}
        </button>
      </div>

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {classificationResult && (
        <div className="mt-6 bg-green-100 p-4 rounded-md shadow-md w-full max-w-2xl">
          <h3 className="text-lg font-bold">Classification Result:</h3>
          <p>
            <strong>Detected Object:</strong> {classificationResult}
          </p>
          {classificationImage && (
            <img
              src={classificationImage}
              alt="Classification Result"
              className="w-full max-w-md h-auto object-cover rounded-md shadow-lg mt-4 mx-auto"
            />
          )}
          {algaeData ? (
            <>
              <p className="mt-4">
                <strong>Description:</strong> {algaeData.description}
              </p>
              <p className="mt-4">
                <strong>Harmful Effects:</strong> {algaeData.harmful_effects}
              </p>
              <p className="mt-4">
                <strong>Recommendations:</strong> {algaeData.recommendations}
              </p>
            </>
          ) : (
            <p className="mt-4">No additional information available for this classification.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Classify;