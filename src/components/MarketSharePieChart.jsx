import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const MarketSharePieChart = () => {
  // Data for the pie chart (mock data for demonstration)
  const chartData = {
    labels: ['Bitcoin', 'Ethereum', 'Binance Coin', 'Cardano', 'Others'],
    datasets: [
      {
        data: [60, 20, 10, 5, 5], // Market share data in percentage
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40'],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div>
      <h2>Cryptocurrency Market Share</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default MarketSharePieChart;
