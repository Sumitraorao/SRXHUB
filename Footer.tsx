
import React, { useState, useEffect } from 'react';
import { FOOTER_LINKS } from '../constants';
import { Facebook, Twitter, Linkedin, Youtube, Instagram, Globe, ArrowRight, Smartphone, Code, Cloud, Monitor, Watch, Layout } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleCtaClick = () => {
      if (user) {
          navigate('/dashboard');
      } else {
          navigate('/register');
      }
  };

  const getIconForLink = (label: string) => {
      if (label.includes('Mobile')) return <Smartphone size={18} />;
      if (label.includes('Developer')) return <Code size={18} />;
      if (label.includes('Google') || label.includes('Microsoft')) return <Cloud size={18} />;
      if (label.includes('Watch')) return <Watch size={18} />;
      if (label.includes('Browser')) return <Monitor size={18} />;
      return <Layout size={18} />;
  };

  return (
    <footer className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white border-t border-slate-800">
      
      {/* Modern Pre-Footer CTA */}
      <div className="relative py-24 overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-50"></div>
         <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto px-4 text-center relative z-10"
         >
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-white tracking-tight">
                {user ? "Ready to dominate your workflow?" : "Ready to do your best work?"}
            </h2>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto font-light">
                {user ? "Access your complete suite of powerful apps." : "Join millions of businesses running on SRXHUB."}
            </p>
            <button 
                onClick={handleCtaClick}
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gradient-to-r from-brand-red to-red-600 rounded-full hover:shadow-lg hover:shadow-red-900/30 hover:scale-105"
            >
                {user ? "GO TO DASHBOARD" : "GET STARTED NOW"}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
         </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          
          {/* Featured "Apps & Extensions" Ecosystem Section */}
          <div className="lg:col-span-2 space-y-8">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 border-l-4 border-blue-500 pl-3">Apps & Ecosystem</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {FOOTER_LINKS[0].links.map((link, idx) => (
                          <Link 
                            key={idx} 
                            to={link.href}
                            className="flex items-center p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-blue-500/30 transition-all group"
                          >
                              <div className="p-2 rounded-lg bg-slate-800 text-slate-400 group-hover:text-blue-400 group-hover:bg-blue-900/30 transition-colors mr-3">
                                  {getIconForLink(link.label)}
                              </div>
                              <span className="text-sm font-medium text-slate-200 group-hover:text-white">{link.label}</span>
                          </Link>
                      ))}
                  </div>
              </motion.div>
          </div>

          {/* Standard Footer Columns */}
          {FOOTER_LINKS.slice(1).map((section, idx) => (
            <motion.div 
               key={section.title}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.1 }}
               className="lg:col-span-1"
            >
              <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link 
                        to={link.href} 
                        className="text-slate-400 hover:text-blue-400 text-sm transition-colors flex items-center group"
                    >
                      <span className="w-0 overflow-hidden group-hover:w-2 transition-all duration-300 mr-0 group-hover:mr-2 text-blue-400">→</span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
          
        </div>

        {/* Contact Bar */}
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
             <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
                 <div className="flex items-center group hover:text-white transition-colors cursor-pointer">
                     <span className="font-bold text-white mr-2">Sales:</span> 8959795778
                 </div>
                 <div className="flex items-center group hover:text-white transition-colors cursor-pointer">
                     <span className="font-bold text-white mr-2">Support:</span> digitalmax.mgx@gmail.com
                 </div>
             </div>
             <div className="mt-6 md:mt-0 flex space-x-6">
                <a href="#" className="hover:text-blue-400 transition-colors"><Facebook size={20} /></a>
                <a href="#" className="hover:text-blue-400 transition-colors"><Twitter size={20} /></a>
                <a href="#" className="hover:text-blue-400 transition-colors"><Linkedin size={20} /></a>
                <a href="#" className="hover:text-blue-400 transition-colors"><Youtube size={20} /></a>
                <a href="#" className="hover:text-blue-400 transition-colors"><Instagram size={20} /></a>
            </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div className="flex items-center cursor-pointer hover:text-white">
                    <Globe size={14} className="mr-1" /> English
                </div>
                <span>•</span>
                <Link to="/policies" className="hover:text-white">Privacy Policy</Link>
                <Link to="/policies" className="hover:text-white">Terms of Service</Link>
            </div>
            <div>
                &copy; 2025 SRXHUB Corporation Pvt. Ltd. All rights reserved.
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
