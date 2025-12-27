import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

// Simple Home Page
function Home() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to SRXHUB</h1>
      <p className="text-lg">Cloud Software Suite for Businesses</p>
    </div>
  );
}

// Simple Contact Page
function Contact() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      <p>Email: digitalmax.mgx@gmail.com</p>
      <p>Phone: 8959795778</p>
    </div>
  );
}

// Simple Products Page
function Products() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">Our Products</h1>
      <p>Coming soon...</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter basename="/SRXHUB/">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
}
