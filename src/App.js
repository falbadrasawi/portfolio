import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './routes';

const PAGE_TITLES = {
  '/': 'Home',
  '/about': 'About',
  '/projects': 'Projects',
  '/consultation': 'Consultation',
};

function PageTitleManager() {
  const location = useLocation();

  useEffect(() => {
    const normalizedPath = location.pathname.replace(/\/+$/, '') || '/';
    const pageTitle = PAGE_TITLES[normalizedPath] || 'Home';

    document.title = `Albadrasawi | ${pageTitle}`;
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div className="app-shell">
        <PageTitleManager />
        <Navbar />
        <main className="app-content">
          <Suspense fallback={<div className="route-fallback">Loading...</div>}>
            <AppRoutes />
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
