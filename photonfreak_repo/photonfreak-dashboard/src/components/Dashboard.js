// photonfreak-dashboard/src/components/Dashboard.js

import React, { useState } from "react";
import { predictBatterySOH, predictSolarOutput } from "../api";

const Dashboard = () => {
  // Battery input state
  const [batteryInput, setBatteryInput] = useState({
    voltage: "",
    current: "",
    cycles: "",
    temperature: ""
  });

  // Solar input state
  const [solarInput, setSolarInput] = useState({
    irradiance: "",
    temperature: ""
  });

  // Prediction outputs
  const [batterySOH, setBatterySOH] = useState(null);
  const [solarOutput, setSolarOutput] = useState(null);

  // Handle battery form change
  const handleBatteryChange = (e) => {
    setBatteryInput({ ...batteryInput, [e.target.name]: e.target.value });
  };

  // Handle solar form change
  const handleSolarChange = (e) => {
    setSolarInput({ ...solarInput, [e.target.name]: e.target.value });
  };

  // Predict battery SOH
  const handleBatteryPredict = async () => {
    const payload = {
      voltage: parseFloat(batteryInput.voltage),
      current: parseFloat(batteryInput.current),
      cycles: parseFloat(batteryInput.cycles),
      temperature: parseFloat(batteryInput.temperature)
    };
    try {
      const result = await predictBatterySOH(payload);
      setBatterySOH(result.battery_soh.toFixed(2));
    } catch (error) {
      alert("Battery prediction failed.");
    }
  };

  // Predict solar output
  const handleSolarPredict = async () => {
    const payload = {
      irradiance: solarInput.irradiance.split(',').map(Number),
      temperature: solarInput.temperature.split(',').map(Number)
    };
    try {
      const result = await predictSolarOutput(payload);
      setSolarOutput(result.solar_output_kWh.toFixed(2));
    } catch (error) {
      alert("Solar prediction failed.");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h2>Battery SOH Predictor</h2>
      <input name="voltage" placeholder="Voltage" onChange={handleBatteryChange} />
      <input name="current" placeholder="Current" onChange={handleBatteryChange} />
      <input name="cycles" placeholder="Charge Cycles" onChange={handleBatteryChange} />
      <input name="temperature" placeholder="Temperature" onChange={handleBatteryChange} />
      <button onClick={handleBatteryPredict}>Predict Battery SOH</button>
      {batterySOH && <p>Predicted Battery SOH: <strong>{batterySOH}%</strong></p>}

      <hr />

      <h2>Solar Output Predictor</h2>
      <input
        name="irradiance"
        placeholder="Irradiance (comma-separated)"
        onChange={handleSolarChange}
      />
      <input
        name="temperature"
        placeholder="Temperature (comma-separated)"
        onChange={handleSolarChange}
      />
      <button onClick={handleSolarPredict}>Predict Solar Output</button>
      {solarOutput && <p>Predicted Solar Output: <strong>{solarOutput} kWh</strong></p>}
    </div>
  );
};

export default Dashboard;
