import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { Cart } from './pages/Cart';
import { Contact } from './pages/Contact';
import { LegalPage, PRIVACY_POLICY, TERMS_OF_SERVICE, SHIPPING_INFO } from './pages/Legal';

import { CheckoutSuccess } from './pages/CheckoutSuccess';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/releases" 
            element={
              <Catalog 
                category="release" 
                title="Label Catalog" 
                description="Our core roster of artists and exclusive label releases. High-quality vinyl, CDs, and digital formats."
              />
            } 
          />
          <Route 
            path="/distro" 
            element={
              <Catalog 
                category="distro" 
                title="Distribution Network" 
                description="Hand-picked selections from partner labels and underground artists worldwide. Limited stock imports."
              />
            } 
          />
          <Route 
            path="/merch" 
            element={
              <Catalog 
                category="merch" 
                title="Label Merchandise" 
                description="Premium apparel, accessories, and limited edition collectibles. Designed in-house for the community."
              />
            } 
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/contact" element={<Contact />} />
          <Route 
            path="/legal/privacy" 
            element={<LegalPage title="Privacy Policy" content={PRIVACY_POLICY} />} 
          />
          <Route 
            path="/legal/terms" 
            element={<LegalPage title="Terms of Service" content={TERMS_OF_SERVICE} />} 
          />
          <Route 
            path="/legal/shipping" 
            element={<LegalPage title="Shipping Info" content={SHIPPING_INFO} />} 
          />
        </Routes>
      </Layout>
    </Router>
  );
}
