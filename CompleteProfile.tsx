
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, ArrowRight, ShieldCheck } from 'lucide-react';

const CompleteProfile: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // OTP States
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '', '']); 
  const [otpTimer, setOtpTimer] = useState(60);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        setUser(JSON.parse(storedUser));
    } else {
        navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
      let interval: ReturnType<typeof setInterval>;
      if (showOtp && otpTimer > 0) {
          interval = setInterval(() => {
              setOtpTimer((prev) => prev - 1);
          }, 1000);
      }
      return () => clearInterval(interval);
  }, [showOtp, otpTimer]);

  const handleCreateAccount = (e: React.FormEvent) => {
      e.preventDefault();
      if (!phoneNumber) return;
      setIsLoading(true);
      setTimeout(() => {
          setIsLoading(false);
          setShowOtp(true);
      }, 1000);
  };

  const handleOtpChange = (index: number, value: string) => {
      if (value.length > 1) return;
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== '' && index < 6) {
          const nextInput = document.getElementById(`otp-${index + 1}`);
          nextInput?.focus();
      }
  };

  const handleVerifyOtp = async () => {
      setIsLoading(true);
      
      setTimeout(() => {
          const updatedUser = { ...user, phone_number: phoneNumber };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          navigate('/dashboard');
          setIsLoading(false);
      }, 1500);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#0f172a] font-sans selection:bg-emerald-500 selection:text-white">
       
       {/* Dark Green/Slate Background */}
       <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-emerald-900/20 rounded-full blur-[120px] animate-blob"></div>
          <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-slate-800/40 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
       </div>

       <motion.div 
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         className="relative z-10 w-full max-w-lg px-6"
       >
           {!showOtp ? (
               <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
                   
                   {/* Profile Header */}
                   <div className="p-8 border-b border-white/10 bg-black/20 flex flex-col items-center text-center">
                       <div className="relative mb-4">
                           {user.picture ? (
                               <img src={user.picture} alt="Profile" className="w-20 h-20 rounded-full border-4 border-emerald-500/30 shadow-lg" />
                           ) : (
                               <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg border-4 border-white/10">
                                   {user.first_name?.[0]}
                               </div>
                           )}
                           <div className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500 border-2 border-[#0f172a] rounded-full"></div>
                       </div>
                       <h2 className="text-2xl font-bold text-white">Welcome, {user.first_name}!</h2>
                       <p className="text-slate-400 text-sm mt-1">Let's secure your account to get started.</p>
                   </div>

                   <div className="p-8">
                       <form onSubmit={handleCreateAccount} className="space-y-6">
                           
                           <div>
                               <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Mobile Number</label>
                               <div className="flex">
                                   <div className="flex-shrink-0 inline-flex items-center px-4 bg-slate-900/50 border border-slate-700 text-slate-300 rounded-l-xl font-medium border-r-0">
                                       <span className="mr-2 text-lg">🇮🇳</span> +91
                                   </div>
                                   <input 
                                      type="tel" 
                                      required
                                      value={phoneNumber}
                                      onChange={(e) => setPhoneNumber(e.target.value)}
                                      className="block w-full bg-slate-900/50 border border-slate-700 text-white rounded-r-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder-slate-600 text-lg tracking-wide" 
                                      placeholder="98765 43210" 
                                   />
                               </div>
                               <p className="mt-3 text-xs text-slate-500 flex items-center">
                                   <ShieldCheck size={12} className="mr-1 text-emerald-500" />
                                   We'll send a secure OTP to verify this number.
                               </p>
                           </div>

                           <button 
                             type="submit" 
                             disabled={isLoading}
                             className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-900/50 transition-all transform hover:-translate-y-1 flex items-center justify-center"
                           >
                               {isLoading ? <Loader2 className="animate-spin" /> : 'Send Verification Code'}
                           </button>
                           
                           <div className="text-center pt-2">
                               <button type="button" onClick={() => navigate('/login')} className="text-sm text-slate-400 hover:text-white transition-colors">
                                   Not you? <span className="underline">Sign in with a different account</span>
                               </button>
                           </div>
                       </form>
                   </div>
               </div>
           ) : (
               <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden p-8 sm:p-10">
                   <div className="text-center mb-8">
                       <h2 className="text-2xl font-bold text-white mb-2">Verify Identity</h2>
                       <p className="text-slate-400 text-sm">
                           Enter the code sent to <span className="text-emerald-400 font-mono">+91 {phoneNumber}</span>
                       </p>
                   </div>

                   <div className="flex justify-between gap-2 mb-8">
                       {otp.map((digit, idx) => (
                           <input
                             key={idx}
                             id={`otp-${idx}`}
                             type="text"
                             maxLength={1}
                             value={digit}
                             onChange={(e) => handleOtpChange(idx, e.target.value)}
                             className="w-10 h-12 sm:w-12 sm:h-14 text-center bg-slate-900/50 border border-slate-700 rounded-lg text-white text-xl font-bold focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-inner"
                           />
                       ))}
                   </div>

                   <div className="flex items-center justify-center text-sm text-slate-400 mb-8">
                       {otpTimer > 0 ? (
                           <span>Resend code in <span className="text-white font-mono">{otpTimer}s</span></span>
                       ) : (
                           <button onClick={() => setOtpTimer(60)} className="text-emerald-400 hover:text-emerald-300 font-bold">Resend Code</button>
                       )}
                   </div>

                   <div className="flex gap-4">
                       <button onClick={() => setShowOtp(false)} className="flex-1 bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl font-bold border border-white/10 transition-colors">
                           Back
                       </button>
                       <button 
                         onClick={handleVerifyOtp}
                         disabled={isLoading || otp.join('').length < 7}
                         className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl shadow-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                       >
                           {isLoading ? <Loader2 className="animate-spin" /> : 'Confirm'}
                       </button>
                   </div>
               </div>
           )}
       </motion.div>
    </div>
  );
};

export default CompleteProfile;
