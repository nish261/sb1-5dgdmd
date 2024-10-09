export interface PredictionData {
  locality: string;
  prediction_year: number;
  historical_years: number[];
  historical_prices: number[];
  lr_prediction: number;
  rf_prediction: number;
}