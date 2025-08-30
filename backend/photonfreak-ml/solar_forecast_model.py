import pandas as pd
import numpy as np
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
from sklearn.preprocessing import MinMaxScaler

# Load dataset
data = pd.read_csv("solar_data.csv")
features = data[['irradiance', 'temperature']].values
target = data['solar_output_kWh'].values

# Normalize
scaler = MinMaxScaler()
features_scaled = scaler.fit_transform(features)

# Prepare sequences
X, y = [], []
for i in range(10, len(features_scaled)):
    X.append(features_scaled[i-10:i])
    y.append(target[i])
X, y = np.array(X), np.array(y)

# Model
model = Sequential([
    LSTM(50, return_sequences=False, input_shape=(X.shape[1], X.shape[2])),
    Dense(1)
])
model.compile(optimizer='adam', loss='mse')
model.fit(X, y, epochs=10, batch_size=16)
model.save("solar_lstm_model.h5")
