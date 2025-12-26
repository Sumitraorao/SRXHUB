
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, Mail, Phone, MapPin, CheckCircle, ArrowRight, 
  Shield, Activity, FileText, X, Link as LinkIcon, 
  Video, Music, Image as ImageIcon, FileSpreadsheet, Send, Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    companySize: '',
    industry: '',
    requirements: ''
  });

  const [files, setFiles] = useState<File[]>([]);
  const [links, setLinks] = useState<string[]>([]);
  const [currentLink, setCurrentLink] = useState('');
  const [showLinkInput, setShowLinkInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(prev => [...prev, ...Array.from(e.target.files || [])]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const addLink = () => {
    if (currentLink.trim()) {
      setLinks(prev => [...prev, currentLink]);
      setCurrentLink('');
      setShowLinkInput(false);
    }
  };

  const removeLink = (index: number) => {
    setLinks(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // --- WHATSAPP INTEGRATION ---
    const phoneNumber = "918959795778"; // Your phone number
    
    let message = `*🚀 New Inquiry from SRXHUB Website*\n\n`;
    message += `*Name:* ${formState.name}\n`;
    message += `*Email:* ${formState.email}\n`;
    message += `*Phone:* ${formState.phone}\n`;
    message += `*Company:* ${formState.company}\n`;
    if (formState.jobTitle) message += `*Job Title:* ${formState.jobTitle}\n`;
    if (formState.companySize) message += `*Size:* ${formState.companySize}\n`;
    if (formState.industry) message += `*Industry:* ${formState.industry}\n`;
    message += `\n*📝 Requirements:*\n${formState.requirements}\n`;

    if (links.length > 0) {
        message += `\n*🔗 Attached Links:*\n${links.join('\n')}\n`;
    }

    if (files.length > 0) {
        message += `\n*hw Attached Files:*\n${files.map(f => f.name).join('\n')}\n`;
        message += `_(Note: Please check email for actual file attachments as they cannot be sent via direct link)_\n`;
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Open WhatsApp
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      
      setFiles([]);
      setLinks([]);
    }, 1500);
  };

  // Helper to get icon based on file type
  const getFileIcon = (file: File) => {
    if (file.type.includes('pdf')) return <FileText className="text-red-400" size={20} />;
    if (file.type.includes('sheet') || file.type.includes('excel') || file.type.includes('csv')) return <FileSpreadsheet className="text-emerald-400" size={20} />;
    if (file.type.includes('video')) return <Video className="text-purple-400" size={20} />;
    if (file.type.includes('audio')) return <Music className="text-pink-400" size={20} />;
    if (file.type.includes('image')) return <ImageIcon className="text-blue-400" size={20} />;
    return <FileText className="text-slate-400" size={20} />;
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 lg:p-8 font-sans bg-[#0f172a] selection:bg-cyan-500 selection:text-white overflow-hidden">
      
      {/* Animated Cosmic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[120px] animate-blob"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
          <div className="absolute top-[40%] left-[40%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl w-full bg-white/5 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/10 overflow-hidden flex flex-col lg:flex-row min-h-[850px] relative z-10"
      >
        
        {/* Left Side - Visuals & Info */}
        <div className="lg:w-5/12 bg-gradient-to-b from-[#1e1b4b]/80 to-[#0f172a]/90 text-white p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden">
          
          <div className="relative z-10 flex-grow flex flex-col">
            <Link to="/" className="inline-flex items-center space-x-2 mb-8 group w-fit">
               <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white/20 group-hover:bg-white/20 transition-colors">
                  <span className="font-bold text-xl">S</span>
               </div>
               <span className="font-bold text-lg tracking-wide">SRXHUB</span>
            </Link>

            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              Let's Build <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">The Future.</span>
            </h1>
            
            <p className="text-slate-300 text-lg mb-8 max-w-sm font-light leading-relaxed">
              Connect with us directly. We prioritize your vision. Submitting this form opens a direct line to our team via WhatsApp.
            </p>

            {/* PROFESSIONAL ROBOT ANIMATION */}
            <div className="relative w-full flex-grow min-h-[350px] flex items-center justify-center">
                
                {/* 1. Animation Container (Iframe) */}
                <div className="relative w-full h-full min-h-[400px] z-10 flex items-center justify-center">
                    {/* Glow behind robot */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/30 rounded-full blur-[80px]"></div>
                    <iframe 
                        src="https://embed.lottiefiles.com/animation/123182"
                        className="w-[120%] h-[120%] border-none absolute"
                        title="Professional 3D Robot"
                        style={{ background: 'transparent' }}
                    ></iframe>
                </div>
                
                {/* 2. Floating Status Cards */}
               <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute bottom-10 right-0 bg-white/5 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-lg flex items-center space-x-3 pointer-events-none z-20"
               >
                   <div className="bg-green-500/20 p-1.5 rounded-full relative">
                       <Shield size={14} className="text-green-400" />
                       <span className="absolute top-0 right-0 w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
                   </div>
                   <div>
                       <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</div>
                       <div className="text-xs font-bold text-white">Online 24/7</div>
                   </div>
               </motion.div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="relative z-10 space-y-5 text-sm text-slate-300 mt-8">
             <div className="flex items-center space-x-4 group">
                 <div className="p-2.5 bg-white/5 rounded-full text-cyan-400 border border-white/5 group-hover:bg-white/10 transition-colors">
                    <Mail size={18} />
                 </div>
                 <span className="font-medium hover:text-white transition-colors cursor-pointer tracking-wide">digitalmax.mgx@gmail.com</span>
             </div>
             <div className="flex items-center space-x-4 group">
                 <div className="p-2.5 bg-white/5 rounded-full text-cyan-400 border border-white/5 group-hover:bg-white/10 transition-colors">
                    <Phone size={18} />
                 </div>
                 <span className="font-medium hover:text-white transition-colors cursor-pointer tracking-wide">8959795778</span>
             </div>
             <div className="flex items-center space-x-4">
                 <div className="p-2.5 bg-white/5 rounded-full text-cyan-400 border border-white/5">
                    <MapPin size={18} />
                 </div>
                 <span className="font-medium tracking-wide">Global Headquarters, California</span>
             </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="lg:w-7/12 p-8 lg:p-12 bg-slate-900/30 overflow-y-auto">
           {isSubmitted ? (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="h-full flex flex-col items-center justify-center text-center"
               >
                   <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.3)] border border-emerald-500/30">
                       <CheckCircle size={48} className="text-emerald-400" />
                   </div>
                   <h2 className="text-4xl font-bold text-white mb-4">Message Sent!</h2>
                   <p className="text-slate-300 mb-8 max-w-md text-lg">
                       Your request has been securely formatted and redirected to WhatsApp. Our team will review your details immediately.
                   </p>
                   <Link to="/" className="bg-white text-slate-900 font-bold py-3.5 px-8 rounded-xl hover:bg-slate-200 transition-colors shadow-lg shadow-white/10">
                       Return to Home
                   </Link>
               </motion.div>
           ) : (
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.2 }}
               >
                   <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
                       <h2 className="text-3xl font-bold text-white">Get in touch</h2>
                       <div className="flex items-center text-xs font-bold text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-4 py-2 rounded-full shadow-lg shadow-emerald-900/20">
                           <Activity size={14} className="mr-2 animate-pulse" /> Fast Response via WhatsApp
                       </div>
                   </div>

                   <form onSubmit={handleSubmit} className="space-y-6">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="group">
                               <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Name *</label>
                               <input 
                                 type="text" 
                                 name="name"
                                 required
                                 className="w-full px-4 py-3.5 rounded-xl border border-slate-700 bg-slate-800/50 focus:bg-slate-800 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all font-medium text-white placeholder-slate-600"
                                 onChange={handleChange}
                                 placeholder="John Doe"
                               />
                           </div>
                           <div className="group">
                               <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Business Email *</label>
                               <input 
                                 type="email" 
                                 name="email"
                                 required
                                 className="w-full px-4 py-3.5 rounded-xl border border-slate-700 bg-slate-800/50 focus:bg-slate-800 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all font-medium text-white placeholder-slate-600"
                                 onChange={handleChange}
                                 placeholder="john@company.com"
                               />
                           </div>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="group">
                               <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Phone *</label>
                               <input 
                                 type="tel" 
                                 name="phone"
                                 required
                                 className="w-full px-4 py-3.5 rounded-xl border border-slate-700 bg-slate-800/50 focus:bg-slate-800 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all font-medium text-white placeholder-slate-600"
                                 onChange={handleChange}
                                 placeholder="+1 (555) 000-0000"
                               />
                           </div>
                           <div className="group">
                               <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Company Name</label>
                               <input 
                                 type="text" 
                                 name="company"
                                 className="w-full px-4 py-3.5 rounded-xl border border-slate-700 bg-slate-800/50 focus:bg-slate-800 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all font-medium text-white placeholder-slate-600"
                                 onChange={handleChange}
                                 placeholder="Acme Corp"
                               />
                           </div>
                       </div>

                       <div className="group">
                           <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Project Requirements</label>
                           <textarea 
                             name="requirements"
                             rows={4}
                             placeholder="Tell us about your project needs, timeline, and goals..."
                             className="w-full px-4 py-3.5 rounded-xl border border-slate-700 bg-slate-800/50 focus:bg-slate-800 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all font-medium text-white resize-none placeholder-slate-600"
                             onChange={handleChange}
                           ></textarea>
                       </div>

                       {/* PROFESSIONAL FILE UPLOAD SECTION - UNIVERSAL SUPPORT */}
                       <div className="space-y-4">
                           <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Attachments & Links</label>
                           
                           {/* Hidden Native Input accepts EVERYTHING */}
                           <input 
                               type="file" 
                               multiple 
                               ref={fileInputRef}
                               className="hidden" 
                               onChange={handleFileChange}
                               accept="*" 
                           />
                           
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                               {/* Upload Button - Fixed click handler */}
                               <div 
                                   onClick={(e) => {
                                     e.stopPropagation();
                                     if(fileInputRef.current) fileInputRef.current.click();
                                   }}
                                   className="border-2 border-dashed border-slate-700 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-slate-800/50 hover:border-cyan-500 transition-all cursor-pointer group h-36 bg-slate-900/30 select-none relative overflow-hidden"
                               >
                                   <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                   <Upload size={28} className="text-slate-500 group-hover:text-cyan-400 mb-3 transition-colors" />
                                   <p className="text-sm font-bold text-slate-300 group-hover:text-cyan-300">Upload Any File</p>
                                   <p className="text-[10px] text-slate-500 mt-1">
                                       Docs, Video, Audio, Archives <br/>
                                       <span className="text-emerald-500 font-semibold">Unlimited Size</span>
                                   </p>
                               </div>

                               {/* Link Button */}
                               <div 
                                   onClick={() => setShowLinkInput(true)}
                                   className="border-2 border-dashed border-slate-700 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-slate-800/50 hover:border-purple-500 transition-all cursor-pointer group h-36 bg-slate-900/30 relative overflow-hidden"
                               >
                                   <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                   <LinkIcon size={28} className="text-slate-500 group-hover:text-purple-400 mb-3 transition-colors" />
                                   <p className="text-sm font-bold text-slate-300 group-hover:text-purple-300">Attach Link</p>
                                   <p className="text-[10px] text-slate-500 mt-1">
                                       Drive, Dropbox, WeTransfer <br/>
                                       or any URL
                                   </p>
                               </div>
                           </div>

                           {/* Link Input Field (Conditional) */}
                           <AnimatePresence>
                               {showLinkInput && (
                                   <motion.div 
                                     initial={{ height: 0, opacity: 0 }}
                                     animate={{ height: 'auto', opacity: 1 }}
                                     exit={{ height: 0, opacity: 0 }}
                                     className="overflow-hidden"
                                   >
                                       <div className="flex gap-2 mt-2">
                                           <input 
                                             type="url" 
                                             placeholder="Paste your URL here..."
                                             className="flex-grow px-4 py-2.5 rounded-lg border border-slate-700 bg-slate-800 text-white focus:ring-2 focus:ring-purple-500 outline-none text-sm placeholder-slate-500"
                                             value={currentLink}
                                             onChange={(e) => setCurrentLink(e.target.value)}
                                             onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addLink())}
                                           />
                                           <button 
                                             type="button"
                                             onClick={addLink}
                                             className="bg-purple-600 text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-purple-700 transition-colors shadow-lg shadow-purple-900/20"
                                           >
                                               Add
                                           </button>
                                           <button 
                                             type="button" 
                                             onClick={() => setShowLinkInput(false)}
                                             className="p-2.5 text-slate-400 hover:bg-slate-700 rounded-lg transition-colors"
                                           >
                                               <X size={18} />
                                           </button>
                                       </div>
                                   </motion.div>
                               )}
                           </AnimatePresence>

                           {/* Attachments List */}
                           {(files.length > 0 || links.length > 0) && (
                               <div className="mt-4 space-y-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                                   {/* Files */}
                                   {files.map((file, idx) => (
                                       <motion.div 
                                          layout
                                          key={`file-${idx}`} 
                                          initial={{ opacity: 0, y: 10 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700 shadow-sm"
                                       >
                                           <div className="flex items-center overflow-hidden">
                                               <div className="p-2 bg-slate-800 rounded-lg border border-slate-600 mr-3">
                                                   {getFileIcon(file)}
                                               </div>
                                               <div className="truncate">
                                                   <p className="text-sm font-bold text-slate-200 truncate max-w-[200px]">{file.name}</p>
                                                   <p className="text-[10px] text-slate-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                                               </div>
                                           </div>
                                           <button 
                                               type="button"
                                               onClick={() => removeFile(idx)}
                                               className="text-slate-500 hover:text-red-400 hover:bg-red-900/20 p-1.5 rounded-md transition-colors"
                                           >
                                               <X size={16} />
                                           </button>
                                       </motion.div>
                                   ))}

                                   {/* Links */}
                                   {links.map((link, idx) => (
                                       <motion.div 
                                          layout
                                          key={`link-${idx}`} 
                                          initial={{ opacity: 0, y: 10 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          className="flex items-center justify-between p-3 bg-purple-900/20 rounded-lg border border-purple-500/30 shadow-sm"
                                       >
                                           <div className="flex items-center overflow-hidden">
                                               <div className="p-2 bg-purple-900/40 rounded-lg border border-purple-500/30 mr-3 text-purple-400">
                                                   <LinkIcon size={20} />
                                               </div>
                                               <div className="truncate">
                                                   <p className="text-sm font-bold text-purple-200 truncate max-w-[200px]">{link}</p>
                                                   <p className="text-[10px] text-purple-400">External Link</p>
                                               </div>
                                           </div>
                                           <button 
                                               type="button"
                                               onClick={() => removeLink(idx)}
                                               className="text-slate-500 hover:text-red-400 hover:bg-red-900/20 p-1.5 rounded-md transition-colors"
                                           >
                                               <X size={16} />
                                           </button>
                                       </motion.div>
                                   ))}
                               </div>
                           )}
                       </div>

                       <div className="pt-6">
                           <button 
                             type="submit" 
                             disabled={isSubmitting}
                             className="w-full bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#128C7E] hover:to-[#075E54] text-white font-bold py-4 rounded-xl shadow-lg shadow-green-900/30 transition-all transform hover:-translate-y-1 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2 border border-green-400/20"
                           >
                               {isSubmitting ? (
                                   <span>Opening WhatsApp...</span>
                               ) : (
                                   <>
                                     <Send size={18} />
                                     <span>SEND VIA WHATSAPP</span>
                                   </>
                               )}
                           </button>
                       </div>

                       <p className="text-xs text-slate-500 text-center">
                           Your data is processed securely. View our <Link to="/policies" className="underline hover:text-slate-300">Privacy Policy</Link>.
                       </p>
                   </form>
               </motion.div>
           )}
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
