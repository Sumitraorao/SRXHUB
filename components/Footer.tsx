import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold mb-4">About</h3>
            <p>SRXHUB - Cloud Software Suite for Businesses</p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <p>Email: digitalmax.mgx@gmail.com</p>
            <p>Phone: 8959795778</p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Links</h3>
            <ul>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p>&copy; 2025 SRXHUB. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
