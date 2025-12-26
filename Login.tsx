
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, Loader2, Mail, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
        navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setError('');
    setTimeout(() => {
         const mockUser = {
            id: 'google_user_123',
            email: 'user@gmail.com',
            first_name: 'Sumit',
            last_name: 'Rao',
            role: 'user',
            phone_number: '', 
            picture: 'https://lh3.googleusercontent.com/a/default-user=s96-c' 
        };
        localStorage.setItem('accessToken', 'mock_google_access_token');
        localStorage.setItem('refreshToken', 'mock_google_refresh_token');
        localStorage.setItem('user', JSON.stringify(mockUser));

        if (!mockUser.phone_number) {
            navigate('/complete-profile');
        } else {
            navigate('/dashboard');
        }
        setIsLoading(false);
    }, 1500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    setTimeout(() => {
        if (email && password.length >= 6) {
             const mockUser = {
                id: '1',
                email: email,
                first_name: 'Demo',
                last_name: 'User',
                role: 'admin',
                phone_number: '9876543210' 
            };
            localStorage.setItem('accessToken', 'mock_access_token_12345');
            localStorage.setItem('refreshToken', 'mock_refresh_token_12345');
            localStorage.setItem('user', JSON.stringify(mockUser));
            navigate('/dashboard');
        } else {
            setError('Invalid email or password (password must be 6+ chars)');
        }
        setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#0f172a] font-sans selection:bg-cyan-500 selection:text-white">
      
      {/* Animated Cosmic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[120px] animate-blob"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/30 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
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
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-md px-6"
      >
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden p-8 sm:p-10">
              
              <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Welcome Back</h2>
                  <p className="text-slate-400 text-sm">Enter your credentials to access your workspace.</p>
              </div>
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                  {error && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 flex items-center gap-3"
                      >
                          <AlertCircle className="h-5 w-5 text-red-400 shrink-0" />
                          <p className="text-sm font-medium text-red-200">{error}</p>
                      </motion.div>
                  )}

                  <div className="space-y-4">
                      <div className="relative group">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-400 transition-colors" size={20} />
                          <input
                              type="email"
                              required
                              className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-12 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all placeholder-slate-500"
                              placeholder="Email address"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                          />
                      </div>
                      <div className="relative group">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-400 transition-colors" size={20} />
                          <input
                              type="password"
                              required
                              className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-12 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all placeholder-slate-500"
                              placeholder="Password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                          />
                      </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center text-slate-300 cursor-pointer hover:text-white transition-colors">
                          <input type="checkbox" className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-offset-slate-900 focus:ring-cyan-500" />
                          <span className="ml-2">Remember me</span>
                      </label>
                      <a href="#" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">Forgot Password?</a>
                  </div>

                  <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-cyan-500/20 transition-all transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                      {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : (
                          <>Sign In <ArrowRight size={18} className="ml-2" /></>
                      )}
                  </button>
              </form>

              <div className="mt-8">
                  <div className="relative">
                      <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-700" /></div>
                      <div className="relative flex justify-center text-xs uppercase tracking-widest"><span className="px-4 bg-[#161f32] text-slate-500 rounded-full">Or continue with</span></div>
                  </div>

                  <button
                      type="button"
                      onClick={handleGoogleLogin}
                      disabled={isLoading}
                      className="mt-6 w-full flex justify-center items-center py-3 px-4 border border-slate-700 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors font-medium"
                  >
                      <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                      Google
                  </button>
              </div>

              <div className="mt-8 text-center text-sm text-slate-400">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-cyan-400 hover:text-cyan-300 font-bold hover:underline transition-colors">
                      Sign Up Free
                  </Link>
              </div>
          </div>
      </motion.div>
    </div>
  );
};

export default Login;
