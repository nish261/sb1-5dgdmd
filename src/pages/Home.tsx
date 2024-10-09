import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Database, TrendingUp } from 'lucide-react';

const Home: React.FC = () => {
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

  return (
    <div className="max-w-4xl mx-auto pt-20">
      <h1 className="text-5xl font-bold mb-8 text-center text-gray-800 fade-in">Real Estate Price Predictor</h1>
      <div className="bg-white shadow-lg rounded-lg p-8 mb-12 fade-in">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">About Our AI Model</h2>
        <p className="text-gray-600 mb-6 text-lg">
          Our advanced machine learning model analyzes historical sales data to provide accurate price forecasts for properties in Melbourne. By considering factors such as location, property size, and market trends, we offer valuable insights for home buyers, investors, and market analysts.
        </p>
        <div className="flex justify-center">
          <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80" alt="Melbourne cityscape" className="rounded-lg shadow-md max-w-full h-auto" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 fade-in">
        <Link to="/data" className="bg-kiwi-500 text-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover-lift">
          <h3 className="text-2xl font-semibold mb-4 flex items-center">
            <Database className="w-6 h-6 mr-2" />
            Explore Our Data
          </h3>
          <p className="mb-4">View and analyze historical property sales data from various sources.</p>
        </Link>
        <Link to="/predict" className="bg-kiwi-500 text-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover-lift">
          <h3 className="text-2xl font-semibold mb-4 flex items-center">
            <TrendingUp className="w-6 h-6 mr-2" />
            Make a Prediction
          </h3>
          <p className="mb-4">Use our AI model to predict property prices based on various factors.</p>
        </Link>
      </div>
    </div>
  );
};

export default Home;