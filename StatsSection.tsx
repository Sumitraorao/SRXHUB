
import React, { useEffect, useState, useRef } from 'react';
import { getGlobalStats } from '../services/mockApi';
import { StatItem } from '../types';
import { ChevronRight } from 'lucide-react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { Link } from 'react-router-dom';

const StatsSection: React.FC = () => {
  const [stats, setStats] = useState<StatItem[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion values for mouse position (0 to 1)
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Smooth physics-based movement
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20, mass: 0.5 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20, mass: 0.5 });

  // Map mouse position to CSS values
  const backgroundPosX = useTransform(smoothX, [0, 1], ["0%", "100%"]);
  const cloudPosX = useTransform(smoothX, [0, 1], ["10%", "120%"]);
  
  const rotateX = useTransform(smoothY, [0, 1], [15, -15]);
  const rotateY = useTransform(smoothX, [0, 1], [-15, 15]);

  useEffect(() => {
    getGlobalStats().then(setStats);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { width, height, left, top } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative py-32 md:py-48 overflow-hidden min-h-[900px] flex items-center justify-center perspective-1000 bg-gradient-to-b from-[#1e1b4b] via-[#312e81] to-[#0f172a]"
    >
      {/* 1. ANIMATED NEBULA BACKGROUND */}
      <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Moving Gradient Orbs */}
          <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-purple-600/30 rounded-full blur-[120px] mix-blend-screen animate-blob"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-600/30 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-2000"></div>
          <div className="absolute top-[40%] left-[40%] w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[100px] mix-blend-screen animate-blob animation-delay-4000"></div>
          
          {/* Star Field */}
          <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(white 1.5px, transparent 1.5px)', backgroundSize: '50px 50px' }}></div>
      </div>
      
      {/* 2. THE 3D EARTH CONTAINER */}
      <motion.div 
        style={{ rotateX, rotateY }}
        className="absolute z-10 w-[500px] h-[500px] md:w-[700px] md:h-[700px] lg:w-[850px] lg:h-[850px] rounded-full transition-transform duration-100 ease-out"
      >
          {/* Atmosphere Glow (Outer) */}
          <div className="absolute inset-[-50px] rounded-full bg-blue-400/20 blur-[80px] z-0 animate-pulse"></div>

          {/* MAIN SPHERE */}
          <div className="relative w-full h-full rounded-full overflow-hidden shadow-[0_0_80px_rgba(59,130,246,0.5)] bg-[#1e3a8a] z-10 border-2 border-blue-400/20">
              
              {/* Layer A: Earth Texture */}
              <motion.div 
                style={{ backgroundPositionX: backgroundPosX }}
                className="absolute inset-0 w-full h-full"
              >
                 <div 
                    className="w-full h-full"
                    style={{
                        backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Earthmap1000x500compac.jpg/1280px-Earthmap1000x500compac.jpg')",
                        backgroundSize: "210% 100%", 
                        backgroundPosition: "center",
                        filter: "contrast(1.3) brightness(1.2) saturate(1.4) hue-rotate(-10deg)"
                    }}
                 ></div>
              </motion.div>

              {/* Layer B: Clouds */}
              <motion.div 
                style={{ backgroundPositionX: cloudPosX }}
                className="absolute inset-0 w-full h-full opacity-70 mix-blend-screen pointer-events-none"
              >
                 <div 
                    className="w-full h-full"
                    style={{
                        backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Clouds_texture.jpg/1280px-Clouds_texture.jpg')",
                        backgroundSize: "210% 100%",
                        filter: "grayscale(100%) contrast(1.5)"
                    }}
                 ></div>
              </motion.div>

              {/* Layer C: Shadow */}
              <div 
                className="absolute inset-0 pointer-events-none z-20"
                style={{
                    background: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0) 0%, rgba(0,0,0,0.1) 50%, rgba(2,6,23,0.8) 90%)",
                    boxShadow: "inset -40px -40px 100px rgba(0,0,0,0.8), inset 10px 10px 40px rgba(255,255,255,0.3)"
                }}
              ></div>
          </div>
      </motion.div>

      {/* 3. CONTENT OVERLAY */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pointer-events-none">
          
          {/* Text Content */}
          <div className="text-center lg:text-left pointer-events-auto">
             <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
             >
                 <div className="inline-block px-4 py-1.5 rounded-full border border-cyan-400/50 bg-cyan-900/30 backdrop-blur-md text-cyan-300 text-xs font-bold tracking-widest uppercase mb-6 shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                    Global Infrastructure
                 </div>
                 <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-xl">
                    Made in India. <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 animate-gradient-xy">
                        Made for the World.
                    </span>
                 </h2>
                 <p className="text-xl text-blue-100/90 max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed drop-shadow-md">
                    Software that connects businesses across 150+ countries. Engineered for scale, designed for impact.
                 </p>
                 
                 <Link to="/customers" className="inline-block group">
                    <button className="relative px-8 py-4 bg-white text-blue-900 font-bold rounded-full overflow-hidden transition-all hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:shadow-[0_0_50px_rgba(255,255,255,0.6)]">
                        <span className="relative z-10 flex items-center">
                            OUR GLOBAL STORY <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </button>
                 </Link>
             </motion.div>
          </div>

          {/* Stats Floating Cards */}
          <div className="flex flex-col gap-6 items-center lg:items-end pointer-events-auto">
             {stats.map((stat, idx) => (
                 <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15, duration: 0.6 }}
                    whileHover={{ scale: 1.05, x: -10 }}
                    className="w-72 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-2xl hover:bg-white/20 hover:border-white/30 transition-all cursor-default group"
                 >
                     <div className="flex items-center justify-between">
                        <div className="text-4xl font-bold text-white mb-1 drop-shadow-md group-hover:text-cyan-300 transition-colors">{stat.value}</div>
                        <div className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_15px_#22d3ee] animate-pulse"></div>
                     </div>
                     <div className="text-xs font-bold text-blue-200 uppercase tracking-wider">{stat.label}</div>
                 </motion.div>
             ))}
          </div>
      </div>
    </section>
  );
};

export default StatsSection;
