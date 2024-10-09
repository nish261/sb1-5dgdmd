import React, { useState } from 'react';
import { PredictionData } from '../types';

interface PredictionFormProps {
  onPredict: (data: PredictionData) => void;
}

const PredictionForm: React.FC<PredictionFormProps> = ({ onPredict }) => {
  const [locality, setLocality] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!locality || !year) {
      setError('Please fill in all fields');
      return;
    }

    // Simulating API call with mock data
    const mockPredictionData: PredictionData = {
      locality,
      prediction_year: parseInt(year),
      historical_years: [2018, 2019, 2020, 2021, 2022],
      historical_prices: [500000, 520000, 535000, 550000, 580000],
      lr_prediction: Math.round(600000 + Math.random() * 50000),
      rf_prediction: Math.round(610000 + Math.random() * 50000),
    };

    onPredict(mockPredictionData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="locality">
          Locality
        </label>
        <input
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-kiwi-500 focus:ring focus:ring-kiwi-500 focus:ring-opacity-50 transition-all duration-200"
          id="locality"
          type="text"
          placeholder="Enter locality"
          value={locality}
          onChange={(e) => setLocality(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="year">
          Prediction Year
        </label>
        <input
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-kiwi-500 focus:ring focus:ring-kiwi-500 focus:ring-opacity-50 transition-all duration-200"
          id="year"
          type="number"
          placeholder="Enter year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        className="w-full bg-kiwi-500 text-white py-2 px-4 rounded-md hover:bg-kiwi-600 transition-colors duration-200 hover-lift"
        type="submit"
      >
        Predict Price
      </button>
    </form>
  );
};

export default PredictionForm;