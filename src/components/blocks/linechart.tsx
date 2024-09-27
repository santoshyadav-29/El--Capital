import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Define the props for the graph
interface AlgalBloomGraphProps {
  ph: number;
  waterTemp: number;
  turbidity: number;
  doValue: number;
  tn: number;
  tp: number;
}

// Function to determine if the algae is harmful based on given thresholds
const isHarmfulAlgae = (
  ph: number,
  waterTemp: number,
  turbidity: number,
  doValue: number,
  tn: number,
  tp: number
): boolean => {
  // Replace these with your actual thresholds
  return (
    ph < 6 ||
    ph > 9 || // pH threshold
    waterTemp > 30 || // Temperature threshold
    turbidity > 5 || // Turbidity threshold
    doValue < 3 || // DO threshold
    tn > 2 || // Total Nitrogen threshold
    tp > 0.5 // Total Phosphorus threshold
  );
};

const AlgalBloomGraph: React.FC<AlgalBloomGraphProps> = ({
  ph,
  waterTemp,
  turbidity,
  doValue,
  tn,
  tp,
}) => {
  const dataPoints = [
    { label: "pH", value: ph },
    { label: "Water Temperature", value: waterTemp },
    { label: "Turbidity", value: turbidity },
    { label: "Dissolved Oxygen", value: doValue },
    { label: "Total Nitrogen", value: tn },
    { label: "Total Phosphorus", value: tp },
  ];

  // Check if harmful algae are present
  const harmfulAlgae = isHarmfulAlgae(
    ph,
    waterTemp,
    turbidity,
    doValue,
    tn,
    tp
  );

  // Prepare data for the line chart
  const chartData = {
    labels: dataPoints.map((point) => point.label),
    datasets: [
      {
        label: "Parameter Values",
        data: dataPoints.map((point) => point.value),
        fill: true,
        backgroundColor: harmfulAlgae
          ? "rgba(255, 99, 132, 0.2)"
          : "rgba(75, 192, 192, 0.2)",
        borderColor: harmfulAlgae
          ? "rgba(255, 99, 132, 1)"
          : "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        pointBackgroundColor: "#fff",
      },
    ],
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4  flex flex-col items-center justify-center ">
      <h2 className="text-xl font-bold mb-4 ">Algal Bloom Prediction</h2>
      <div className=" w-[800px]">
        <Line data={chartData} />
      </div>

      <p className="mt-4 text-3xl text-center">
        {harmfulAlgae ? "Harmful Algae Detected" : "Non-Harmful Algae"}
      </p>
    </div>
  );
};

export default AlgalBloomGraph;
