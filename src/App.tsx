import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';

// Lazy loaded components
const Home = React.lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const About = React.lazy(() => import('./pages/About').then(module => ({ default: module.About })));
const Products = React.lazy(() => import('./pages/Products').then(module => ({ default: module.Products })));
const Contact = React.lazy(() => import('./pages/Contact').then(module => ({ default: module.Contact })));
const Cart = React.lazy(() => import('./pages/Cart').then(module => ({ default: module.Cart })));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
