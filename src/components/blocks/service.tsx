import { useState } from "react";
import Axios from "axios"; // Import axios

interface ServiceProps {
  name: string;
  about: string;
  unit: string;
  value: string; // Changed value to string to allow empty input
  onChange: (value: string) => void;
}

const Service = (props: ServiceProps) => {
  return (
    <>
      <div className="bg-white p-3 shadow-md border border-gray-300 rounded-md flex flex-col items-center">
        <h3 className="text-xl font-bold">{props.name}</h3>
        <p className="text-gray-500">{props.about}</p>
        <span className="text-gray-400">
          <input
            type="number"
            className="w-[60px] p-2 mt-2 border-b border-gray-300"
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)} // Allow string value
          />{" "}
          {props.unit}
        </span>
      </div>
    </>
  );
};

const Services = () => {
  const [ph, setPh] = useState<string>(""); // Set initial value to an empty string
  const [waterTemp, setWaterTemp] = useState<string>(""); // Set initial value to an empty string
  const [turbidity, setTurbidity] = useState<string>(""); // Set initial value to an empty string
  const [doValue, setDoValue] = useState<string>(""); // Set initial value to an empty string
  const [tn, setTn] = useState<string>(""); // Set initial value to an empty string
  const [tp, setTp] = useState<string>(""); // Set initial value to an empty string

  const handleSubmit = async () => {
    // Convert input values to numbers before sending the data
    // const data = {
    //   pH: Number(ph),
    //   water_temp: Number(waterTemp),
    //   turbidity: Number(turbidity),
    //   DO: Number(doValue),
    //   TN: Number(tn),
    //   TP: Number(tp),
    // };
    Axios.post("http://localhost:3000/predict", {
      pH: Number(ph),
      water_temp: Number(waterTemp),
      turbidity: Number(turbidity),
      DO: Number(doValue),
      TN: Number(tn),
      TP: Number(tp),
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error calculating daily needs:", error);
      });
  };

  return (
    <>
      <section id="services" className="text-center">
        <h2 className="text-2xl font-bold p-3">Calculate your daily needs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto w-[80%]">
          <Service
            name="pH"
            about="Enter the pH Value"
            unit="pH"
            value={ph}
            onChange={setPh}
          />
          <Service
            name="Water Temperature"
            about="Enter the Water Temperature"
            unit="°C"
            value={waterTemp}
            onChange={setWaterTemp}
          />
          <Service
            name="Turbidity"
            about="Enter the Turbidity Value"
            unit="NTU"
            value={turbidity}
            onChange={setTurbidity}
          />
          <Service
            name="Dissolved Oxygen (DO)"
            about="Enter the Dissolved Oxygen value"
            unit="mg/l"
            value={doValue}
            onChange={setDoValue}
          />
          <Service
            name="Total Nitrogen (TN)"
            about="Enter the Total Nitrogen value"
            unit="mg/l"
            value={tn}
            onChange={setTn}
          />
          <Service
            name="Total Phosphorous (TP)"
            about="Enter the Total Phosphorous value"
            unit="mg/l"
            value={tp}
            onChange={setTp}
          />
        </div>

        <button
          className="bg-primary text-white p-2 px-4 rounded-md m-4"
          onClick={handleSubmit}
        >
          Calculate
        </button>
      </section>
    </>
  );
};

export default Services;
