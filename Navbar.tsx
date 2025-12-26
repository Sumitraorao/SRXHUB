
import React, { useState, useRef, useEffect } from 'react';
import { Search, Menu, X, ChevronDown, User, LogOut, LayoutGrid } from 'lucide-react';
import { NAV_ITEMS, ENTERPRISE_NAV_ITEMS } from '../constants';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ProductsMenu from './ProductsMenu';

const Navbar: React.FC = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const isEnterprise = location.pathname === '/enterprise';
  const navItemsToRender = isEnterprise ? ENTERPRISE_NAV_ITEMS : NAV_ITEMS;

  // Check authentication status on mount and route change
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user');
      const accessToken = localStorage.getItem('accessToken');
      
      if (accessToken && storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error("Error parsing user data", e);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };
    checkAuth();
  }, [location]);

  // Close menus when route changes
  useEffect(() => {
    setIsMobileOpen(false);
    setActiveMenu(null);
  }, [location]);

  // Handle click outside to close menus
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNavClick = (item: any) => {
    if (item.hasMenu || item.menuType) {
      if (activeMenu === item.label) {
        setActiveMenu(null);
      } else {
        setActiveMenu(item.label);
      }
    }
  };

  const handleActionClick = () => {
      if (isEnterprise) {
        navigate('/contact');
      } else {
        if (user) {
            navigate('/dashboard');
        } else {
            navigate('/register');
        }
      }
  };

  const handleLogout = () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      setUser(null);
      navigate('/login');
  };

  const handleScrollLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const elementId = href.substring(1);
      const element = document.getElementById(elementId);
      if (element) {
        const headerOffset = 80; // Adjust for sticky header height
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
        setIsMobileOpen(false);
      }
    }
  };

  return (
    <nav ref={navRef} className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100 font-sans transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo and Desktop Nav */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center cursor-pointer group">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-red to-yellow-500 rounded flex items-center justify-center text-white font-bold text-xl mr-2 group-hover:opacity-90 transition-opacity">
                S
              </div>
              <div className="flex flex-col">
                  <span className="font-bold text-2xl tracking-tighter text-gray-800 leading-none">SRXHUB</span>
                  {isEnterprise && <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500">For Enterprise</span>}
              </div>
            </Link>
            
            <div className="hidden md:ml-8 md:flex md:space-x-6">
              {navItemsToRender.map((item) => (
                <div key={item.label} className="group relative">
                  {item.hasMenu ? (
                    <button 
                      onClick={() => handleNavClick(item)}
                      className={`text-gray-600 hover:text-gray-900 font-medium text-sm flex items-center outline-none ${activeMenu === item.label ? 'text-brand-red font-bold' : ''}`}
                    >
                      {item.label} <ChevronDown size={14} className={`ml-1 transition-transform ${activeMenu === item.label ? 'rotate-180' : ''}`} />
                    </button>
                  ) : (
                    item.href.startsWith('http') ? (
                      <a 
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900 font-medium text-sm flex items-center"
                      >
                        {item.label}
                      </a>
                    ) : item.href.startsWith('#') ? (
                      <a 
                        href={item.href}
                        onClick={(e) => handleScrollLink(e, item.href)}
                        className="text-gray-600 hover:text-gray-900 font-medium text-sm flex items-center cursor-pointer"
                      >
                         {item.label}
                      </a>
                    ) : (
                      <Link to={item.href} className="text-gray-600 hover:text-gray-900 font-medium text-sm flex items-center">
                        {item.label}
                      </Link>
                    )
                  )}

                  {/* Simple Dropdown for non-mega menus */}
                  {item.menuType === 'dropdown' && activeMenu === item.label && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                      {item.subItems?.map((sub) => (
                        <Link 
                          key={sub.label} 
                          to={sub.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-blue"
                          onClick={() => setActiveMenu(null)}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <Search className="text-gray-500 hover:text-gray-800 cursor-pointer" size={20} />
            
            {/* Replaced English selector with Dashboard link for logged-in users */}
            {!isEnterprise && user && (
                <Link to="/dashboard" className="flex items-center text-gray-600 text-sm font-medium cursor-pointer hover:text-brand-blue transition-colors">
                  <LayoutGrid size={16} className="mr-1" /> Dashboard
                </Link>
            )}
            
            {!isEnterprise && (
                user ? (
                    <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
                        {/* User Profile View */}
                        <div className="flex items-center group relative cursor-pointer" onClick={() => navigate('/dashboard')}>
                            <div className="w-8 h-8 rounded-full bg-brand-dark text-white flex items-center justify-center font-bold mr-2 text-xs">
                                {user.first_name ? user.first_name[0] : 'U'}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-gray-800 leading-none">{user.first_name}</span>
                                <span className="text-[10px] text-gray-500">My Account</span>
                            </div>
                        </div>
                        <button onClick={handleLogout} className="text-gray-400 hover:text-red-600 transition-colors" title="Logout">
                            <LogOut size={18} />
                        </button>
                    </div>
                ) : (
                    <Link to="/login" className="text-brand-red font-semibold text-sm hover:underline">Sign In</Link>
                )
            )}

            {/* If user is logged in, show Dashboard button, else show Sign Up/Contact */}
            <button 
              onClick={handleActionClick}
              className={`px-4 py-2 rounded text-sm font-bold transition-colors shadow-sm flex items-center ${
                  isEnterprise 
                  ? 'bg-brand-red text-white hover:bg-brand-darkRed' 
                  : (user ? 'bg-brand-blue text-white hover:bg-blue-700' : 'bg-brand-red text-white hover:bg-brand-darkRed')
              }`}
            >
              {isEnterprise ? 'Contact Sales' : (user ? 'Open App' : 'Sign Up')}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="text-gray-600 p-2">
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mega Menu - Only show if not Enterprise and active menu is 'Products' - WRAPPED IN HIDDEN ON MOBILE */}
      {activeMenu === 'Products' && !isEnterprise && (
        <div className="hidden md:block">
            <ProductsMenu onClose={() => setActiveMenu(null)} />
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute top-16 left-0 w-full shadow-lg h-[calc(100dvh-64px)] overflow-y-auto z-50 pb-20">
          <div className="flex flex-col p-4 space-y-4">
            {navItemsToRender.map((item) => (
              <div key={item.label} className="border-b border-gray-50 pb-2">
                 {item.hasMenu ? (
                   <div>
                     <button 
                        className="text-gray-800 font-bold block py-2 w-full text-left flex justify-between items-center"
                        onClick={() => setActiveMenu(activeMenu === item.label ? null : item.label)}
                     >
                       {item.label} <ChevronDown size={14} className={`transform ${activeMenu === item.label ? 'rotate-180' : ''}`} />
                     </button>
                     {activeMenu === item.label && (
                       <div className="pl-4 space-y-2 pb-2">
                          {item.menuType === 'mega' ? (
                              <Link to="/products" className="block text-gray-600 text-sm py-1" onClick={() => setIsMobileOpen(false)}>All Products</Link>
                          ) : (
                              item.subItems?.map(sub => (
                                <Link key={sub.label} to={sub.href} className="block text-gray-600 text-sm py-1" onClick={() => setIsMobileOpen(false)}>
                                  {sub.label}
                                </Link>
                              ))
                          )}
                       </div>
                     )}
                   </div>
                 ) : (
                    item.href.startsWith('http') ? (
                      <a 
                        href={item.href} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-gray-700 font-medium block py-2"
                        onClick={() => setIsMobileOpen(false)}
                      >
                         {item.label}
                      </a>
                    ) : item.href.startsWith('#') ? (
                      <a 
                        href={item.href}
                        onClick={(e) => handleScrollLink(e, item.href)}
                        className="text-gray-700 font-medium block py-2"
                      >
                         {item.label}
                      </a>
                    ) : (
                      <Link to={item.href} className="text-gray-700 font-medium block py-2" onClick={() => setIsMobileOpen(false)}>
                        {item.label}
                      </Link>
                    )
                 )}
              </div>
            ))}
            <div className="pt-4 flex flex-col space-y-4">
              {!isEnterprise && (
                  user ? (
                    <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-brand-dark text-white flex items-center justify-center font-bold mr-3 text-xs">
                                {user.first_name ? user.first_name[0] : 'U'}
                            </div>
                            <span className="font-bold text-gray-800">{user.first_name}</span>
                        </div>
                        <button onClick={handleLogout} className="text-red-600 font-medium text-xs flex items-center">
                            <LogOut size={14} className="mr-1"/> Logout
                        </button>
                    </div>
                  ) : (
                    <Link to="/login" className="text-gray-700 font-medium text-center">Sign In</Link>
                  )
              )}
              <button 
                onClick={() => { handleActionClick(); setIsMobileOpen(false); }} 
                className={`text-white py-3 rounded font-bold w-full shadow-md ${user ? 'bg-brand-blue' : 'bg-brand-red'}`}
              >
                {isEnterprise ? 'Contact Sales' : (user ? 'Go to Dashboard' : 'Sign Up')}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
