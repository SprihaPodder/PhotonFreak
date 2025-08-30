import pandas as pd
from xgboost import XGBRegressor
import joblib

# Load the updated dataset
data = pd.read_csv("ev_battery_logs.csv")

# Feature selection
X = data[['voltage', 'current', 'cycles', 'temperature']]
y = data['soh']

# Model training
model = XGBRegressor()
model.fit(X, y)

# Save the trained model
joblib.dump(model, "battery_soh_model.pkl")

print("✅ Model trained and saved as 'battery_soh_model.pkl'")
