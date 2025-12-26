
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, AlertCircle, User, Mail, Lock, Phone, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    terms: false
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
        navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!formData.terms) {
        setError("Please agree to the Terms of Service.");
        return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
        const nameParts = formData.name.split(' ');
        const mockUser = {
            id: 'new_user_101',
            email: formData.email,
            first_name: nameParts[0],
            last_name: nameParts.slice(1).join(' ') || '',
            role: 'admin',
            phone_number: formData.phone
        };

        localStorage.setItem('accessToken', 'mock_access_token_new_user');
        localStorage.setItem('refreshToken', 'mock_refresh_token_new_user');
        localStorage.setItem('user', JSON.stringify(mockUser));

        navigate('/dashboard');
        setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#0f172a] font-sans selection:bg-purple-500 selection:text-white">
       
       {/* Animated Background */}
       <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[700px] h-[700px] bg-indigo-600/20 rounded-full blur-[120px] animate-blob"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[700px] h-[700px] bg-fuchsia-600/20 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
       </div>

       {/* Navigation Return */}
       <Link to="/" className="absolute top-8 left-8 z-20 flex items-center text-slate-400 hover:text-white transition-colors">
          <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center mr-3 border border-white/10 backdrop-blur-md">
             <span className="font-bold text-lg text-white">S</span>
          </div>
          <span className="text-sm font-medium tracking-wide">Back to Home</span>
       </Link>

       <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="relative z-10 w-full max-w-md px-6 py-12"
       >
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden p-8 sm:p-10">
             <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
                <p className="text-slate-400 text-sm">Join the 100M+ users building with SRXHUB.</p>
             </div>

             <form className="space-y-5" onSubmit={handleSubmit}>
                {error && (
                    <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 flex items-center gap-3">
                        <AlertCircle className="h-5 w-5 text-red-400 mt-0.5" />
                        <h3 className="text-sm font-medium text-red-200">{error}</h3>
                    </div>
                )}
                
                <div className="space-y-4">
                    <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-400 transition-colors" size={20} />
                        <input
                            type="text"
                            name="name"
                            required
                            className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-12 py-3.5 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder-slate-500"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-400 transition-colors" size={20} />
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-12 py-3.5 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder-slate-500"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-400 transition-colors" size={20} />
                        <input
                            type="password"
                            name="password"
                            required
                            className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-12 py-3.5 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder-slate-500"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="relative group">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-400 transition-colors" size={20} />
                        <input
                            type="tel"
                            name="phone"
                            required
                            className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-12 py-3.5 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder-slate-500"
                            placeholder="Mobile Number"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="flex items-start pt-2">
                    <div className="flex items-center h-5">
                        <input
                            id="terms"
                            name="terms"
                            type="checkbox"
                            checked={formData.terms}
                            onChange={handleChange}
                            className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-purple-500 focus:ring-offset-slate-900 focus:ring-purple-500"
                        />
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="text-slate-400">
                        I agree to the <Link to="/policies" className="text-purple-400 hover:text-purple-300 hover:underline">Terms</Link> and <Link to="/policies" className="text-purple-400 hover:text-purple-300 hover:underline">Privacy Policy</Link>.
                        </label>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-500/20 transition-all transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center mt-6"
                >
                    {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : (
                        <>Create Account <ArrowRight size={18} className="ml-2" /></>
                    )}
                </button>
             </form>

             <div className="mt-8 text-center text-sm text-slate-400">
                 Already have an account?{' '}
                 <Link to="/login" className="text-white font-bold hover:text-purple-400 transition-colors">
                     Sign In
                 </Link>
             </div>
          </div>
       </motion.div>
    </div>
  );
};

export default Register;
