import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Features from './pages/Features';
import Services from './pages/Services';
import Research from './pages/Research';
import Team from './pages/Team';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="features" element={<Features />} />
          <Route path="services" element={<Services />} />
          <Route path="research" element={<Research />} />
          <Route path="team" element={<Team />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
