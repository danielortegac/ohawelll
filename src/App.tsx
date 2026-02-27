import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Chatbot } from './components/Chatbot';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { MoodHub } from './pages/MoodHub';
import { ProductDetail } from './pages/ProductDetail';
import { Account } from './pages/Account';
import { RitualBuilder } from './pages/RitualBuilder';
import { Impact } from './pages/Impact';
import { Blog } from './pages/Blog';
import { Partnership } from './pages/Partnership';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/moods/:moodId" element={<MoodHub />} />
                  <Route path="/product/:productId" element={<ProductDetail />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/ritual-builder" element={<RitualBuilder />} />
                  <Route path="/impact" element={<Impact />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/socio-estrategico" element={<Partnership />} />
                  {/* Fallback routes for demo */}
                  <Route path="/moods" element={<Home />} />
                  <Route path="*" element={<Home />} />
                </Routes>
              </main>
              <Footer />
              <Chatbot />
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
