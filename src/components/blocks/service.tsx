import React, { useState } from "react";
import axios from "axios";
import { AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import lightImg from "../../assets/light.png";
import nitrateImg from "../../assets/nitrate.png";
import ironImg from "../../assets/iron.png";
import phosphateImg from "../../assets/phosphate.png";
import carbonImg from "../../assets/carbon.png";
import temperatureImg from "../../assets/temp.png";
import phImg from "../../assets/ph.webp";

interface ServiceProps {
  name: string;
  about: string;
  unit: string;
  value: string;
  img?: string;
  onChange: (value: string) => void;
}

const Service: React.FC<ServiceProps> = (props) => {
  return (
    <div className="bg-white p-3 shadow-md border border-gray-300 rounded-md flex flex-col items-center">
      {props.img && <img className="w-[50px]" src={props.img} alt="" />}
      <h3 className="text-xl font-bold">{props.name}</h3>
      <p className="text-gray-500">{props.about}</p>
      <span className="text-gray-400">
        <input
          type="number"
          className="w-[60px] p-2 mt-2 border-b border-gray-300"
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
        />{" "}
        {props.unit}
      </span>
    </div>
  );
};

const Services: React.FC = () => {
  const [light, setLight] = useState<string>("");
  const [nitrate, setNitrate] = useState<string>("");
  const [iron, setIron] = useState<string>("");
  const [phosphate, setPhosphate] = useState<string>("");
  const [temperature, setTemperature] = useState<string>("");
  const [ph, setPh] = useState<string>("");
  const [co2, setCo2] = useState<string>("");

  const [algaePopulation, setAlgaePopulation] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputHistory, setInputHistory] = useState<Array<any>>([]);

  const validateInputs = (): boolean => {
    const inputs = [light, nitrate, iron, phosphate, temperature, ph, co2];
    return inputs.every((input) => input.trim() !== "");
  };

  const handleSubmit = async () => {
    if (!validateInputs()) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "https://sushanadhikari-algae-bloom-prediction.hf.space/predict",
        {
          Light: Number(light),
          Nitrate: Number(nitrate),
          Iron: Number(iron),
          Phosphate: Number(phosphate),
          Temperature: Number(temperature),
          pH: Number(ph),
          CO2: Number(co2),
        }
      );
      setAlgaePopulation(response.data.predicted_population);
      
      // Update input history
      setInputHistory(prevHistory => [
        ...prevHistory,
        {
          Light: Number(light),
          Nitrate: Number(nitrate),
          Iron: Number(iron),
          Phosphate: Number(phosphate),
          Temperature: Number(temperature),
          pH: Number(ph),
          CO2: Number(co2),
        }
      ]);

    } catch (error) {
      setError("Error calculating prediction. Please try again.");
      console.error("Error calculating prediction:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getAlertVariant = (population: number) => {
    if (population > 100) return "destructive";
    if (population > 80) return "warning";
    return "default";
  };

  const getAlertTitle = (population: number) => {
    if (population > 100) return "Dangerous Algae Levels";
    if (population > 80) return "High Algae Levels";
    return "Safe Algae Levels";
  };

  const getAlertDescription = (population: number) => {
    if (population > 100)
      return "The algae population has exceeded safe levels. Immediate action is required.";
    if (population > 80)
      return "The algae population is approaching dangerous levels. Monitor closely and consider preventive measures.";
    return "The algae population is within safe levels.";
  };

  const chartData =
    algaePopulation !== null
      ? [
          {
            name: "Algae Population",
            value: algaePopulation,
            fill: algaePopulation > 100 ? "#ef4444" : "#22c55e",
          },
        ]
      : [];

  return (
    <section id="services" className="text-center">
      <h2 className="text-2xl font-bold p-3">Predict Algae Bloom</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto w-[80%]">
        <Service
          name="Light"
          about="Enter the Light Intensity"
          unit="Lux"
          value={light}
          img={lightImg}
          onChange={setLight}
        />
        <Service
          name="Nitrate"
          about="Enter the Nitrate Concentration"
          unit="mg/l"
          value={nitrate}
          img={nitrateImg}
          onChange={setNitrate}
        />
        <Service
          name="Iron"
          about="Enter the Iron Concentration"
          unit="mg/l"
          value={iron}
          img={ironImg}
          onChange={setIron}
        />
        <Service
          name="Phosphate"
          about="Enter the Phosphate Concentration"
          unit="mg/l"
          value={phosphate}
          img={phosphateImg}
          onChange={setPhosphate}
        />
        <Service
          name="Temperature"
          about="Enter the Water Temperature"
          unit="°C"
          value={temperature}
          img={temperatureImg}
          onChange={setTemperature}
        />
        <Service
          name="pH"
          about="Enter the pH Level"
          unit="pH"
          value={ph}
          img={phImg}
          onChange={setPh}
        />
        <Service
          name="CO2"
          about="Enter the CO2 Concentration"
          unit="mg/l"
          value={co2}
          img={carbonImg}
          onChange={setCo2}
        />
      </div>

      <button
        className="bg-blue-500 text-white p-2 px-4 rounded-md m-4 hover:bg-blue-600 transition-colors disabled:bg-gray-400"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? "Predicting..." : "Predict"}
      </button>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {algaePopulation !== null && (
        <div className="mt-8">
          <Alert variant={getAlertVariant(algaePopulation)}>
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>{getAlertTitle(algaePopulation)}</AlertTitle>
            <AlertDescription>
              {getAlertDescription(algaePopulation)}
              <br />
              Predicted Algae Population: {algaePopulation.toFixed(2)}
            </AlertDescription>
          </Alert>

          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <h3 className="text-xl font-bold mt-8 mb-4">Input Parameters History</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={inputHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="index" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Light" stroke="#8884d8" />
                <Line type="monotone" dataKey="Nitrate" stroke="#82ca9d" />
                <Line type="monotone" dataKey="Iron" stroke="#ffc658" />
                <Line type="monotone" dataKey="Phosphate" stroke="#ff7300" />
                <Line type="monotone" dataKey="Temperature" stroke="#d0ed57" />
                <Line type="monotone" dataKey="pH" stroke="#8dd1e1" />
                <Line type="monotone" dataKey="CO2" stroke="#a4de6c" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;