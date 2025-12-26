
import React, { useState, useEffect } from 'react';
import { Play, ArrowRight, ShieldCheck, Heart, Zap, Globe, ChevronRight, Users, Linkedin, Mail, MapPin, FileText, Download, Award } from 'lucide-react';
import { getRandomImage } from '../constants';
import { motion, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';

// Animation Variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export const SrxOneSection: React.FC = () => {
  const profileImage = "https://media.licdn.com/dms/image/v2/D4D03AQFiEHOT-b1g0g/profile-displayphoto-scale_200_200/B4DZp3niyQKQAY-/0/1762943452042?e=1767225600&v=beta&t=RK_Q74lu00CaibzsMewWdYoAyBAP31pYy0UfHtfg5no"; 

  return (
    <section className="relative overflow-hidden py-24 border-b border-white/10 bg-gradient-to-br from-indigo-900 via-[#1e1b4b] to-purple-900 text-white">
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] animate-blob"></div>
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] animate-blob animation-delay-4000"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="flex flex-col md:flex-row items-center gap-16">
            
            {/* Left Column: Text Info */}
            <motion.div 
              className="md:w-1/2 z-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
                <motion.div variants={fadeInUp} className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-sm font-bold text-blue-100 mb-6 shadow-lg shadow-indigo-900/20">
                    <span className="relative flex h-2 w-2 mr-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Open to Opportunities
                </motion.div>

                <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold font-serif mb-2 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-indigo-200">
                    Sumit Rao
                </motion.h1>
                <motion.h2 variants={fadeInUp} className="text-xl md:text-2xl text-blue-200 font-light mb-6">
                    Accountant | Data Analyst | Automation Specialist
                </motion.h2>

                <motion.p variants={fadeInUp} className="text-lg text-blue-100/80 mb-8 leading-relaxed max-w-lg border-l-4 border-blue-500 pl-6 backdrop-blur-sm bg-white/5 rounded-r-lg p-4">
                    I am a detail-oriented professional specializing in accounting, cash flow management, and statistical data analysis. Currently driving financial accuracy at <span className="text-white font-bold">Honda Motorcycle & Scooter India Pvt. Ltd.</span>
                </motion.p>

                {/* Skills Tags */}
                <motion.div variants={fadeInUp} className="flex flex-wrap gap-2 mb-10">
                    {['Excel', 'Tally', 'Power BI', 'Automation', 'Reconciliation', 'Data Analysis'].map((skill) => (
                        <span key={skill} className="px-4 py-1.5 bg-indigo-500/20 border border-indigo-400/30 rounded-lg text-xs font-bold tracking-wide text-indigo-100 hover:bg-indigo-500/30 hover:border-indigo-400/50 transition-all cursor-default shadow-sm">
                            {skill}
                        </span>
                    ))}
                </motion.div>
                
                <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4">
                    <a 
                        href="https://www.linkedin.com/in/sumit-rao-0a16a6253" 
                        target="_blank" 
                        rel="noreferrer"
                        className="bg-[#0077b5] hover:bg-[#006396] text-white font-bold py-3.5 px-8 rounded-xl transition-all hover:-translate-y-1 shadow-xl hover:shadow-blue-900/50 flex items-center group"
                    >
                        <Linkedin size={20} className="mr-2 group-hover:animate-bounce" />
                        Connect on LinkedIn
                    </a>
                    <a 
                        href="mailto:sr9723612@gmail.com"
                        className="bg-white/10 hover:bg-white/20 text-white font-bold py-3.5 px-8 rounded-xl transition-all hover:-translate-y-1 backdrop-blur-md border border-white/20 flex items-center group shadow-lg"
                    >
                        <Mail size={20} className="mr-2 group-hover:text-yellow-400 transition-colors" />
                        Email Me
                    </a>
                </motion.div>

                <motion.div variants={fadeInUp} className="mt-8 flex items-center text-blue-300 text-sm font-medium">
                    <MapPin size={16} className="mr-2 text-red-400" />
                    Bhopal, Madhya Pradesh, India
                </motion.div>
            </motion.div>

            {/* Right Column: Profile Image with Advanced Animation */}
            <motion.div 
                className="md:w-1/2 relative flex justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96">
                    {/* Pulsing Background */}
                    <div className="absolute inset-0 bg-indigo-500/30 rounded-full blur-3xl animate-pulse"></div>

                    {/* Animated Rotating Rings - Outer Dashed */}
                    <motion.div 
                       animate={{ rotate: 360 }}
                       transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                       className="absolute -inset-10 border border-dashed border-indigo-400/30 rounded-full"
                    />
                    
                    {/* Animated Rotating Rings - Middle Solid */}
                    <motion.div 
                       animate={{ rotate: -360 }}
                       transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                       className="absolute -inset-4 border border-blue-400/20 rounded-full"
                    />

                     {/* Static Glow Ring */}
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 blur-sm opacity-60"></div>
                    
                    {/* Image Container */}
                    <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl bg-[#1e1b4b] z-10 group">
                        <motion.img 
                            src={profileImage} 
                            alt="Sumit Rao" 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        />
                        {/* Gradient Overlay on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                </div>
            </motion.div>

        </div>
      </div>
    </section>
  );
};

export const TrustedBySection: React.FC = () => {
  const logos = ["IIFL FINANCE", "SpiceJet", "L'OREAL", "amazon", "TATA PLAY", "zomato", "MAX LIFE"];
  return (
    <div className="bg-white py-12 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-gray-400 text-xs font-bold tracking-[0.2em] mb-8 uppercase"
        >
          Brands that Trust Us
        </motion.p>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500"
        >
          {logos.map((logo, idx) => (
            <motion.span 
              key={idx} 
              variants={fadeInUp}
              className="text-xl md:text-2xl font-bold text-gray-800"
            >
              {logo}
            </motion.span>
          ))}
        </motion.div>
        <div className="mt-8 text-center">
            <Link to="/customers" className="text-blue-600 font-semibold text-sm hover:underline flex items-center justify-center">
                CUSTOMER STORIES <ChevronRight size={14} />
            </Link>
        </div>
      </div>
    </div>
  );
};

export const AiSection: React.FC = () => {
  const [aiImage, setAiImage] = useState('');
  
  useEffect(() => {
      setAiImage(getRandomImage('tech'));
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-purple-50 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center px-4">
        <motion.div
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true }}
           variants={fadeInUp}
        >
          <div className="inline-block p-3 rounded-full bg-purple-100 mb-6">
              <Zap className="text-purple-600" size={32} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Multiply the impact of your workforce with SrxAI, <br/>
            <span className="text-purple-600">SRXHUB's powerful AI assistant</span>
          </h2>
          <p className="text-gray-600 text-lg mb-10 leading-relaxed">
            Built into the fabric of SRXHUB's app ecosystem, SrxAI makes recommendations, generates insights, and takes action based on the full context of your business operations.
          </p>
          <Link 
            to="/ai"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition-all hover:shadow-lg hover:-translate-y-1 inline-flex items-center mx-auto"
          >
            EXPLORE SRXAI <ArrowRight size={18} className="ml-2" />
          </Link>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16"
        >
            {aiImage && (
                <img src={aiImage} alt="AI Dashboard" className="rounded-xl shadow-2xl mx-auto border border-gray-200" />
            )}
        </motion.div>
      </div>
    </section>
  );
};

export const EnterpriseSection: React.FC = () => {
    const [entImage, setEntImage] = useState('');
    
    useEffect(() => {
        setEntImage(getRandomImage('office'));
    }, []);

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
                <motion.div 
                   className="md:w-1/2"
                   initial={{ opacity: 0, x: -50 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.8 }}
                >
                    {entImage && (
                        <img src={entImage} alt="Enterprise" className="rounded-lg shadow-xl" />
                    )}
                </motion.div>
                <motion.div 
                   className="md:w-1/2"
                   initial={{ opacity: 0, x: 50 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.8 }}
                >
                    <div className="flex items-center space-x-2 mb-4">
                        <div className="bg-green-100 text-green-800 font-bold px-3 py-1 rounded text-xs uppercase">SRXHUB For</div>
                        <h3 className="text-3xl font-bold text-gray-900">Enterprise</h3>
                    </div>
                    <p className="text-xl text-gray-700 mb-6 font-light">
                        Experience the breadth and depth of the SRXHUB ecosystem, with the professional services, infrastructure, support, and security that a large business needs.
                    </p>
                    <Link to="/enterprise" className="inline-flex items-center bg-blue-700 text-white font-bold py-3 px-6 rounded hover:bg-blue-800 transition-colors shadow-md hover:shadow-lg">
                        LEARN MORE <ArrowRight size={18} className="ml-2" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

export const PrivacySection: React.FC = () => {
    return (
        <section className="py-24 bg-gray-50 text-center">
            <motion.div 
               className="max-w-3xl mx-auto px-4"
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               variants={fadeInUp}
            >
                <ShieldCheck size={48} className="text-gray-400 mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Your privacy is our responsibility</h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                    We believe that trust is paramount in a relationship. We do not own or sell your data, and we most certainly do not bank on advertising-based business models. The only way we make money is from the software license fees you pay us.
                </p>
                <Link to="/security" className="border-2 border-gray-300 text-gray-600 hover:border-gray-800 hover:text-gray-900 font-bold py-3 px-8 rounded transition-colors inline-flex items-center mx-auto">
                    <Play size={16} className="mr-2" /> WATCH VIDEO
                </Link>
            </motion.div>
        </section>
    )
}

export const ValuesSection: React.FC = () => {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <motion.h2 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   className="text-3xl md:text-4xl font-serif text-center mb-16 text-gray-900"
                >
                   The core values and<br/>principles that drive us
                </motion.h2>
                
                <motion.div 
                   className="grid grid-cols-1 md:grid-cols-3 gap-12"
                   initial="hidden"
                   whileInView="visible"
                   viewport={{ once: true }}
                   variants={staggerContainer}
                >
                    <motion.div variants={fadeInUp} className="text-center p-6 rounded-2xl hover:bg-red-50 transition-colors duration-300">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Heart className="text-red-500" size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-4">Long-term commitment</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">25+ years of running a profitable organization gives us a good sense of challenges that a growing business faces.</p>
                    </motion.div>
                    <motion.div variants={fadeInUp} className="text-center p-6 rounded-2xl hover:bg-blue-50 transition-colors duration-300">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Globe className="text-blue-500" size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-4">Focus on research and development</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">Software is our craft and we back it up with our relentless investments in R&D.</p>
                    </motion.div>
                    <motion.div variants={fadeInUp} className="text-center p-6 rounded-2xl hover:bg-green-50 transition-colors duration-300">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Users className="text-green-500" size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-4">Customer-first philosophy</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">In all these years, it's our customers' trust and goodwill that has helped us establish a strong position in the market.</p>
                    </motion.div>
                </motion.div>
                
                <motion.div 
                   initial={{ opacity: 0 }}
                   whileInView={{ opacity: 1 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.5 }}
                   className="text-center mt-12"
                >
                    <Link to="/customers" className="bg-blue-600 text-white font-bold py-3 px-8 rounded hover:bg-blue-700 transition-colors shadow-md">
                        READ OUR STORY
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
