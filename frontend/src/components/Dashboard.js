import React, { useState } from "react";
import { predictSolar, predictBattery } from "./api";
import "./Dashboard.css"; // Add this line to use external CSS

function Dashboard() {
  const [irradiance, setIrradiance] = useState("");
  const [temperature, setTemperature] = useState("");
  const [solarOutput, setSolarOutput] = useState(null);

  const [voltage, setVoltage] = useState("");
  const [current, setCurrent] = useState("");
  const [cycles, setCycles] = useState("");
  const [batteryTemp, setBatteryTemp] = useState("");
  const [batterySOH, setBatterySOH] = useState(null);

  const handleSolarPredict = async () => {
    const irrList = irradiance.split(",").map(Number);
    const tempList = temperature.split(",").map(Number);
    const result = await predictSolar(irrList, tempList);
    setSolarOutput(result.solar_output_kWh.toFixed(2));
  };

  const handleBatteryPredict = async () => {
    const result = await predictBattery(
      parseFloat(voltage),
      parseFloat(current),
      parseFloat(cycles),
      parseFloat(batteryTemp)
    );
    setBatterySOH(result.battery_soh.toFixed(2));
  };

  return (
    <div className="dashboard-container">
      <div className="card">
        <h2>🔆 Solar Power Prediction</h2>
        <input
          placeholder="Irradiance (comma separated)"
          value={irradiance}
          onChange={(e) => setIrradiance(e.target.value)}
        />
        <input
          placeholder="Temperature (comma separated)"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
        />
        <button onClick={handleSolarPredict}>Predict Solar Output</button>
        {solarOutput && (
          <p className="output">Predicted Solar Output: {solarOutput} kWh</p>
        )}
      </div>

      <div className="card">
        <h2>🔋 Battery SOH Prediction</h2>
        <input
          placeholder="Voltage"
          value={voltage}
          onChange={(e) => setVoltage(e.target.value)}
        />
        <input
          placeholder="Current"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
        />
        <input
          placeholder="Charge Cycles"
          value={cycles}
          onChange={(e) => setCycles(e.target.value)}
        />
        <input
          placeholder="Temperature"
          value={batteryTemp}
          onChange={(e) => setBatteryTemp(e.target.value)}
        />
        <button onClick={handleBatteryPredict}>Predict Battery SOH</button>
        {batterySOH && (
          <p className="output">Predicted Battery SOH: {batterySOH}%</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
