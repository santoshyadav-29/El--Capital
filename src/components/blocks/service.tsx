import { useState } from "react";
import axios from "axios"; // Import axios

interface ServiceProps {
  name: string;
  about: string;
  unit: string;
  value: number;
  onChange: (value: number) => void;
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
            onChange={(e) => props.onChange(Number(e.target.value))}
          />{" "}
          {props.unit}
        </span>
      </div>
    </>
  );
};

const Services = () => {
  const [ph, setPh] = useState<number>(0);
  const [waterTemp, setWaterTemp] = useState<number>(0); // Changed variable name to match parameter
  const [turbidity, setTurbidity] = useState<number>(0);
  const [doValue, setDoValue] = useState<number>(0); // Changed variable name to match parameter
  const [tn, setTn] = useState<number>(0); // Changed variable name to match parameter
  const [tp, setTp] = useState<number>(0); // Changed variable name to match parameter

  const handleSubmit = async () => {
    const data = {
      pH: ph,
      water_temp: waterTemp,
      turbidity,
      DO: doValue,
      TN: tn,
      TP: tp,
    };

    try {
      // Use axios to send the POST request
      const response = await axios.post(
        "https://c179-110-34-13-5.ngrok-free.app/predict/",
        data, // Axios automatically stringifies the data for you
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const result = response.data;
        console.log("Success:", result);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
