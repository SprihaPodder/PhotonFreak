from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from tensorflow.keras.models import load_model
import numpy as np
import joblib

from fastapi.middleware.cors import CORSMiddleware



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

solar_model = load_model("solar_lstm_model.h5", compile=False)
battery_model = joblib.load("battery_soh_model.pkl")

class BatteryInput(BaseModel):
    voltage: float
    current: float
    cycles: float
    temperature: float

class SolarInput(BaseModel):
    irradiance: list
    temperature: list

@app.post("/predict/solar")
def predict_solar(input: SolarInput):
    try:
        data = np.array(list(zip(input.irradiance, input.temperature)))
        data = np.expand_dims(data, axis=0)
        prediction = solar_model.predict(data)
        return {"solar_output_kWh": float(prediction[0][0])}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict/battery")
def predict_battery(input: BatteryInput):
    try:
        X = [[input.voltage, input.current, input.cycles, input.temperature]]
        soh = battery_model.predict(X)[0]
        return {"battery_soh": float(soh)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

