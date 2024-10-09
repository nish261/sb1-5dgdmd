from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React app's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the dataset
property_sales_df = pd.read_csv("Property_sales.csv")

# Preprocess the dataset
property_sales_df.replace("-", np.nan, inplace=True)
property_sales_df.iloc[:, 1:] = property_sales_df.iloc[:, 1:].apply(pd.to_numeric, errors='coerce')
property_sales_df.fillna(method="ffill", inplace=True)

# Define the machine learning models
linear_regressor = LinearRegression()
random_forest_regressor = RandomForestRegressor(n_estimators=100, random_state=42)

class PredictionRequest(BaseModel):
    locality: str
    year: int

@app.post("/predict")
async def predict_price(request: PredictionRequest):
    locality = request.locality.upper()
    future_year = request.year

    if locality not in property_sales_df['Locality'].values:
        raise HTTPException(status_code=404, detail=f"Locality '{locality}' not found in the dataset.")

    locality_data = property_sales_df[property_sales_df['Locality'] == locality].iloc[0]

    years = np.array([int(year) for year in range(2013, 2024)]).reshape(-1, 1)
    actual_prices = locality_data[1:12].values.reshape(-1, 1)

    linear_regressor.fit(years, actual_prices)
    random_forest_regressor.fit(years, actual_prices.ravel())

    future_year_pred = np.array([[future_year]])
    predicted_price_lr = linear_regressor.predict(future_year_pred)[0, 0]
    predicted_price_rf = random_forest_regressor.predict(future_year_pred)[0]

    return {
        "locality": locality,
        "prediction_year": future_year,
        "historical_years": list(range(2013, 2024)),
        "historical_prices": actual_prices.ravel().tolist(),
        "lr_prediction": float(predicted_price_lr),
        "rf_prediction": float(predicted_price_rf)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)