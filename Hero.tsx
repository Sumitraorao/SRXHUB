
import React, { useEffect, useState } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { getFeaturedApps } from '../services/mockApi';
import { FeatureApp } from '../types';
import { getRandomImage } from '../constants';
import { Link, useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const [apps, setApps] = useState<(FeatureApp & { id: string })[]>([]);
  const [heroImage, setHeroImage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching data from backend
    getFeaturedApps().then(setApps);
    setHeroImage(getRandomImage('office'));

    // Check login status
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <section className="relative w-full bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Content */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6"
            >
              Your life's work, <br/>
              <span className="text-gray-900">powered by our life's work</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-lg text-gray-600 mb-8 max-w-2xl leading-relaxed"
            >
              A unique and powerful software suite to transform the way you work. 
              Designed for businesses of all sizes, built by a company that values your privacy.
            </motion.p>
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5 }}
            >
              <Link 
                to={isLoggedIn ? "/dashboard" : "/register"} 
                className="inline-block bg-brand-red hover:bg-brand-darkRed text-white text-lg font-bold py-4 px-8 rounded shadow-lg transition-transform hover:-translate-y-1"
              >
                {isLoggedIn ? "GO TO DASHBOARD" : "GET STARTED FOR FREE"}
              </Link>
            </motion.div>
            
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.6, duration: 0.8 }}
               className="mt-12"
            >
               {heroImage && (
                   <img 
                     src={heroImage} 
                     alt="Office Environment" 
                     className="w-full h-auto rounded-xl object-cover shadow-2xl border border-gray-100"
                   />
               )}
            </motion.div>
          </div>

          {/* Right Sidebar - Featured Apps */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white rounded-lg shadow-2xl border border-gray-100 p-6 lg:absolute lg:top-0 lg:right-0 lg:w-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Featured Apps</h3>
                <ChevronRight size={16} className="text-gray-400" />
              </div>

              <div className="space-y-6">
                {apps.map((app) => (
                  <div 
                    key={app.name} 
                    onClick={() => navigate(`/product/${app.id}`)}
                    className="flex group cursor-pointer p-2 rounded hover:bg-gray-50 transition-colors"
                  >
                    <div className={`mr-4 p-2 rounded-lg bg-gray-50 group-hover:bg-white shadow-sm ${app.color}`}>
                      <app.icon size={28} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                        {app.name} 
                        <ArrowRight size={14} className="ml-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all text-blue-600" />
                      </h4>
                      <p className="text-sm text-gray-500 leading-snug mt-1">{app.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <Link to="/products" className="flex items-center text-blue-600 font-bold text-sm hover:underline tracking-wide uppercase">
                  Explore all products <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
