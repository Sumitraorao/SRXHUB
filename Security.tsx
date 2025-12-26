
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, Variants } from 'framer-motion';
import { 
  ShieldCheck, Lock, Smartphone, Mail, UserCheck, 
  Eye, ArrowRight, Shield, CheckCircle, Server, Globe
} from 'lucide-react';
import { getRandomImage } from '../constants';
import { Link, useNavigate } from 'react-router-dom';

// --- Animation Components ---

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// --- DEPARTMENT SPECIFIC IMAGE POOLS ---
const DEPARTMENT_IMAGES = {
  browser: [
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=1200", // Laptop working
    "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200", // Digital Security
    "https://images.unsplash.com/photo-1555421654-e74dc4d28d2d?auto=format&fit=crop&q=80&w=1200", // Monitor Security
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200"  // Cyber Tech
  ],
  password: [
    "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=1200", // Digital Lock code
    "https://images.unsplash.com/photo-1589652717521-10c0d092dea9?auto=format&fit=crop&q=80&w=1200", // Physical Key
    "https://images.unsplash.com/photo-1618060932014-4deda4932554?auto=format&fit=crop&q=80&w=1200", // Abstract Vault
    "https://images.unsplash.com/photo-1603899122634-f08fb63612f4?auto=format&fit=crop&q=80&w=1200"  // Padlock
  ],
  mfa: [
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200", // Fingerprint
    "https://images.unsplash.com/photo-1563013545-e12d943be85a?auto=format&fit=crop&q=80&w=1200", // Phone Security
    "https://images.unsplash.com/photo-1535303311164-664fc9ec6532?auto=format&fit=crop&q=80&w=1200", // Biometrics
    "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=1200"  // Analytics
  ],
  mail: [
    "https://images.unsplash.com/photo-1557200130-b7220623052f?auto=format&fit=crop&q=80&w=1200", // Network
    "https://images.unsplash.com/photo-1596524430976-61f687455e82?auto=format&fit=crop&q=80&w=1200", // Envelope concept
    "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200", // Secure Blue
    "https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&q=80&w=1200"  // Laptop Hands
  ],
  iam: [
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1200", // Handshake
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200", // Team Work
    "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200", // Team Planning
    "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1200"  // Group
  ]
};

// Custom Component for Scroll-Triggered Image Animation with Fallback
const AnimatedImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  // Update internal state if prop changes
  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (!hasError) {
      // Fallback to a reliable tech image if the primary one fails
      setImgSrc("https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200");
      setHasError(true);
    }
  };
  
  // Parallax Effect
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.98, 1.05]);
  
  return (
    <motion.div 
      ref={ref}
      style={{ y, scale }}
      className="w-full relative group perspective-1000"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
       {/* Decorative Background Blur */}
       <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-[2rem] opacity-0 group-hover:opacity-70 blur-xl transition-opacity duration-700 -z-10" />
       
       <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/50 bg-white aspect-[4/3]">
           <motion.img 
             src={imgSrc} 
             alt={alt}
             onError={handleError}
             className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
             loading="eager"
           />
           
           {/* Professional Overlay Gradient */}
           <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
              <span className="text-white font-bold text-lg tracking-wide">{alt}</span>
           </div>
       </div>
    </motion.div>
  );
};

// --- Main Page Component ---

