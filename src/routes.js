import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Consultation from './pages/Consultation';

const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/consultation" element={<Consultation />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
