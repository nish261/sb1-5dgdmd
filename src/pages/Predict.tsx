import React, { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';
import PredictionForm from '../components/PredictionForm';
import PredictionResults from '../components/PredictionResults';
import { PredictionData } from '../types';

const Predict: React.FC = () => {
  const [predictionData, setPredictionData] = useState<PredictionData | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.fade-in');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight * 0.75;
        el.classList.toggle('visible', isVisible);
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePrediction = (data: PredictionData) => {
    setPredictionData(data);
  };

  return (
    <div className="max-w-4xl mx-auto pt-20">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 fade-in">Price Prediction</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white shadow-lg rounded-lg p-8 fade-in">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
            <TrendingUp className="mr-2" />
            Input Data
          </h2>
          <PredictionForm onPredict={handlePrediction} />
        </div>
        <div className="bg-white shadow-lg rounded-lg p-8 fade-in">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
            <TrendingUp className="mr-2" />
            Prediction Results
          </h2>
          <PredictionResults predictionData={predictionData} />
        </div>
      </div>
    </div>
  );
};

export default Predict;