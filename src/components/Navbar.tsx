import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Database, TrendingUp } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-kiwi-600 hover:text-kiwi-700 transition-colors duration-200">
            Real Estate Predictor
          </Link>
          <div className="space-x-6">
            <Link to="/" className="text-gray-600 hover:text-kiwi-600 transition-colors duration-200 flex items-center">
              <Home className="w-5 h-5 mr-1" />
              Home
            </Link>
            <Link to="/data" className="text-gray-600 hover:text-kiwi-600 transition-colors duration-200 flex items-center">
              <Database className="w-5 h-5 mr-1" />
              Data
            </Link>
            <Link to="/predict" className="text-gray-600 hover:text-kiwi-600 transition-colors duration-200 flex items-center">
              <TrendingUp className="w-5 h-5 mr-1" />
              Predict
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;