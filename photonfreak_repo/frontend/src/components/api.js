const API_BASE = "http://192.168.1.189:8000"; 

export async function predictSolar(irradiance, temperature) {
  const response = await fetch(`${API_BASE}/predict/solar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ irradiance, temperature }),
  });
  return await response.json();
}

export async function predictBattery(voltage, current, cycles, temperature) {
  const response = await fetch(`${API_BASE}/predict/battery`, {  
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      voltage: voltage,
      current: current,
      cycles: cycles, 
      temperature: temperature
    })
  });
  return await response.json();
}