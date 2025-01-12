import { useEffect, useState } from 'react';
import { fetchBitcoinPrice } from '../services/api';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const BitcoinPrice = () => {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const getPrice = async () => {
      const data = await fetchBitcoinPrice();
      setPrice(data);
    };
    getPrice();
  }, []);

  if (!price) return <p>Loading Bitcoin price...</p>;

  // Data for the chart (mock data for demonstration)
  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'], // Example months
    datasets: [
      {
        label: 'Bitcoin Price in USD',
        data: [35000, 40000, 45000, 50000, 55000, 60000, 65000], // Replace with real data from API
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div>
      <h2>Bitcoin Price</h2>
      <p>USD: ${price.usd}</p>
      <p>INR: ₹{price.inr}</p>

      <h3>Price Over Time</h3>
      <Line data={chartData} />
    </div>
  );
};

export default BitcoinPrice;

