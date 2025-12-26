
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Smartphone, Layers, Code, Zap, Globe, Cloud, CheckCircle } from 'lucide-react';

const MobileApps: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  
  return (
    <div className="bg-white min-h-screen font-sans overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-[#1e1b4b] text-white overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#4c1d95] z-0"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0"></div>
          
          {/* Animated Blobs */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[100px] animate-blob mix-blend-overlay"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-[100px] animate-blob animation-delay-2000 mix-blend-overlay"></div>

          <motion.div 
            style={{ scale }}
            className="absolute inset-0 bg-gradient-to-t from-[#1e1b4b] to-transparent z-0 opacity-80" 
          />
          
          <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
              <motion.div
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8 }}
              >
                  <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-8 backdrop-blur-md border border-white/20 shadow-2xl">
                      <Smartphone size={40} className="text-cyan-300" />
                  </div>
                  <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                      Your Business. <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-400">On the Go.</span>
                  </h1>
                  <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed">
                      Experience the power of SRXHUB apps anywhere. Native performance, offline capabilities, and seamless sync.
                  </p>
                  <div className="flex justify-center space-x-4">
                      <button className="bg-white text-[#1e1b4b] font-bold py-4 px-8 rounded-full hover:bg-cyan-50 transition-all hover:-translate-y-1 shadow-lg">
                          App Store
                      </button>
                      <button className="bg-transparent border-2 border-white/30 text-white font-bold py-4 px-8 rounded-full hover:bg-white/10 transition-all backdrop-blur-sm">
                          Google Play
                      </button>
                  </div>
              </motion.div>
          </div>
      </section>

      {/* Animated Process Section */}
      <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-20">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">How we craft mobile experiences</h2>
                  <p className="text-gray-500">A look inside our development engine.</p>
              </div>

              <div className="space-y-32">
                  {/* Step 1: Design */}
                  <div className="flex flex-col md:flex-row items-center gap-16">
                      <motion.div 
                         initial={{ opacity: 0, x: -50 }}
                         whileInView={{ opacity: 1, x: 0 }}
                         viewport={{ once: true }}
                         className="md:w-1/2"
                      >
                          <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-purple-600">
                              <Layers size={32} />
                          </div>
                          <h3 className="text-3xl font-bold mb-4">Intuitive Design</h3>
                          <p className="text-gray-600 text-lg leading-relaxed">
                              We start with user-centric wireframes. Our interfaces are designed for touch, ensuring that every tap and swipe feels natural and responsive.
                          </p>
                      </motion.div>
                      <motion.div 
                         initial={{ opacity: 0, scale: 0.8 }}
                         whileInView={{ opacity: 1, scale: 1 }}
                         viewport={{ once: true }}
                         className="md:w-1/2 bg-gray-50 rounded-3xl p-10 flex justify-center relative overflow-hidden"
                      >
                           {/* Animated UI Elements simulation */}
                           <div className="w-64 h-[500px] border-8 border-gray-800 rounded-[3rem] bg-white shadow-2xl relative z-10 overflow-hidden">
                               <div className="absolute top-0 left-0 right-0 h-6 bg-gray-800 rounded-b-xl mx-auto w-32"></div>
                               <div className="p-4 pt-12 space-y-4">
                                   <motion.div 
                                      animate={{ width: ["0%", "100%"] }}
                                      transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                                      className="h-4 bg-gray-200 rounded w-3/4" 
                                   />
                                   <div className="grid grid-cols-2 gap-2">
                                       <motion.div 
                                          animate={{ scale: [0.8, 1] }}
                                          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                                          className="h-24 bg-purple-100 rounded-xl" 
                                       />
                                       <motion.div 
                                          animate={{ scale: [0.8, 1] }}
                                          transition={{ duration: 0.5, delay: 0.2, repeat: Infinity, repeatDelay: 2 }}
                                          className="h-24 bg-blue-100 rounded-xl" 
                                       />
                                   </div>
                               </div>
                           </div>
                      </motion.div>
                  </div>

                  {/* Step 2: Develop */}
                  <div className="flex flex-col md:flex-row-reverse items-center gap-16">
                      <motion.div 
                         initial={{ opacity: 0, x: 50 }}
                         whileInView={{ opacity: 1, x: 0 }}
                         viewport={{ once: true }}
                         className="md:w-1/2"
                      >
                          <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                              <Code size={32} />
                          </div>
                          <h3 className="text-3xl font-bold mb-4">Native Performance</h3>
                          <p className="text-gray-600 text-lg leading-relaxed">
                              Built with swift, native technologies. Our apps are optimized for battery life and speed, ensuring you can work without lag.
                          </p>
                      </motion.div>
                      <motion.div 
                         initial={{ opacity: 0, x: -50 }}
                         whileInView={{ opacity: 1, x: 0 }}
                         viewport={{ once: true }}
                         className="md:w-1/2 bg-gray-900 rounded-3xl p-10 shadow-2xl"
                      >
                          <div className="font-mono text-sm text-green-400">
                              <p className="mb-2">{`> initializing_core_modules...`}</p>
                              <p className="mb-2">{`> optimizing_assets...`}</p>
                              <p className="mb-2 text-white">{`const App = () => {`}</p>
                              <p className="pl-4 mb-2 text-blue-300">{`return (`}</p>
                              <p className="pl-8 mb-2 text-purple-300">{`<SRXHUB_Mobile />`}</p>
                              <p className="pl-4 mb-2 text-blue-300">{`);`}</p>
                              <p className="mb-2 text-white">{`}`}</p>
                              <motion.span 
                                animate={{ opacity: [0, 1] }}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="inline-block w-3 h-5 bg-green-400 align-middle"
                              />
                          </div>
                      </motion.div>
                  </div>

                  {/* Step 3: Sync */}
                  <div className="flex flex-col md:flex-row items-center gap-16">
                      <motion.div 
                         initial={{ opacity: 0, x: -50 }}
                         whileInView={{ opacity: 1, x: 0 }}
                         viewport={{ once: true }}
                         className="md:w-1/2"
                      >
                          <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-green-600">
                              <Cloud size={32} />
                          </div>
                          <h3 className="text-3xl font-bold mb-4">Real-time Sync</h3>
                          <p className="text-gray-600 text-lg leading-relaxed">
                              Changes made on mobile reflect instantly on web. Offline mode ensures you can keep working even when the internet drops.
                          </p>
                      </motion.div>
                      <motion.div 
                         className="md:w-1/2 flex justify-center items-center"
                      >
                           <div className="relative">
                               <motion.div 
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                  className="w-64 h-64 border-4 border-dashed border-gray-300 rounded-full"
                               />
                               <div className="absolute inset-0 flex items-center justify-center">
                                   <Globe size={64} className="text-blue-500" />
                               </div>
                               <motion.div 
                                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
                                  animate={{ rotate: -360 }}
                                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                               >
                                  <Smartphone size={24} className="text-gray-600" />
                               </motion.div>
                           </div>
                      </motion.div>
                  </div>
              </div>
          </div>
      </section>

    </div>
  );
};

export default MobileApps;
