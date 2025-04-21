// src/App.js
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './routes';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <AppRoutes />
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;



