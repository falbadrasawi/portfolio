import React from 'react';
import ReactDOM from 'react-dom/client';
import emailjs from 'emailjs-com';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

emailjs.init('gIe1fPtsjMnXK9NsC');

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
