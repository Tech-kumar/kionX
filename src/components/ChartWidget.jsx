import Script from 'next/script';

const ChartWidget = ({ symbol = 'BTCUSD' }) => (
  <div>
    <h2>Trading Chart</h2>
    <div id="tradingview-widget"></div>
    <Script
      src="https://s3.tradingview.com/tv.js"
      onLoad={() => {
        new TradingView.widget({
          container_id: 'tradingview-widget',
          symbol,
          theme: 'light',
          autosize: true,
        });
      }}
    />
  </div>
);

export default ChartWidget;