const SECURITY_TABS = [
  {
    id: 'browser',
    label: 'Browser Security',
    title: 'The pop-up dilemma',
    description: "It's the start of a new day; you wake up, head to work, and open your browser to keep tabs on what's happening. A few minutes in, you're faced with invasive trackers and ads.",
    solutionTitle: 'Power through your workday browsing with Ulaa',
    solutionDesc: 'A privacy-first browser where you take control of your browsing experience. With powerful ad and tracker blockers, web security monitoring, and data leak prevention.',
    cta: 'Explore Ulaa',
    imageAlt: "Secure Browsing Interface",
    productLink: '/products' // Generic as Ulaa isn't in main list
  },
  {
    id: 'password',
    label: 'Password Manager',
    title: 'Secure your digital vault',
    description: "With your tabs open, you head to your go-to apps and stare at the login page. Keeping track of passwords and making sure they're fool-proof shouldn't be on your to-do list.",
    solutionTitle: 'Set aside security worries with SRXHUB Vault',
    solutionDesc: 'The password management platform for everyone. Store and manage all kinds of sensitive data, share emergency access, and set granular access levels.',
    cta: 'Explore SRXHUB Vault',
    imageAlt: "Encrypted Vault Security",
    productLink: '/product/vault'
  },
  {
    id: 'mfa',
    label: 'Multi-Factor Auth',
    title: 'Global identity protection',
    description: "You created something unique and strong that doesn't need you to remember the name of your first pet. But a strong password is only half the battle fought.",
    solutionTitle: 'Add an extra layer with SRXHUB OneAuth',
    solutionDesc: 'Authenticate your sign-ins using biometrics, enable account recovery with Passphrase, manage devices, and keep your OTP secrets encrypted in the cloud.',
    cta: 'Explore SRXHUB OneAuth',
    imageAlt: "Multi-Factor Authentication",
    productLink: '/products'
  },
  {
    id: 'mail',
    label: 'Secure Mail',
    title: 'Advanced Threat Protection',
    description: "A series of emails welcome you—a review update from your colleague, an urgent payment request from a vendor. One click could mean business as usual—or trouble.",
    solutionTitle: 'Email security that\'s serious business',
    solutionDesc: 'Send encrypted emails that no outsider can read. Breathe easy with the email service designed to keep your inbox safe from phishing, malware, and spoofing.',
    cta: 'Explore SRXHUB Mail',
    imageAlt: "Encrypted Email Communication",
    productLink: '/product/mail'
  },
  {
    id: 'iam',
    label: 'IAM & Directory',
    title: 'Identity Access Management',
    description: "If you're an admin, you'd want to ensure that the entire org can access the right resources. Authenticating work logins shouldn't feel like work.",
    solutionTitle: 'Manage workforce identity with SRXHUB Directory',
    solutionDesc: 'Add employees as users, share access to work apps and devices, and secure logins in a snap. Manage team-specific security policies easily.',
    cta: 'Explore SRXHUB Directory',
    imageAlt: "Workforce Identity Management",
    productLink: '/product/people'
  }
];

