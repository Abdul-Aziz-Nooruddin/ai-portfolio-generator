import React from 'react';
import ReactDOM from 'react-dom/client';
import { HeroSection } from './components/FullScreenHero';
import './hero.css';

const rootEl = document.getElementById('root') || document.getElementById('hero-root');
if (rootEl) {
  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <HeroSection />
    </React.StrictMode>
  );
}
