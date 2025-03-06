import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HelmetProvider } from 'react-helmet-async';
import { FUTURE_FLAGS } from './constants/router';

// Agrupar las importaciones lazy por categoría
const Pages = {
  Home: React.lazy(() => import('./pages/Home').then(m => ({ default: m.Home }))),
  About: React.lazy(() => import('./pages/About').then(m => ({ default: m.About }))),
  Products: React.lazy(() => import('./pages/Products').then(m => ({ default: m.Products }))),
  Contact: React.lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact }))),
  Cart: React.lazy(() => import('./pages/Cart').then(m => ({ default: m.Cart }))),
  NotFound: React.lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })))
};

function App() {
  return (
    <HelmetProvider>
      <Router future={FUTURE_FLAGS}>
        <Layout>
          <Routes>
            <Route path="/" element={<Pages.Home />} />
            <Route path="/about" element={<Pages.About />} />
            <Route path="/products" element={<Pages.Products />} />
            <Route path="/contact" element={<Pages.Contact />} />
            <Route path="/cart" element={<Pages.Cart />} />
            <Route path="*" element={<Pages.NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </HelmetProvider>
  );
}

export default App;
