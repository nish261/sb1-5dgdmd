import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { PredictionData } from '../types';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

interface PredictionResultsProps {
  predictionData: PredictionData | null;
}

const PredictionResults: React.FC<PredictionResultsProps> = ({ predictionData }) => {
  if (!predictionData) {
    return <p className="text-gray-600">Enter locality and year to see prediction results.</p>;
  }

  const lineChartData = {
    labels: [...predictionData.historical_years, predictionData.prediction_year],
    datasets: [
      {
        label: 'Historical Prices',
        data: predictionData.historical_prices,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Linear Regression Prediction',
        data: [...predictionData.historical_prices, predictionData.lr_prediction],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const barChartData = {
    labels: ['Linear Regression', 'Random Forest'],
    datasets: [
      {
        label: 'Predicted Price',
        data: [predictionData.lr_prediction, predictionData.rf_prediction],
        backgroundColor: ['rgba(75, 192, 192, 0.5)', 'rgba(255, 99, 132, 0.5)'],
        borderColor: ['rgb(75, 192, 192)', 'rgb(255, 99, 132)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Prediction for {predictionData.locality} in {predictionData.prediction_year}</h3>
      <div className="transition-all duration-300 ease-in-out">
        <h4 className="text-md font-semibold mb-2">Historical Prices and Linear Regression</h4>
        <Line data={lineChartData} />
      </div>
      <div className="transition-all duration-300 ease-in-out">
        <h4 className="text-md font-semibold mb-2">Model Predictions Comparison</h4>
        <Bar data={barChartData} />
      </div>
      <div className="text-sm text-gray-600">
        <p>Linear Regression Prediction: ${predictionData.lr_prediction.toLocaleString()}</p>
        <p>Random Forest Prediction: ${predictionData.rf_prediction.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default PredictionResults;