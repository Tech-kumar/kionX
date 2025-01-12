import { useEffect, useState } from 'react';
import { fetchTrendingCoins } from '../services/api';

const TrendingCoins = () => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const getTrendingCoins = async () => {
      const data = await fetchTrendingCoins();
      setCoins(data);
    };
    getTrendingCoins();
  }, []);

  if (!coins.length) return <p>Loading trending coins...</p>;

  return (
    <div>
      <h2>Trending Coins</h2>
      <ul>
        {coins.map((coin) => (
          <li key={coin.item.id}>
            <img src={coin.item.thumb} alt={coin.item.name} />
            <p>{coin.item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingCoins;
