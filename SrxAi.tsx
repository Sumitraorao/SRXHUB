
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Zap, MessageSquare, Bot, ArrowRight, Brain, Code, 
  Image as ImageIcon, BarChart, ShieldCheck, Database, 
  Cpu, Layers, Sparkles, X, CheckCircle2
} from 'lucide-react';

const SrxAi: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFeature, setSelectedFeature] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    industry: '',
    email: '',
    challenge: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleScrollToFeatures = () => {
      document.getElementById('ai-features')?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
       { 
         id: 'reasoning',
         icon: Brain, 
         label: 'Deep Reasoning', 
         desc: 'Analyzes complex scenarios.',
         detail: 'SrxAI utilizes chain-of-thought processing to break down complex business problems into solvable steps. It can evaluate market strategies, deduce logistical bottlenecks, and provide reasoned arguments for critical decisions.',
         color: 'text-pink-400',
         bg: 'bg-pink-900/20'
       },
       { 
         id: 'code',
         icon: Code, 
         label: 'Code Generation', 
         desc: 'Builds apps & scripts instantly.',
         detail: 'From Python scripts for data automation to full React components for your frontend. SrxAI understands your existing codebase context and generates clean, production-ready code with comments.',
         color: 'text-blue-400',
         bg: 'bg-blue-900/20'
       },
       { 
         id: 'visual',
         icon: ImageIcon, 
         label: 'Visual Creation', 
         desc: 'Generates images & designs.',
         detail: 'Need marketing assets or dashboard mockups? SrxAI can generate high-fidelity images, edit existing photos, and create design layouts based on simple text descriptions.',
         color: 'text-purple-400',
         bg: 'bg-purple-900/20'
       },
       { 
         id: 'data',
         icon: BarChart, 
         label: 'Data Analytics', 
         desc: 'Turns raw data into insights.',
         detail: 'Connect your CRM and Finance data. SrxAI will automatically detect trends, forecast revenue, identify anomalies, and visualize the data in interactive charts.',
         color: 'text-green-400',
         bg: 'bg-green-900/20'
       },
       { 
         id: 'translation',
         icon: MessageSquare, 
         label: 'Translation', 
         desc: 'Real-time multi-language support.',
         detail: 'Break language barriers with enterprise-grade translation. SrxAI supports over 95 languages with nuance preservation, making it perfect for global support teams.',
         color: 'text-yellow-400',
         bg: 'bg-yellow-900/20'
       },
       { 
         id: 'security',
         icon: ShieldCheck, 
         label: 'Security Analysis', 
         desc: 'Predicts & prevents threats.',
         detail: 'SrxAI proactively scans your workflows and files for vulnerabilities. It suggests patch fixes, detects phishing attempts in real-time, and ensures compliance with global standards.',
         color: 'text-red-400',
         bg: 'bg-red-900/20'
       },
       { 
         id: 'knowledge',
         icon: Database, 
         label: 'Knowledge Retrieval', 
         desc: 'Instant answers from your docs.',
         detail: 'Stop searching through folders. SrxAI indexes all your PDFs, Docs, and wikis. Ask a question, and it retrieves the exact paragraph and source link instantly.',
         color: 'text-cyan-400',
         bg: 'bg-cyan-900/20'
       },
       { 
         id: 'auto',
         icon: Cpu, 
         label: 'Auto-Automation', 
         desc: 'Self-correcting workflows.',
         detail: 'SrxAI doesn\'t just follow rules; it optimizes them. It can identify repetitive tasks in your daily routine and suggest or build automated workflows to handle them.',
         color: 'text-orange-400',
         bg: 'bg-orange-900/20'
       },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-white">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
             {/* Abstract blobs */}
             <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-200/30 rounded-full blur-[100px]"></div>
             <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
            <motion.div
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1 }}
               className="mb-8 flex justify-center"
            >
               {/* Animated AI Orb */}
               <div className="relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center">
                   {/* Spinning Gradient Border */}
                   <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-400 via-purple-400 to-white opacity-50 blur-md p-1"
                   >
                       <div className="w-full h-full bg-white rounded-full"></div>
                   </motion.div>
                   
                   {/* Core White Circle */}
                   <motion.div 
                      className="absolute inset-2 rounded-full bg-white shadow-2xl flex items-center justify-center overflow-hidden border-4 border-white z-10"
                   >
                       <div className="w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center relative">
                          <span className="text-6xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 tracking-tight">
                             SRX
                          </span>
                       </div>
                   </motion.div>
                   
                   {/* Orbiting Dot */}
                   <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-[-10px] rounded-full"
                   >
                       <div className="absolute top-0 left-1/2 w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)] border-2 border-white"></div>
                   </motion.div>
               </div>
            </motion.div>

            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 }}
            >
                <div className="inline-block mb-4 px-6 py-2 bg-white border border-blue-100 rounded-full shadow-sm">
                    <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 flex items-center tracking-widest uppercase">
                        <Sparkles size={14} className="mr-2 text-purple-500" /> Generative AI for Business
                    </span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
                    Meet SrxAI, <br/> your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">All-in-One AI</span> assistant
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                    SrxAI's advanced AI is equipped with a range of skills to help you in all areas of your business. Whether SrxAI is working behind the scenes, or actively responding to queries and requests.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button 
                        onClick={handleScrollToFeatures}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-10 rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center"
                    >
                        EXPLORE SRXAI <ArrowRight size={20} className="ml-2" />
                    </button>
                    <Link 
                        to="/ai/chat"
                        className="bg-white border-2 border-purple-600 text-purple-600 font-bold py-4 px-10 rounded-full shadow-md hover:bg-purple-50 transition-all flex items-center justify-center"
                    >
                        TRY SRXAI (BETA)
                    </Link>
                </div>
            </motion.div>
        </div>
      </section>

      {/* 3 Core Pillars Section */}
      <section id="ai-features" className="py-20 bg-white relative -mt-20 z-20">
          <div className="max-w-7xl mx-auto px-4">
              <motion.div 
                 variants={staggerContainer}
                 initial="hidden"
                 whileInView="visible"
                 viewport={{ once: true }}
                 className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                  {[
                      { 
                          title: 'SrxAI Skills', 
                          desc: 'Powerful AI features threaded throughout the entire SRXHUB ecosystem to automate tasks.', 
                          icon: Zap, 
                          color: 'text-yellow-500', 
                          bg: 'bg-yellow-50',
                          border: 'border-yellow-100'
                      },
                      { 
                          title: 'Ask SrxAI', 
                          desc: 'Conversational personal assistant, designed to boost your productivity with natural language.', 
                          icon: MessageSquare, 
                          color: 'text-green-500', 
                          bg: 'bg-green-50',
                          border: 'border-green-100'
                      },
                      { 
                          title: 'SrxAI Agents', 
                          desc: 'Purpose-built AI Agents to support specific business processes autonomously.', 
                          icon: Bot, 
                          color: 'text-purple-500', 
                          bg: 'bg-purple-50',
                          border: 'border-purple-100'
                      },
                  ].map((card, idx) => (
                      <motion.div 
                         key={idx} 
                         variants={fadeInUp}
                         whileHover={{ y: -10 }}
                         className={`bg-white p-10 rounded-3xl shadow-xl border ${card.border} text-center flex flex-col items-center`}
                      >
                          <div className={`w-20 h-20 ${card.bg} rounded-full flex items-center justify-center mb-6`}>
                              <card.icon className={card.color} size={40} />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-4">{card.title}</h3>
                          <p className="text-gray-600 leading-relaxed mb-8 flex-grow">
                              {card.desc}
                          </p>
                          <Link to="/ai/chat" className="text-blue-600 font-bold text-sm hover:underline flex items-center">
                              TRY NOW <ArrowRight size={14} className="ml-1" />
                          </Link>
                      </motion.div>
                  ))}
              </motion.div>
          </div>
      </section>

      {/* Capabilities / All-in-One Section - REPLACED DARK WITH INDIGO GRADIENT */}
      <section className="py-24 bg-gradient-to-br from-[#2e1065] via-[#4c1d95] to-[#1e1b4b] text-white overflow-hidden relative">
           {/* Background Grid */}
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/20 blur-[120px] rounded-full animate-blob"></div>
           <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/20 blur-[120px] rounded-full animate-blob animation-delay-2000"></div>

           <div className="max-w-7xl mx-auto px-4 relative z-10">
               <div className="text-center mb-16">
                   <h2 className="text-3xl md:text-5xl font-bold mb-6">One AI to rule them all</h2>
                   <p className="text-purple-200 text-lg max-w-3xl mx-auto">
                       SrxAI isn't just a chatbot. It's an integrated intelligence layer. 
                       <br/><span className="text-white font-bold">Click on a card below</span> to explore the capabilities.
                   </p>
               </div>

               <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                   {features.map((item, idx) => (
                       <motion.button 
                          key={idx}
                          layoutId={`card-${item.id}`}
                          onClick={() => setSelectedFeature(item)}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.05 }}
                          className="bg-white/10 border border-white/10 p-6 rounded-2xl text-left transition-all group cursor-pointer relative overflow-hidden h-full flex flex-col backdrop-blur-sm"
                       >
                           <div className={`absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity`}>
                               <ArrowRight size={16} className="text-white/50" />
                           </div>
                           <item.icon className={`${item.color} mb-4 group-hover:scale-110 transition-transform`} size={32} />
                           <h3 className="font-bold text-lg mb-2">{item.label}</h3>
                           <p className="text-sm text-purple-200">{item.desc}</p>
                       </motion.button>
                   ))}
               </div>
           </div>

           {/* EXPANDED CARD MODAL */}
           <AnimatePresence>
               {selectedFeature && (
                   <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                       <motion.div 
                           initial={{ opacity: 0 }} 
                           animate={{ opacity: 1 }} 
                           exit={{ opacity: 0 }}
                           onClick={() => setSelectedFeature(null)}
                           className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                       />
                       <motion.div 
                           layoutId={`card-${selectedFeature.id}`}
                           className="bg-gray-800 border border-gray-700 w-full max-w-lg rounded-3xl p-8 relative z-10 shadow-2xl overflow-hidden"
                       >
                           {/* Background Glow */}
                           <div className={`absolute top-0 right-0 w-64 h-64 ${selectedFeature.bg} rounded-full blur-[80px] -z-0 pointer-events-none`}></div>

                           <button 
                               onClick={() => setSelectedFeature(null)}
                               className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                           >
                               <X size={20} className="text-white" />
                           </button>

                           <div className="relative z-10">
                               <div className={`w-16 h-16 ${selectedFeature.bg} rounded-2xl flex items-center justify-center mb-6`}>
                                   <selectedFeature.icon size={40} className={selectedFeature.color} />
                               </div>
                               
                               <h3 className="text-3xl font-bold text-white mb-2">{selectedFeature.label}</h3>
                               <p className="text-blue-300 font-medium mb-6">{selectedFeature.desc}</p>
                               
                               <p className="text-gray-300 leading-relaxed text-lg mb-8">
                                   {selectedFeature.detail}
                               </p>

                               <div className="flex gap-4">
                                   <Link 
                                     to="/ai/chat" 
                                     className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl text-center transition-colors flex items-center justify-center"
                                   >
                                       Try {selectedFeature.label} <ArrowRight size={18} className="ml-2" />
                                   </Link>
                               </div>
                           </div>
                       </motion.div>
                   </div>
               )}
           </AnimatePresence>
      </section>

      {/* Unique Approach Section */}
      <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-20">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">What makes SRXHUB's approach to AI unique?</h2>
                  <p className="text-gray-600">Our shared data model, owned tech stack, and broad application portfolio are our greatest assets.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="p-8"
                  >
                      <div className="mb-6 flex justify-center">
                          <Layers size={64} className="text-blue-200" strokeWidth={1} />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Breadth of SrxAI's offerings</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                          SrxAI's multi-product AI ecosystem has the innate capacity to leverage a truly diverse set of data, improving decision making and process automation across industries and geographies.
                      </p>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-8 border-x border-gray-200"
                  >
                      <div className="mb-6 flex justify-center">
                          <Database size={64} className="text-purple-200" strokeWidth={1} />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Depth of SRXHUB's in-house tech stack</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                          Unlike many other AI providers, SRXHUB owns all layers of our technology stack—from the data center infrastructure up through the application layer. This allows us to innovate rapidly.
                      </p>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="p-8"
                  >
                      <div className="mb-6 flex justify-center">
                          <ShieldCheck size={64} className="text-green-200" strokeWidth={1} />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Private AI</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                          SRXHUB's fully owned tech stack enables AI solutions that train on your data and run on your data without ever exposing it to external vendors' models. Your data stays yours.
                      </p>
                      <a href="#" className="text-blue-600 font-bold text-xs mt-4 block uppercase tracking-wide">Learn about privacy commitment &gt;</a>
                  </motion.div>
              </div>
          </div>
      </section>

      {/* Partner Form Section */}
      <section className="py-24 bg-white relative">
          <div className="max-w-4xl mx-auto px-4">
              <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Do you have a unique AI business use case?</h2>
                  <h1 className="text-5xl font-bold text-gray-900 mb-6">Partner with us to develop it!</h1>
                  <p className="text-gray-600 text-lg leading-relaxed">
                      SrxAI's solutions team is looking for real-world problems that can be solved with AI, so we're inviting businesses of all sizes to share their requirements.
                  </p>
              </div>

              <motion.div 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="bg-gray-50 p-10 rounded-2xl shadow-lg border border-gray-100"
              >
                  <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                              <label className="block text-sm font-bold text-gray-700 mb-1">First Name *</label>
                              <input 
                                 type="text" 
                                 name="firstName"
                                 className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" 
                                 onChange={handleChange}
                              />
                          </div>
                          <div>
                              <label className="block text-sm font-bold text-gray-700 mb-1">Last Name *</label>
                              <input 
                                 type="text" 
                                 name="lastName"
                                 className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" 
                                 onChange={handleChange}
                              />
                          </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                              <label className="block text-sm font-bold text-gray-700 mb-1">Company Name *</label>
                              <input 
                                 type="text" 
                                 name="company"
                                 className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" 
                                 onChange={handleChange}
                              />
                          </div>
                          <div>
                              <label className="block text-sm font-bold text-gray-700 mb-1">Industry *</label>
                              <select 
                                 name="industry"
                                 className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white" 
                                 onChange={handleChange}
                              >
                                  <option value="">Select Industry</option>
                                  <option value="tech">Technology</option>
                                  <option value="finance">Finance</option>
                                  <option value="retail">Retail</option>
                                  <option value="healthcare">Healthcare</option>
                              </select>
                          </div>
                      </div>

                      <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">Work Email *</label>
                          <input 
                             type="email" 
                             name="email"
                             className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" 
                             onChange={handleChange}
                          />
                      </div>

                      <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">What business challenge would you like to solve with SrxAI? *</label>
                          <textarea 
                             name="challenge"
                             rows={4}
                             className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" 
                             onChange={handleChange}
                          ></textarea>
                      </div>

                      <div className="pt-4">
                          <button className="w-full bg-brand-red text-white font-bold py-4 rounded-lg shadow-md hover:bg-brand-darkRed transition-colors">
                              SUBMIT
                          </button>
                      </div>
                      
                      <p className="text-xs text-center text-gray-500 mt-4">
                          By submitting this form, you agree to the processing of personal data according to our Privacy Policy.
                      </p>
                  </form>
              </motion.div>
          </div>
      </section>

      {/* Talk to Expert CTA */}
      <section className="py-12 bg-blue-600 text-white text-center">
           <h2 className="text-2xl font-bold mb-6">Ready to transform your business with AI?</h2>
           <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors">
               TALK TO AN SOLUTIONS EXPERT
           </button>
      </section>

    </div>
  );
};

export default SrxAi;
