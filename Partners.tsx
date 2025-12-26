
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Handshake, Briefcase, Globe, CheckCircle, 
  Search, Users, Code, BarChart, Server, Zap, ShieldCheck, Settings 
} from 'lucide-react';

const Partners: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'become' | 'work'>('become');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get('type');
    if (type === 'work') {
      setActiveTab('work');
    } else {
      setActiveTab('become');
    }
  }, [location.search]);

  const handleTabChange = (tab: 'become' | 'work') => {
    setActiveTab(tab);
    navigate(`/partners?type=${tab}`);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      
      {/* Sticky Tab Nav */}
      <div className="sticky top-16 bg-white z-40 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex space-x-8">
            <button 
                onClick={() => handleTabChange('become')}
                className={`py-4 text-sm font-bold border-b-2 transition-colors ${
                    activeTab === 'become' 
                    ? 'border-brand-blue text-brand-blue' 
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
            >
                BECOME A PARTNER
            </button>
            <button 
                onClick={() => handleTabChange('work')}
                className={`py-4 text-sm font-bold border-b-2 transition-colors ${
                    activeTab === 'work' 
                    ? 'border-brand-blue text-brand-blue' 
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
            >
                WORK WITH A PARTNER
            </button>
        </div>
      </div>

      <AnimatePresence mode='wait'>
        {activeTab === 'become' ? (
          <motion.div key="become" {...fadeInUp}>
             {/* Hero Section */}
             <section className="bg-gradient-to-r from-blue-600 to-brand-blue py-20 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 transform origin-top-right"></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="md:w-1/2"
                    >
                        <h2 className="text-xs font-bold text-blue-200 uppercase tracking-widest mb-4">SRXHUB PARTNER PROGRAM</h2>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Building success <br/> together</h1>
                        <p className="text-xl text-blue-100 mb-8 max-w-lg leading-relaxed">
                            Explore boundless opportunities with SRXHUB's integrated suite of products, designed to nurture collaboration, inspire innovation, and drive mutual success.
                        </p>
                        <button onClick={() => navigate('/contact')} className="bg-white text-brand-blue font-bold py-3 px-8 rounded hover:bg-gray-100 transition-colors shadow-lg">
                            BECOME A PARTNER
                        </button>
                    </motion.div>
                    {/* Vector Illustration */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="md:w-1/2 flex justify-center mt-10 md:mt-0"
                    >
                        <div className="relative w-80 h-80">
                            <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
                            <div className="absolute inset-4 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center">
                                <Handshake size={120} className="text-white" strokeWidth={1} />
                            </div>
                            <div className="absolute top-0 right-0 bg-yellow-400 p-4 rounded-full shadow-lg animate-bounce">
                                <Zap size={32} className="text-white" />
                            </div>
                            <div className="absolute bottom-10 left-0 bg-green-400 p-4 rounded-full shadow-lg">
                                <BarChart size={32} className="text-white" />
                            </div>
                        </div>
                    </motion.div>
                </div>
             </section>

             {/* Partner Programs Grid */}
             <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Partner programs at SRXHUB</h2>
                    <motion.div 
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                        {[
                            { title: 'Consulting Partners', icon: Users, desc: 'Deliver large-scale implementation services. Build unified solutions for specific industry verticals.', color: 'bg-orange-100 text-orange-600' },
                            { title: 'System Integrators', icon: Server, desc: 'Implement and integrate SRXHUB solutions for complex enterprise requirements.', color: 'bg-blue-100 text-blue-600' },
                            { title: 'Resellers', icon: Briefcase, desc: 'Recruit, enable, and support a network of clients as a dedicated regional market partner.', color: 'bg-green-100 text-green-600' },
                            { title: 'Technology Partners', icon: Code, desc: 'Build extensions and integrations on the SRXHUB platform to expand product capabilities.', color: 'bg-purple-100 text-purple-600' }
                        ].map((prog, idx) => (
                            <motion.div 
                                key={idx} 
                                variants={staggerItem}
                                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-start group"
                            >
                                <div className={`p-4 rounded-lg mr-6 ${prog.color} group-hover:scale-110 transition-transform`}>
                                    <prog.icon size={32} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{prog.title}</h3>
                                    <p className="text-gray-600 mb-4">{prog.desc}</p>
                                    <button onClick={() => navigate('/contact')} className="text-brand-blue font-bold text-sm hover:underline flex items-center">
                                        EXPLORE PROGRAM <ArrowRight size={14} className="ml-1" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
             </section>

             {/* Global Summit Banner */}
             <section className="py-16 bg-white">
                 <div className="max-w-5xl mx-auto px-4">
                     <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-brand-dark text-white rounded-2xl p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between shadow-2xl"
                     >
                         <div className="relative z-10 md:w-2/3">
                             <div className="inline-block bg-white/20 px-3 py-1 rounded text-xs font-bold mb-4">ANNUAL EVENT</div>
                             <h2 className="text-3xl font-bold mb-4">Global Partner Summit</h2>
                             <p className="text-gray-300 mb-8">
                                 Join thousands of partners from around the globe to network, learn, and grow. Experience the power of the SRXHUB ecosystem firsthand.
                             </p>
                             <button onClick={() => navigate('/contact')} className="bg-white text-gray-900 font-bold py-3 px-6 rounded hover:bg-gray-100 transition-colors">
                                 REGISTER INTEREST
                             </button>
                         </div>
                         <div className="md:w-1/3 flex justify-center relative mt-8 md:mt-0">
                             <Globe size={180} className="text-blue-500 opacity-50 absolute animate-spin-slow" strokeWidth={0.5} />
                             <Globe size={180} className="text-white relative z-10" strokeWidth={1} />
                         </div>
                     </motion.div>
                 </div>
             </section>

             {/* Stats */}
             <section className="py-16 bg-white text-center">
                 <motion.div 
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8"
                 >
                     {[
                         { val: '2000+', label: 'Consulting Partners' },
                         { val: '9000+', label: 'Affiliates' },
                         { val: '2500+', label: 'Integrations' },
                         { val: '100+', label: 'Countries' },
                     ].map((stat, idx) => (
                         <motion.div key={idx} variants={staggerItem}>
                             <div className="text-4xl font-bold text-gray-900 mb-2">{stat.val}</div>
                             <div className="text-gray-500 uppercase text-xs font-bold tracking-widest">{stat.label}</div>
                         </motion.div>
                     ))}
                 </motion.div>
             </section>
          </motion.div>
        ) : (
          <motion.div key="work" {...fadeInUp}>
              {/* Hero Section Work */}
              <section className="bg-white py-20 text-center relative overflow-hidden">
                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
                    >
                        Accelerate <br/> <span className="text-brand-blue">your business growth</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
                    >
                        Leverage SRXHUB partners' expertise and support for better business outcomes. Get expert guidance today!
                    </motion.p>
                    <button onClick={() => navigate('/contact')} className="bg-brand-red hover:bg-brand-darkRed text-white font-bold py-3 px-10 rounded shadow-lg transition-transform hover:-translate-y-1">
                        FIND A PARTNER
                    </button>
                </div>
                {/* Background Blobs */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -z-0 transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-50 rounded-full blur-3xl -z-0 transform translate-x-1/3 translate-y-1/3"></div>
             </section>

             {/* Benefits Section */}
             <section className="py-20 bg-gray-50">
                 <div className="max-w-7xl mx-auto px-4">
                     <h2 className="text-3xl font-bold text-gray-900 mb-16 text-center">Benefits of working with a Partner</h2>
                     <motion.div 
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16"
                     >
                         {[
                             { icon: ShieldCheck, title: 'Domain expertise and guidance', desc: 'Partners bring specialized knowledge of SRXHUB products, industry solutions, and business processes.' },
                             { icon: Zap, title: 'Rapid implementation', desc: 'Leverage their proficiency with SRXHUB products to ensure a seamless implementation process.' },
                             { icon: Settings, title: 'Customized solutions', desc: 'Partners deliver bespoke solutions tailored to the unique requirements and goals of each customer.' },
                             { icon: BarChart, title: 'Increased productivity', desc: 'Collaborating with partners leads to enhanced productivity and operational efficiency.' }
                         ].map((benefit, idx) => (
                             <motion.div key={idx} variants={staggerItem} className="flex">
                                 <div className="mr-6">
                                     <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm text-brand-blue border border-gray-100">
                                         <benefit.icon size={28} />
                                     </div>
                                 </div>
                                 <div>
                                     <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                                     <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
                                 </div>
                             </motion.div>
                         ))}
                     </motion.div>
                 </div>
             </section>

             {/* How to work with partner */}
             <section className="py-20 bg-white">
                 <div className="max-w-7xl mx-auto px-4">
                     <h2 className="text-3xl font-bold text-gray-900 mb-16 text-center">How to work with a SRXHUB Partner</h2>
                     <motion.div 
                         variants={staggerContainer}
                         initial="hidden"
                         whileInView="visible"
                         viewport={{ once: true }}
                         className="grid grid-cols-1 md:grid-cols-3 gap-8"
                     >
                         {[
                             { step: '01', title: 'Select the right Partner', desc: 'Evaluate and choose a partner that aligns closely with your business objectives and requirements.' },
                             { step: '02', title: 'Check references and engage', desc: 'Once you identified potential partners, request references or case studies. Discuss their approach.' },
                             { step: '03', title: 'Set clear expectations', desc: 'Work closely with the Partner to define the scope of work, project timelines, deliverables, and desired outcomes.' }
                         ].map((item, idx) => (
                             <motion.div 
                                key={idx} 
                                variants={staggerItem}
                                className="bg-gray-50 p-8 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors relative overflow-hidden group hover:shadow-lg"
                             >
                                 <div className="text-6xl font-bold text-gray-200 absolute top-4 right-4 group-hover:text-blue-100 transition-colors">
                                     {item.step}
                                 </div>
                                 <h3 className="text-xl font-bold text-gray-900 mb-4 relative z-10 mt-8">{item.title}</h3>
                                 <p className="text-gray-600 relative z-10">{item.desc}</p>
                             </motion.div>
                         ))}
                     </motion.div>
                 </div>
             </section>

             {/* Vector Testimonials */}
             <section className="py-20 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12">Hear from our Customers</h2>
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100 relative"
                    >
                        {/* Vector Avatar */}
                        <div className="w-20 h-20 mx-auto -mt-20 bg-brand-blue rounded-full border-4 border-white flex items-center justify-center shadow-lg mb-6">
                             <Users size={40} className="text-white" />
                        </div>
                        <p className="text-xl italic text-gray-600 mb-6 leading-relaxed">
                            "We had a CRM software, we were managing projects over dedicated spreadsheets. Aurelian Group was at the right place at the right time. Now, we've integrated all these different pieces using SRXHUB One that is tailor made to our business."
                        </p>
                        <div className="font-bold text-gray-900">Matt Koopmans</div>
                        <div className="text-sm text-gray-500">Founder and Director, Aurelian Group</div>
                    </motion.div>
                </div>
             </section>

             {/* CTA */}
             <section className="py-20 bg-white text-center">
                 <h2 className="text-3xl font-bold text-gray-900 mb-8">Work with a SRXHUB Partner today!</h2>
                 <button onClick={() => navigate('/contact')} className="bg-brand-blue hover:bg-blue-700 text-white font-bold py-4 px-12 rounded shadow-lg transition-transform hover:-translate-y-1">
                     FIND A PARTNER
                 </button>
             </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Partners;