const Security: React.FC = () => {
  const [activeTab, setActiveTab] = useState(SECURITY_TABS[0].id);
  const activeContent = SECURITY_TABS.find(t => t.id === activeTab) || SECURITY_TABS[0];
  const [heroBg, setHeroBg] = useState('');
  const navigate = useNavigate();
  
  // Initialize images synchronously to avoid flash of missing content
  const [tabImages] = useState<Record<string, string>>(() => {
    const newImages: Record<string, string> = {};
    Object.keys(DEPARTMENT_IMAGES).forEach(key => {
        const pool = DEPARTMENT_IMAGES[key as keyof typeof DEPARTMENT_IMAGES];
        newImages[key] = pool[Math.floor(Math.random() * pool.length)];
    });
    return newImages;
  });

  useEffect(() => {
    // Set random hero image
    setHeroBg(getRandomImage('tech'));
  }, []);

  // Scroll Progress for Hero Parallax
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div className="bg-white min-h-screen font-sans overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden text-center min-h-[90vh] flex flex-col justify-center bg-white">
          {/* Professional Background Elements */}
          <motion.div 
            style={{ y: heroY }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[140vw] h-[140vw] bg-gradient-to-b from-yellow-50 to-white rounded-full -z-10 transform -translate-y-[60%] opacity-60"
          />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 -z-10"></div>
          
          <div className="max-w-5xl mx-auto px-4 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center space-x-2 bg-yellow-100 text-yellow-800 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide mb-8"
              >
                  <ShieldCheck size={16} />
                  <span>ENTERPRISE-GRADE PROTECTION</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-8 leading-tight tracking-tight"
              >
                  Imagine never worrying <br/> 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-600">about data security.</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-xl md:text-2xl text-gray-600 font-medium mb-16 max-w-2xl mx-auto"
              >
                  With SRXHUB, robust security is built-in, not bolted on. Experience peace of mind starting today.
              </motion.p>
              
              {/* Hero Image / Visualization */}
              <motion.div 
                style={{ opacity: heroOpacity }}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="flex justify-center"
              >
                  <div className="w-full max-w-4xl relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-20"></div>
                      {heroBg && (
                          <img 
                            src={heroBg}
                            alt="Security Dashboard"
                            className="w-full h-auto rounded-t-3xl shadow-2xl border-4 border-white"
                          />
                      )}
                  </div>
              </motion.div>
          </div>
      </section>

      {/* Interactive Tabs Section */}
      <section className="py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-4">
              <motion.div 
                 initial="hidden"
                 whileInView="visible"
                 viewport={{ once: true }}
                 variants={fadeInUp}
                 className="text-center mb-16"
              >
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">Cybersecurity that blends into your day</h2>
                  <p className="text-gray-500 text-lg">Select a solution to see how we protect you.</p>
              </motion.div>
              
              {/* Tab Navigation */}
              <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="flex justify-center mb-20 overflow-x-auto pb-4"
              >
                  <div className="inline-flex bg-gray-100 p-1.5 rounded-full shadow-inner">
                      {SECURITY_TABS.map((tab) => (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center space-x-2 whitespace-nowrap ${
                                activeTab === tab.id 
                                ? 'bg-white text-gray-900 shadow-md transform scale-105' 
                                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200/50'
                            }`}
                          >
                              {tab.label}
                          </button>
                      ))}
                  </div>
              </motion.div>

              {/* Dynamic Content Area */}
              <div className="min-h-[600px]">
                  <AnimatePresence mode='wait'>
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
                      >
                           {/* Text Content */}
                           <div className="order-2 lg:order-1 text-left">
                               <div className="mb-10">
                                   <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">The Challenge</div>
                                   <h3 className="text-3xl font-bold text-gray-900 mb-4">{activeContent.title}</h3>
                                   <p className="text-lg text-gray-600 leading-relaxed border-l-4 border-gray-200 pl-6">
                                       {activeContent.description}
                                   </p>
                               </div>

                               <div className="bg-blue-50/50 rounded-2xl p-8 border border-blue-100">
                                   <div className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">The SRXHUB Solution</div>
                                   <h4 className="text-2xl font-bold text-gray-900 mb-4">{activeContent.solutionTitle}</h4>
                                   <p className="text-gray-700 mb-8 leading-relaxed">
                                       {activeContent.solutionDesc}
                                   </p>
                                   <Link 
                                     to={activeContent.productLink} 
                                     className="bg-gray-900 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-gray-800 transition-all flex items-center group w-fit"
                                   >
                                       {activeContent.cta} 
                                       <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                   </Link>
                               </div>
                           </div>

                           {/* Visual Content */}
                           <div className="order-1 lg:order-2">
                                {tabImages[activeContent.id] && (
                                    <AnimatedImage 
                                        key={activeContent.id} // Forces re-animation on tab change
                                        src={tabImages[activeContent.id]}
                                        alt={activeContent.imageAlt} 
                                    />
                                )}
                           </div>
                      </motion.div>
                  </AnimatePresence>
              </div>
          </div>
      </section>

      {/* Feature Pillars */}
      <section className="py-24 bg-gray-50 border-t border-gray-200">
           <div className="max-w-7xl mx-auto px-4">
               <motion.div 
                   initial="hidden"
                   whileInView="visible"
                   viewport={{ once: true }}
                   variants={fadeInUp}
                   className="text-center mb-16"
               >
                   <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Tailored for everyday work-life</h2>
                   <p className="text-gray-500 text-lg max-w-2xl mx-auto">Security isn't just about blocking threats; it's about enabling work safely.</p>
               </motion.div>
               
               <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                  className="grid grid-cols-1 md:grid-cols-3 gap-8"
               >
                   <motion.div variants={fadeInUp} className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 text-center hover:shadow-xl transition-all duration-300">
                       <div className="w-20 h-20 bg-yellow-50 rounded-2xl flex items-center justify-center mb-8 mx-auto rotate-3 hover:rotate-6 transition-transform">
                           <Eye className="text-yellow-600" size={40} />
                       </div>
                       <h3 className="text-xl font-bold text-gray-900 mb-4">Privacy-First</h3>
                       <p className="text-gray-600 leading-relaxed">Monitoring that respects user boundaries. We do not sell your data to advertisers.</p>
                   </motion.div>

                   <motion.div variants={fadeInUp} className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 text-center hover:shadow-xl transition-all duration-300 md:-translate-y-4">
                       <div className="w-20 h-20 bg-green-50 rounded-2xl flex items-center justify-center mb-8 mx-auto -rotate-3 hover:-rotate-6 transition-transform">
                           <Lock className="text-green-600" size={40} />
                       </div>
                       <h3 className="text-xl font-bold text-gray-900 mb-4">Encryption</h3>
                       <p className="text-gray-600 leading-relaxed">Enterprise-grade AES-256 encryption for all data at rest and in transit.</p>
                   </motion.div>

                   <motion.div variants={fadeInUp} className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 text-center hover:shadow-xl transition-all duration-300">
                       <div className="w-20 h-20 bg-purple-50 rounded-2xl flex items-center justify-center mb-8 mx-auto rotate-3 hover:rotate-6 transition-transform">
                           <Smartphone className="text-purple-600" size={40} />
                       </div>
                       <h3 className="text-xl font-bold text-gray-900 mb-4">Mobile Ready</h3>
                       <p className="text-gray-600 leading-relaxed">Seamless security for the modern remote workforce across all devices.</p>
                   </motion.div>
               </motion.div>
           </div>
      </section>

      {/* Trust/Form Section - REPLACED DARK WITH GRADIENT */}
      <section className="py-24 bg-gradient-to-br from-green-900 to-[#064e3b] text-white relative overflow-hidden">
          {/* Animated Mesh */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[100px] animate-blob"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
          
          <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-16 relative z-10">
              <motion.div 
                 initial={{ opacity: 0, x: -30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8 }}
                 className="lg:w-1/2"
              >
                  <h2 className="text-5xl md:text-6xl font-extrabold mb-8 leading-tight">
                      Security you can <br/> <span className="text-emerald-300">truly trust.</span>
                  </h2>
                  <p className="text-xl text-emerald-100 mb-12">
                      Join the <span className="font-bold text-white border-b-4 border-emerald-400">130M+ users</span> who trust us with their life's work.
                  </p>
                  
                  <div className="flex flex-col gap-6">
                      <div className="flex items-center space-x-4">
                          <CheckCircle className="text-emerald-400" />
                          <span className="font-medium text-white">ISO/IEC 27001 Certified</span>
                      </div>
                      <div className="flex items-center space-x-4">
                          <CheckCircle className="text-emerald-400" />
                          <span className="font-medium text-white">SOC 2 Type II Compliant</span>
                      </div>
                      <div className="flex items-center space-x-4">
                          <CheckCircle className="text-emerald-400" />
                          <span className="font-medium text-white">GDPR Ready</span>
                      </div>
                  </div>
              </motion.div>

              <motion.div 
                 initial={{ opacity: 0, x: 30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8 }}
                 className="lg:w-1/2 w-full"
              >
                  <div className="bg-white/10 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-white/20">
                      <h3 className="text-sm font-bold text-emerald-200 uppercase mb-8 tracking-wider">Get a Security Demo</h3>
                      
                      <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); navigate('/contact'); }}>
                          <input type="email" placeholder="Work Email" className="w-full px-6 py-4 rounded-xl border border-white/20 focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none bg-white/10 text-white placeholder-emerald-200/50 transition-all" />
                          <input type="tel" placeholder="Mobile Number" className="w-full px-6 py-4 rounded-xl border border-white/20 focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none bg-white/10 text-white placeholder-emerald-200/50 transition-all" />
                          
                          <button className="w-full bg-white text-emerald-900 font-bold py-5 rounded-xl mt-8 hover:bg-emerald-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                              REQUEST ACCESS
                          </button>
                      </form>
                      
                      <p className="text-xs text-center text-emerald-200/70 mt-6">
                          No credit card required. Cancel anytime.
                      </p>
                  </div>
              </motion.div>
          </div>
      </section>

      {/* Footer Certifications */}
      <section className="py-16 bg-white border-t border-gray-100 text-center">
          <div className="max-w-7xl mx-auto px-4">
              <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-10">Committed to the highest security standards</p>
              <div className="flex flex-wrap justify-center gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                   {[1,2,3,4,5].map(i => (
                       <div key={i} className="flex flex-col items-center">
                           <Shield size={40} className="text-gray-800 mb-2" />
                           <span className="font-bold text-xs text-gray-800">ISO 2700{i}</span>
                       </div>
                   ))}
              </div>
          </div>
      </section>

    </div>
  );
};

export default Security;
