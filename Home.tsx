
import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import StatsSection from '../components/StatsSection';
import { 
    SrxOneSection, 
    TrustedBySection, 
    AiSection, 
    EnterpriseSection, 
    PrivacySection, 
    ValuesSection 
} from '../components/PromoSections';
import { getRandomImage } from '../constants';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface RevealOnScrollProps {
    children: React.ReactNode;
    delay?: number;
}

// Reusable Scroll Reveal Wrapper
const RevealOnScroll: React.FC<RevealOnScrollProps> = ({ children, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
};

const Home: React.FC = () => {
  const [eventImage, setEventImage] = useState('');

  useEffect(() => {
    setEventImage(getRandomImage('abstract'));
  }, []);

  return (
    <>
      <Hero />
      
      <RevealOnScroll>
        <SrxOneSection />
      </RevealOnScroll>
      
      <RevealOnScroll delay={0.2}>
        <TrustedBySection />
      </RevealOnScroll>
      
      <RevealOnScroll>
        <AiSection />
      </RevealOnScroll>
      
      <RevealOnScroll>
        <EnterpriseSection />
      </RevealOnScroll>
      
      {/* StatsSection handles its own internal complex animations */}
      <StatsSection />
      
      <RevealOnScroll>
        <PrivacySection />
      </RevealOnScroll>
      
      {/* Event Banner */}
      <div className="relative h-64 md:h-96 overflow-hidden group">
           {eventImage && (
               <motion.img 
                 initial={{ scale: 1 }}
                 whileInView={{ scale: 1.1 }}
                 viewport={{ once: true }}
                 transition={{ duration: 10, ease: "linear" }}
                 src={eventImage} 
                 className="w-full h-full object-cover" 
                 alt="Event" 
               />
           )}
           <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-4 text-center">
              <motion.div
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8 }}
              >
                  <h2 className="text-4xl md:text-6xl font-bold font-serif mb-4">SRXHUB <br/> CONNECT 2025</h2>
                  <Link to="/contact" className="inline-block mt-4 border-2 border-white px-8 py-3 font-bold hover:bg-white hover:text-black transition-all hover:scale-105">
                      Register Now
                  </Link>
              </motion.div>
           </div>
      </div>

      <RevealOnScroll>
        <ValuesSection />
      </RevealOnScroll>
    </>
  );
};

export default Home;
