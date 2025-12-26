
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, CheckCircle, Shield, Server, Users, Globe, Lock, 
  Award, TrendingUp, Star, Zap 
} from 'lucide-react';
import { ENTERPRISE_SOLUTIONS, ENTERPRISE_TESTIMONIALS, ENTERPRISE_FEATURES_TABS } from '../constants';
import { Link, useNavigate } from 'react-router-dom';

const Enterprise: React.FC = () => {
  const [activeTab, setActiveTab] = useState(ENTERPRISE_FEATURES_TABS[0].id);
  const navigate = useNavigate();
  
  // Professional Enterprise Image
  const heroImage = "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1600";

  const activeFeatureContent = ENTERPRISE_FEATURES_TABS.find(t => t.id === activeTab)?.content;

  const awards = [
      { name: "Gartner® Magic Quadrant™", title: "Leader 2024", icon: Award },
      { name: "Forrester Wave™", title: "Strong Performer", icon: TrendingUp },
      { name: "IDC MarketScape", title: "Major Player", icon: Globe },
      { name: "G2 Crowd", title: "#1 User Satisfaction", icon: Star },
      { name: "Capterra", title: "Best Value 2024", icon: Zap },
      { name: "Forbes Cloud 100", title: "Honoree", icon: Award },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 lg:pt-32 lg:pb-40 overflow-hidden bg-white">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-50 to-transparent rounded-full blur-3xl opacity-60 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-yellow-50 to-transparent rounded-full blur-3xl opacity-60 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center space-x-2 px-3 py-1 mb-6 border border-blue-100 rounded-full text-xs font-bold text-brand-blue uppercase tracking-widest bg-blue-50">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue"></span>
                </span>
                <span>AI Powered Enterprise Suite</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-8 tracking-tight">
                Scale without <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-purple-600">limits.</span>
              </h1>
              <p className="text-xl text-gray-600 mb-10 max-w-lg leading-relaxed">
                A unified operating system for your business. Secure, scalable, and customizable solutions designed for the modern enterprise.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="inline-flex justify-center items-center bg-gray-900 hover:bg-black text-white text-lg font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1">
                  Contact Sales <ArrowRight size={20} className="ml-2" />
                </Link>
                <Link to="/contact" className="inline-flex justify-center items-center bg-white text-gray-900 border border-gray-200 hover:border-gray-400 text-lg font-bold py-4 px-8 rounded-xl transition-all">
                   View Demo
                </Link>
              </div>
            </motion.div>

            {/* Modern Hero Image Composition */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
               animate={{ opacity: 1, scale: 1, rotate: 0 }}
               transition={{ duration: 1, ease: "easeOut" }}
               className="relative lg:h-[600px] flex items-center justify-center"
            >
               <div className="relative w-full aspect-square max-w-lg">
                   {/* Main Image */}
                   <img 
                     src={heroImage} 
                     alt="Enterprise Team" 
                     className="w-full h-full object-cover rounded-[2rem] shadow-2xl border-4 border-white relative z-10" 
                   />
                   
                   {/* Floating Glass Card 1 */}
                   <motion.div 
                      animate={{ y: [0, -15, 0] }}
                      transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                      className="absolute -top-10 -right-10 bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/50 z-20 max-w-[200px]"
                   >
                       <div className="flex items-center space-x-3 mb-2">
                           <div className="bg-green-100 p-2 rounded-full"><Shield className="text-green-600 w-5 h-5" /></div>
                           <span className="text-sm font-bold text-gray-800">Bank-grade Security</span>
                       </div>
                       <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                           <div className="h-full bg-green-500 w-[98%]"></div>
                       </div>
                   </motion.div>

                   {/* Floating Glass Card 2 */}
                   <motion.div 
                      animate={{ y: [0, 15, 0] }}
                      transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
                      className="absolute -bottom-10 -left-6 bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/50 z-20"
                   >
                       <div className="flex items-center justify-between space-x-8">
                           <div>
                               <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Uptime</div>
                               <div className="text-2xl font-bold text-gray-900">99.99%</div>
                           </div>
                           <CheckCircle className="text-brand-blue w-8 h-8" />
                       </div>
                   </motion.div>

                   {/* Decorative elements behind */}
                   <div className="absolute -inset-4 bg-gradient-to-tr from-brand-red to-brand-blue rounded-[2.5rem] opacity-20 blur-xl -z-10"></div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modern Awards Section */}
      <section className="bg-gray-50 border-y border-gray-200 py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-10 text-center">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em]">Industry Recognition</h3>
        </div>
        
        <div className="relative w-full overflow-hidden group">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>
            
            <div className="flex overflow-hidden">
                <motion.div 
                    className="flex space-x-8"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
                >
                    {/* Triple loop for seamless infinite scroll on wide screens */}
                    {[...awards, ...awards, ...awards].map((award, idx) => (
                        <div key={idx} className="inline-flex w-72 flex-shrink-0">
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4 w-full hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 text-brand-blue">
                                    <award.icon size={24} />
                                </div>
                                <div>
                                    <div className="text-gray-900 font-bold text-sm truncate">{award.name}</div>
                                    <div className="text-brand-blue font-semibold text-xs uppercase tracking-wide">{award.title}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-24 bg-white scroll-mt-20" id="platform">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Customisable solutions for <br/>enterprise management</h2>
            <div className="w-24 h-1 bg-brand-red mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ENTERPRISE_SOLUTIONS.map((sol, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => navigate(`/product/${sol.linkId}`)}
                className="group bg-white p-10 rounded-2xl border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-brand-blue opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="text-xs font-bold text-brand-blue uppercase mb-4 tracking-wider">{sol.title}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-snug">{sol.description.split('.')[0]}.</h3>
                <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                   {sol.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                    {sol.apps.map(app => (
                        <span key={app} className="bg-gray-50 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-full border border-gray-200">
                            {app}
                        </span>
                    ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-brand-dark text-white relative overflow-hidden scroll-mt-20" id="verticals">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Bespoke solutions across industries</h2>
           
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
               {ENTERPRISE_TESTIMONIALS.map((test, idx) => (
                   <motion.div 
                     key={idx}
                     initial={{ opacity: 0, x: idx === 0 ? -30 : 30 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     className="bg-white/5 p-10 rounded-3xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors"
                   >
                       <div className="text-brand-red font-bold text-xs uppercase tracking-widest mb-6">{test.industry}</div>
                       <blockquote className="text-xl md:text-2xl font-light mb-8 leading-relaxed italic text-gray-200">
                           "{test.quote}"
                       </blockquote>
                       <div className="flex items-center">
                           <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 mr-4"></div>
                           <div>
                               <div className="font-bold text-white text-lg">{test.author}</div>
                               <div className="text-sm text-gray-400">{test.role}</div>
                           </div>
                       </div>
                   </motion.div>
               ))}
           </div>
        </div>
      </section>

      {/* Feature Tabs Section */}
      <section className="py-24 bg-gray-50 scroll-mt-20" id="extensions">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
               <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Uniquely positioned for enterprises</h2>
               <p className="text-gray-600 mt-4 max-w-2xl mx-auto">The breadth and depth of the SRXHUB suite empowers enterprises to adopt a solution-based approach.</p>
           </div>

           {/* Tabs */}
           <div className="flex flex-wrap justify-center gap-4 mb-16 border-b border-gray-200">
               {ENTERPRISE_FEATURES_TABS.map((tab) => (
                   <button
                     key={tab.id}
                     onClick={() => setActiveTab(tab.id)}
                     className={`pb-4 px-6 text-sm font-bold transition-all border-b-2 relative ${
                         activeTab === tab.id 
                         ? 'border-brand-blue text-brand-blue' 
                         : 'border-transparent text-gray-500 hover:text-gray-700'
                     }`}
                   >
                       {tab.label}
                       {activeTab === tab.id && (
                           <motion.div layoutId="underline" className="absolute bottom-[-2px] left-0 w-full h-0.5 bg-brand-blue" />
                       )}
                   </button>
               ))}
           </div>

           {/* Content */}
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[400px]">
               <motion.div
                 key={activeTab} // Re-animate on tab change
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.4 }}
               >
                   <h3 className="text-3xl font-bold text-gray-900 mb-6">{activeFeatureContent?.heading}</h3>
                   <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                       {activeFeatureContent?.description}
                   </p>
                   <Link to="/contact" className="text-brand-blue font-bold flex items-center hover:underline group">
                       LEARN MORE <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                   </Link>
               </motion.div>

               <motion.div
                 key={`${activeTab}-grid`}
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.4 }}
                 className="grid grid-cols-2 gap-6"
               >
                   {activeFeatureContent?.items.map((item: any, idx: number) => (
                       <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-start hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                           <div className="mb-4 text-brand-blue bg-blue-50 p-4 rounded-xl">
                               <item.icon size={24} />
                           </div>
                           <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                           <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                       </div>
                   ))}
               </motion.div>
           </div>
        </div>
      </section>

      {/* Service & Uptime */}
      <section className="py-24 bg-white scroll-mt-20" id="implementation">
          <div className="max-w-7xl mx-auto px-4 text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Serious software. Friendly service. <br/>Unparalleled value.</h2>
          </div>
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-8 rounded-2xl hover:bg-gray-50 transition-colors">
                  <div className="mx-auto bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                      <Globe className="text-brand-red" size={32} />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Global presence</h3>
                  <p className="text-sm text-gray-600">Offices and data centers in multiple countries, a global workforce.</p>
              </div>
              <div className="text-center p-8 rounded-2xl hover:bg-gray-50 transition-colors">
                  <div className="mx-auto bg-green-50 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle className="text-green-600" size={32} />
                  </div>
                  <h3 className="font-bold text-lg mb-2">99.9% monthly uptime</h3>
                  <p className="text-sm text-gray-600">Built on our own cloud infrastructure with 24/7 monitoring.</p>
              </div>
              <div className="text-center p-8 rounded-2xl hover:bg-gray-50 transition-colors">
                  <div className="mx-auto bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                      <Lock className="text-brand-blue" size={32} />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Simplified authentication</h3>
                  <p className="text-sm text-gray-600">Centralized access scale managing users from Active Directory.</p>
              </div>
               <div className="text-center p-8 rounded-2xl hover:bg-gray-50 transition-colors">
                  <div className="mx-auto bg-purple-50 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                      <Users className="text-purple-600" size={32} />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Dedicated support</h3>
                  <p className="text-sm text-gray-600">Premium enterprise support provides round-the-clock access.</p>
              </div>
          </div>
      </section>

      {/* Security Section */}
      <section className="py-24 bg-gray-900 text-white scroll-mt-20" id="security">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div>
                      <h2 className="text-3xl md:text-4xl font-bold mb-6">Enterprise-grade security at the forefront</h2>
                      <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                          At SRXHUB, we take data privacy and security seriously at every level of our business, from product development to vendor standards. We also comply with all applicable data protection laws.
                      </p>
                      <Link to="/security" className="border-2 border-white hover:bg-white hover:text-black text-white font-bold py-3 px-8 rounded-xl transition-colors inline-block">
                          LEARN MORE
                      </Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="bg-white/5 p-8 rounded-2xl hover:bg-white/10 transition-colors border border-white/5">
                          <Shield size={32} className="text-blue-400 mb-4" />
                          <h4 className="font-bold text-lg mb-2">Data Protection</h4>
                          <p className="text-sm text-gray-400">International security compliance standards with 100% encryption.</p>
                      </div>
                      <div className="bg-white/5 p-8 rounded-2xl hover:bg-white/10 transition-colors border border-white/5">
                          <Lock size={32} className="text-green-400 mb-4" />
                          <h4 className="font-bold text-lg mb-2">Privacy Standards</h4>
                          <p className="text-sm text-gray-400">Strict privacy policy to protect user data. We do not sell ads.</p>
                      </div>
                      <div className="bg-white/5 p-8 rounded-2xl hover:bg-white/10 transition-colors border border-white/5 sm:col-span-2">
                           <Server size={32} className="text-purple-400 mb-4" />
                           <h4 className="font-bold text-lg mb-2">Scalable Infrastructure</h4>
                           <p className="text-sm text-gray-400">SRXHUB owns and operates its own data centers. We do not run on public cloud.</p>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Expert Team Section */}
      <section className="py-24 bg-white border-b border-gray-200">
           <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-16">
               <div className="lg:w-1/2 p-8 bg-blue-50 rounded-3xl">
                   <h3 className="text-xs font-bold text-brand-blue uppercase tracking-widest mb-4">ENTERPRISE BUSINESS SOLUTIONS</h3>
                   <h2 className="text-3xl font-bold text-gray-900 mb-4">Work with our in-house team of experts</h2>
                   <p className="text-gray-600 mb-8 leading-relaxed">The enterprise services team comes with the product insight and specialized industry knowledge tailored to the unique business needs of your company.</p>
                   <Link to="/contact" className="text-brand-blue font-bold text-sm hover:underline flex items-center">LEARN MORE ABOUT EBS <ArrowRight size={14} className="ml-1" /></Link>
               </div>
               <div className="lg:w-1/2 p-8 bg-gray-50 rounded-3xl">
                   <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">SI PARTNERS</h3>
                   <h2 className="text-3xl font-bold text-gray-900 mb-4">Get up and running with our global partner network</h2>
                   <p className="text-gray-600 mb-8 leading-relaxed">Team up with world-class experts who will partner with you on a comprehensive strategy for deployment.</p>
                   <div className="flex gap-8 opacity-50 grayscale mb-8">
                       <span className="text-xl font-bold">PwC</span>
                       <span className="text-xl font-bold">Deloitte</span>
                       <span className="text-xl font-bold">Tata</span>
                   </div>
                   <Link to="/partners" className="bg-brand-blue text-white font-bold py-3 px-8 rounded-xl text-sm hover:bg-blue-700 transition-colors inline-block shadow-lg">EXPLORE MORE</Link>
               </div>
           </div>
      </section>
    </div>
  );
};

export default Enterprise;
