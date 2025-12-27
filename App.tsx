import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Enterprise from './pages/Enterprise';
import Contact from './pages/Contact';
import Customers from './pages/Customers';
import Community from './pages/Community';
import Partners from './pages/Partners';
import Security from './pages/Security';
import Login from './pages/Login';
import Register from './pages/Register';
import CompleteProfile from './pages/CompleteProfile';
import SrxAi from './pages/SrxAi';
import AiChat from './pages/AiChat';
import Dashboard from './pages/Dashboard';
import ProductDetail from './pages/ProductDetail';
import Policies from './pages/Policies';
import MobileApps from './pages/MobileApps';
import DeveloperCenter from './pages/DeveloperCenter';
import About from './pages/About';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/complete-profile';
  const isChatPage = location.pathname === '/aichat';
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col">
      <ScrollToTop />
      {!isAuthPage && !isChatPage && !isDashboard && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/enterprise" element={<Enterprise />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/community" element={<Community />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/security" element={<Security />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/complete-profile" element={<CompleteProfile />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/ai" element={<SrxAi />} />
          <Route path="/aichat" element={<AiChat />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/mobile-apps" element={<MobileApps />} />
          <Route path="/developer-center" element={<DeveloperCenter />} />
        </Routes>
      </main>
      {!isAuthPage && !isChatPage && !isDashboard && <Footer />}
    </div>
  );
}

export default App;
