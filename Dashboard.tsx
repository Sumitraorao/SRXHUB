
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  LayoutGrid, Users, Settings, Bell, Search, LogOut, 
  Plus, ChevronRight, Star, Clock, Menu, X 
} from 'lucide-react';
import { FEATURED_APPS } from '../constants';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
          fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 flex flex-col h-full transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
      `}>
        <div className="p-6 flex items-center justify-between border-b border-gray-100 h-16 shrink-0">
           <Link to="/" className="flex items-center group">
               <div className="w-8 h-8 bg-gradient-to-br from-brand-red to-yellow-500 rounded flex items-center justify-center text-white font-bold text-lg shadow-sm mr-3 group-hover:opacity-90 transition-opacity">
                  S
               </div>
               <span className="font-bold text-xl text-gray-800 tracking-tight group-hover:text-brand-blue transition-colors">SRXHUB</span>
           </Link>
           <button 
             onClick={() => setIsMobileMenuOpen(false)} 
             className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
           >
               <X size={24} />
           </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
           <a href="#" className="flex items-center px-4 py-3 text-sm font-medium rounded-lg bg-blue-50 text-brand-blue">
              <LayoutGrid size={20} className="mr-3" /> Dashboard
           </a>
           <a href="#" className="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
              <Users size={20} className="mr-3" /> My Teams
           </a>
           <a href="#" className="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
              <Star size={20} className="mr-3" /> Favorites
           </a>
           <a href="#" className="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
              <Settings size={20} className="mr-3" /> Settings
           </a>
        </nav>

        <div className="p-4 border-t border-gray-100 shrink-0">
           <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              <LogOut size={20} className="mr-3" /> Sign Out
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen md:ml-64 w-full overflow-x-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-10 shrink-0">
            <div className="flex items-center">
               <button 
                 onClick={() => setIsMobileMenuOpen(true)} 
                 className="mr-4 text-gray-500 md:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none"
               >
                   <Menu size={24} />
               </button>
               
               {/* Mobile Logo */}
               <Link to="/" className="flex items-center md:hidden">
                   <div className="w-8 h-8 bg-gradient-to-br from-brand-red to-yellow-500 rounded flex items-center justify-center text-white font-bold mr-3">S</div>
               </Link>
            </div>
            
            <div className="flex-1 max-w-xl mx-4 hidden md:block">
               <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search for apps, reports, or data..." 
                    className="w-full pl-10 pr-4 py-2 bg-gray-100 border-none rounded-lg focus:ring-2 focus:ring-brand-blue focus:bg-white transition-all text-sm outline-none"
                  />
               </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
               <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 relative">
                  <Bell size={20} />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
               </button>
               <div className="flex items-center space-x-3 pl-2 sm:pl-4 border-l border-gray-200">
                  <div className="text-right hidden sm:block">
                      <div className="text-sm font-bold text-gray-800">{user.first_name} {user.last_name}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                  </div>
                  <div className="w-8 h-8 sm:w-9 sm:h-9 bg-brand-dark text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {user.first_name?.[0]}
                  </div>
               </div>
            </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-6xl mx-auto">
               <div className="mb-8">
                   <h1 className="text-2xl font-bold text-gray-900 mb-2">Good afternoon, {user.first_name}!</h1>
                   <p className="text-gray-500">Here's what's happening in your organization today.</p>
               </div>

               {/* My Apps Grid */}
               <div className="mb-10">
                  <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-bold text-gray-800">My Apps</h2>
                      <button onClick={() => navigate('/products')} className="text-sm text-brand-blue font-bold hover:underline flex items-center">
                          View All <ChevronRight size={16} />
                      </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                      {FEATURED_APPS.map((app, idx) => (
                          <div key={idx} onClick={() => navigate('/product/' + app.name.toLowerCase().replace(' ', ''))} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                              <div className={`w-12 h-12 ${app.color.replace('text-', 'bg-').replace('500', '100')} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                  <app.icon className={app.color} size={24} />
                              </div>
                              <h3 className="font-bold text-gray-900 mb-1">{app.name}</h3>
                              <p className="text-xs text-gray-500 line-clamp-2">{app.description}</p>
                          </div>
                      ))}
                      <div onClick={() => navigate('/products')} className="bg-gray-50 border-2 border-dashed border-gray-300 p-6 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white hover:border-brand-blue transition-colors group">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mb-2 group-hover:bg-blue-50 group-hover:text-brand-blue transition-colors">
                              <Plus size={20} />
                          </div>
                          <span className="text-sm font-bold text-gray-600 group-hover:text-brand-blue">Add App</span>
                      </div>
                  </div>
               </div>

               {/* Recent Activity / Widgets */}
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                   <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                       <h3 className="font-bold text-gray-800 mb-6 flex items-center">
                           <Clock size={18} className="mr-2 text-gray-400" /> Recent Activity
                       </h3>
                       <div className="space-y-6">
                           {[1,2,3].map((_, i) => (
                               <div key={i} className="flex items-start pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                                   <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 mr-4 flex items-center justify-center text-xs font-bold text-blue-600">
                                       SA
                                   </div>
                                   <div>
                                       <p className="text-sm text-gray-800">
                                           <span className="font-bold">System Admin</span> updated the security policies for <span className="font-medium text-blue-600">Engineering Team</span>.
                                       </p>
                                       <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                                   </div>
                               </div>
                           ))}
                       </div>
                   </div>

                   <div className="bg-gradient-to-br from-brand-dark to-gray-900 rounded-xl shadow-lg p-6 text-white h-fit">
                       <h3 className="font-bold text-lg mb-2">Upgrade to Enterprise</h3>
                       <p className="text-sm text-gray-400 mb-6">Unlock advanced security, unlimited apps, and 24/7 dedicated support.</p>
                       <button onClick={() => navigate('/enterprise')} className="w-full py-3 bg-brand-red hover:bg-brand-darkRed rounded-lg font-bold text-sm transition-colors shadow-lg">
                           VIEW PLANS
                       </button>
                   </div>
               </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
