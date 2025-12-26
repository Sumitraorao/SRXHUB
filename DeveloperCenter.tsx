
import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Database, Server, Code2, Cpu, Share2, ArrowRight } from 'lucide-react';

const DeveloperCenter: React.FC = () => {
  return (
    <div className="bg-[#0f172a] min-h-screen font-sans text-slate-300 selection:bg-cyan-500 selection:text-white">
      
      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
          {/* Animated Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_90%)]"></div>
          
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/20 blur-[120px] rounded-full pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
              <motion.div
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.8 }}
                 className="inline-block p-4 rounded-full bg-cyan-950/50 border border-cyan-500/30 mb-8 backdrop-blur-md"
              >
                  <Terminal className="text-cyan-400" size={32} />
              </motion.div>
              
              <motion.h1 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, delay: 0.2 }}
                 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
              >
                  Build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Future.</span>
              </motion.h1>
              
              <motion.p 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ duration: 0.8, delay: 0.4 }}
                 className="text-xl max-w-3xl mx-auto mb-10 text-slate-400"
              >
                  Access our robust APIs, SDKs, and developer tools to extend SRXHUB's capabilities or build entirely new solutions.
              </motion.p>
              
              <div className="flex justify-center gap-4">
                  <button className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center shadow-lg hover:shadow-cyan-500/25">
                      Read the Docs <ArrowRight size={16} className="ml-2" />
                  </button>
                  <button className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-lg transition-colors backdrop-blur-sm border border-white/10">
                      Get API Key
                  </button>
              </div>
          </div>
      </section>

      {/* API Visualization */}
      <section className="py-24 border-y border-cyan-900/30 bg-[#0b1120] relative">
          <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div>
                      <h2 className="text-3xl font-bold text-white mb-6">Unified API Architecture</h2>
                      <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                          One token, infinite possibilities. Our RESTful APIs allow you to interact with data across CRM, Books, and People seamlessly.
                      </p>
                      
                      <div className="space-y-6">
                          {[
                              { icon: Database, title: 'Consistent Data Models', desc: 'Standardized JSON responses across all services.' },
                              { icon: ShieldCheck, title: 'OAuth 2.0 Security', desc: 'Enterprise-grade authentication and scoping.' },
                              { icon: Zap, title: 'High Performance', desc: 'Low latency edge caching for global apps.' }
                          ].map((feat, idx) => (
                              <div key={idx} className="flex items-start">
                                  <div className="mt-1 bg-cyan-900/30 p-2 rounded-lg mr-4 border border-cyan-800">
                                      <feat.icon className="text-cyan-400" size={20} />
                                  </div>
                                  <div>
                                      <h4 className="text-white font-bold">{feat.title}</h4>
                                      <p className="text-sm text-slate-500">{feat.desc}</p>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>

                  {/* Animated Code Terminal */}
                  <motion.div 
                     initial={{ opacity: 0, x: 50 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     className="bg-[#1e293b] rounded-xl overflow-hidden shadow-2xl border border-slate-700"
                  >
                      <div className="flex items-center px-4 py-3 bg-[#0f172a] border-b border-slate-700">
                          <div className="flex space-x-2">
                              <div className="w-3 h-3 rounded-full bg-red-500"></div>
                              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                              <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          </div>
                          <div className="ml-4 text-xs text-slate-500 font-mono">bash — 80x24</div>
                      </div>
                      <div className="p-6 font-mono text-sm text-slate-300">
                          <div className="mb-4">
                              <span className="text-green-400">$</span> curl -X POST https://api.srxhub.com/v1/leads \
                          </div>
                          <div className="pl-4 text-cyan-300 mb-4">
                              -H "Authorization: Bearer {`<TOKEN>`}" \ <br/>
                              -d '{`{"name": "New Lead", "company": "Tech Corp"}`}'
                          </div>
                          <div className="text-yellow-300 mb-2">{`{`}</div>
                          <div className="pl-4 text-slate-400">
                              <span className="text-purple-400">"status"</span>: <span className="text-green-300">"success"</span>,<br/>
                              <span className="text-purple-400">"id"</span>: <span className="text-cyan-300">"lead_88239"</span>,<br/>
                              <span className="text-purple-400">"created_at"</span>: <span className="text-cyan-300">"2025-01-15T10:00:00Z"</span>
                          </div>
                          <div className="text-yellow-300">{`}`}</div>
                          <motion.div 
                             animate={{ opacity: [0, 1] }}
                             transition={{ repeat: Infinity, duration: 0.8 }}
                             className="inline-block w-2 h-4 bg-cyan-500 mt-4"
                          />
                      </div>
                  </motion.div>
              </div>
          </div>
      </section>

      {/* SDKs Section */}
      <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold text-white mb-16">SDKs for your stack</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {[
                      { name: 'Node.js', icon: Server },
                      { name: 'Python', icon: Code2 },
                      { name: 'Java', icon: Cpu },
                      { name: 'Go', icon: Share2 },
                  ].map((sdk, idx) => (
                      <motion.div 
                         key={idx}
                         whileHover={{ scale: 1.05, backgroundColor: 'rgba(56,189,248,0.05)' }}
                         className="p-8 border border-white/10 rounded-2xl flex flex-col items-center transition-all cursor-pointer group"
                      >
                          <sdk.icon size={48} className="text-slate-500 mb-4 group-hover:text-cyan-400 transition-colors" />
                          <h3 className="text-xl font-bold text-white">{sdk.name}</h3>
                      </motion.div>
                  ))}
              </div>
          </div>
      </section>
    </div>
  );
};

// Helper for icon component in API section
import { ShieldCheck, Zap } from 'lucide-react';

export default DeveloperCenter;
