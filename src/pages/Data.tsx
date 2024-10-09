import React, { useState, useEffect } from 'react';
import { Upload, BarChart2 } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Data: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any>(null);

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const lines = content.split('\n');
        const headers = lines[0].split(',');
        const parsedData = lines.slice(1).map(line => {
          const values = line.split(',');
          return headers.reduce((obj, header, index) => {
            obj[header] = values[index];
            return obj;
          }, {} as any);
        });
        setData(parsedData);
        generateChartData(parsedData);
      };
      reader.readAsText(file);
    }
  };

  const generateChartData = (data: any[]) => {
    if (data.length > 0 && data[0].Year && data[0].House_Median_Price) {
      const years = data.map(item => item.Year);
      const prices = data.map(item => parseFloat(item.House_Median_Price));

      setChartData({
        labels: years,
        datasets: [
          {
            label: 'House Median Price',
            data: prices,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto pt-20">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 fade-in">Data Management</h1>
      <div className="bg-white shadow-lg rounded-lg p-8 mb-12 fade-in">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Upload New Data</h2>
        <div className="flex items-center space-x-4">
          <input
            type="file"
            onChange={handleFileChange}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-kiwi-500 file:text-white hover:file:bg-kiwi-600 transition-colors duration-200"
          />
          <button
            onClick={handleUpload}
            className="bg-kiwi-500 text-white py-2 px-4 rounded-full hover:bg-kiwi-600 transition-colors duration-200 flex items-center hover-lift"
          >
            <Upload className="mr-2" />
            Upload
          </button>
        </div>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-8 fade-in">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">View Data</h2>
        {data.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  {Object.keys(data[0]).map((header) => (
                    <th key={header} className="py-2 px-4 text-left">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, i) => (
                      <td key={i} className="py-2 px-4">{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">No data available. Please upload a file.</p>
        )}
        {chartData && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Data Visualization</h3>
            <Bar data={chartData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Data;