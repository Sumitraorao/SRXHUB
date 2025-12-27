import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="font-bold text-xl text-blue-600">SRXHUB</div>
          <div className="hidden md:flex gap-8">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <Link to="/products" className="hover:text-blue-600">Products</Link>
            <Link to="/contact" className="hover:text-blue-600">Contact</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
