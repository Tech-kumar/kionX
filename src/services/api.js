import axios from 'axios';

export const fetchBitcoinPrice = async () => {
  const response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice/BTC.json');
  return response.data;
};

export const fetchTrendingCoins = async () => {
  const response = await axios.get('https://api.coingecko.com/api/v3/search/trending');
  return response.data.coins;
};

export const fetchCoinDetails = async (coinId) => {
  const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`);
  return response.data;
};
