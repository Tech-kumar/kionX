import React, { useState, useEffect } from 'react';
import { fetchBitcoinPrice, fetchTrendingCoins, fetchCoinDetails } from './services/api';
import { Line } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend);

const App = () => {
  const [bitcoinPrice, setBitcoinPrice] = useState({
    USD: { rate: 'Loading...' },
    GBP: { rate: 'Loading...' },
    EUR: { rate: 'Loading...' },
  });
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [coinDetails, setCoinDetails] = useState(null);
  const [coinId, setCoinId] = useState('bitcoin');

  // Fetch Bitcoin price data
  useEffect(() => {
    const getBitcoinPrice = async () => {
      const data = await fetchBitcoinPrice();
      setBitcoinPrice(data.bpi); // Assuming 'bpi' contains the currency info
    };

    getBitcoinPrice();
  }, []);

  // Fetch trending coins data
  useEffect(() => {
    const getTrendingCoins = async () => {
      const coins = await fetchTrendingCoins();
      setTrendingCoins(coins);
    };

    getTrendingCoins();
  }, []);

  // Fetch coin details when coinId changes
  useEffect(() => {
    const getCoinDetails = async () => {
      const details = await fetchCoinDetails(coinId);
      setCoinDetails(details);
    };

    if (coinId) {
      getCoinDetails();
    }
  }, [coinId]);

  // Data for Bitcoin price chart
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

  // Data for cryptocurrency market share pie chart
  const pieChartData = {
    labels: ['Bitcoin', 'Ethereum', 'Binance Coin', 'Cardano', 'Others'],
    datasets: [
      {
        data: [60, 20, 10, 5, 5], // Example data for market share
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40'],
        hoverOffset: 4,
      },
    ],
  };

  // Dynamically load TradingView widget
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      if (window.TradingView) {
        new window.TradingView.widget({
          container_id: 'tradingview-widget',
          symbol: coinId.toUpperCase(),
          theme: 'light',
          autosize: true,
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [coinId]);

  return (
    <div>
      <header style={{ padding: '15px', backgroundColor: '#1a1a2e', color: '#fff' }}>
        <h1 style={{ textAlign: 'center' }}>KoinX - Cryptocurrency Tracker</h1>
      </header>

      <main>
        <div>
          <h2>Bitcoin Price</h2>
          {bitcoinPrice ? (
            <div>
              <p>USD: {bitcoinPrice?.USD?.rate || 'Data not available'}</p>
              <p>GBP: {bitcoinPrice?.GBP?.rate || 'Data not available'}</p>
              <p>EUR: {bitcoinPrice?.EUR?.rate || 'Data not available'}</p>
            </div>
          ) : (
            <p>Loading Bitcoin price...</p>
          )}
        </div>

        <div>
          <h2>Price Over Time</h2>
          <Line data={chartData} />
        </div>

        <div>
          <h2>Cryptocurrency Market Share</h2>
          <Pie data={pieChartData} />
        </div>

        <div>
          <h2>Trending Coins</h2>
          {trendingCoins.length > 0 ? (
            <ul>
              {trendingCoins.map((coin) => (
                <li key={coin.item.id} onClick={() => setCoinId(coin.item.id)}>
                  {coin.item.name}
                </li>
              ))}
            </ul>
          ) : (
            <p>Loading trending coins...</p>
          )}
        </div>

        <div>
          {coinDetails ? (
            <div>
              <h2>{coinDetails.name} Details</h2>
              <p>Symbol: {coinDetails.symbol}</p>
              <p>Market Cap: {coinDetails.market_data.market_cap.usd}</p>
              <p>Current Price: ${coinDetails.market_data.current_price.usd}</p>
              <p>24h Change: {coinDetails.market_data.price_change_percentage_24h}%</p>
            </div>
          ) : (
            <p>Select a coin to view details.</p>
          )}
        </div>

        <div>
          <h2>Trading Chart</h2>
          <div id="tradingview-widget"></div>
        </div>
      </main>

      <footer style={{ padding: '15px', backgroundColor: '#1a1a2e', color: '#fff', textAlign: 'center' }}>
        <p>&copy; 2025 KoinX | All rights reserved</p>
      </footer>
    </div>
  );
};

export default App;
