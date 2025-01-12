import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css'; // Ensure you have this file in the styles folder
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
