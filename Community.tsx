
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MessageCircle, Heart, Users, Calendar, ArrowRight, UserCheck, Trophy, Globe } from 'lucide-react';
import { Users as UsersIcon, Mail, BookOpen, PenTool, BarChart, Settings, Headphones, DollarSign, Layout, Briefcase } from 'lucide-react';
import { getRandomImage, IMAGE_POOLS } from '../constants';
import { Link, useNavigate } from 'react-router-dom';

const Community: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'announcements' | 'discussed'>('announcements');
  const [heroImage, setHeroImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setHeroImage(getRandomImage('people'));
  }, []);

  const forumIcons = [
      { icon: UsersIcon, label: 'CRM', id: 'crm' },
      { icon: Mail, label: 'Mail', id: 'mail' },
      { icon: PenTool, label: 'Creator', id: 'catalyst' },
      { icon: Briefcase, label: 'Projects', id: 'projects' },
      { icon: BookOpen, label: 'Books', id: 'books' },
      { icon: Headphones, label: 'Desk', id: 'desk' },
      { icon: BarChart, label: 'Campaigns', id: 'campaigns' },
      { icon: UserCheck, label: 'Recruit', id: 'recruit' },
  ];

  const announcements = [
      { id: 1, title: 'Ask the Experts 26: Brighten every customer interaction with SRXHUB Desk', date: 'December 2025', author: 'Lydia | SRXHUB Desk' },
      { id: 2, title: 'Introducing Dedicated Modules for Plans, Addons, and Coupons', date: 'December 2025', author: 'Prashanthini J' },
      { id: 3, title: 'Send Automated WhatsApp Messages and Leverage the Improved WhatsApp Templates', date: 'December 2025', author: 'Harinick' },
      { id: 4, title: 'Gain control over record sharing with portal users through our new enhancement', date: 'October 2025', author: 'Saranya Balasubramanian' },
  ];

  const discussed = [
      { id: 1, title: 'How to automate lead assignment in CRM based on region?', date: '2 days ago', author: 'Mark S.', replies: 14 },
      { id: 2, title: 'SRXHUB Books: GST Filing issues in new portal', date: '5 days ago', author: 'Anita R.', replies: 32 },
      { id: 3, title: 'Custom Function to fetch data from Creator to CRM', date: '1 week ago', author: 'DevGuy99', replies: 8 },
  ];

  const events = [
      { id: 1, title: 'Mumbai ZUG Meetup - Lead Nurturing with SRXHUB', date: 'DEC 16, 2025', location: 'Mumbai, India' },
      { id: 2, title: 'Hyderabad ZUG Meetup - Lead Nurturing with SRXHUB', date: 'DEC 19, 2025', location: 'Rai Durg, India' },
      { id: 3, title: 'Tech Support ZUG Meetup | Away but Not Absent', date: 'DEC 17, 2025', location: 'Online event' },
      { id: 4, title: 'Pune ZUG Meetup - Lead Nurturing with SRXHUB', date: 'DEC 18, 2025', location: 'Pune, India' },
  ];

  return (
    <div className="bg-white min-h-screen font-sans">
      
      {/* Hero Section */}
      <section className="bg-[#E5F6EE] py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center">
              <motion.div 
                 initial={{ opacity: 0, x: -50 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.8 }}
                 className="md:w-1/2 z-10"
              >
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                      SRXHUB Community
                  </h1>
                  <p className="text-xl text-gray-600 mb-8 max-w-lg">
                      Where SRXHUB enthusiasts connect, engage, and learn from each other.
                  </p>
                  <div className="flex space-x-8 mb-8">
                      <div>
                          <span className="block text-2xl font-bold text-gray-900">120,000+</span>
                          <span className="text-sm text-gray-500">Members</span>
                      </div>
                      <div>
                          <span className="block text-2xl font-bold text-gray-900">650,000+</span>
                          <span className="text-sm text-gray-500">Discussions</span>
                      </div>
                  </div>
                  <div className="relative max-w-md mb-8">
                      <input 
                         type="text" 
                         placeholder="Search..." 
                         className="w-full pl-12 pr-4 py-3 rounded-full shadow-sm border border-gray-200 focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none"
                      />
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  </div>
                  <Link to="/register" className="bg-brand-red hover:bg-brand-darkRed text-white font-bold py-3 px-8 rounded shadow-lg transition-transform hover:-translate-y-1 inline-block">
                      JOIN NOW
                  </Link>
              </motion.div>

              <motion.div 
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.8 }}
                 className="md:w-1/2 mt-10 md:mt-0 relative"
              >
                  {/* Abstract illustration representation */}
                  {heroImage && (
                      <img 
                          src={heroImage} 
                          alt="Community" 
                          className="rounded-xl shadow-2xl relative z-10 w-full object-cover h-[400px]"
                      />
                  )}
                  {/* Decorative blobs */}
                  <div className="absolute top-[-20px] right-[-20px] w-24 h-24 bg-yellow-400 rounded-full opacity-50 blur-2xl"></div>
                  <div className="absolute bottom-[-20px] left-[-20px] w-32 h-32 bg-blue-400 rounded-full opacity-50 blur-2xl"></div>
              </motion.div>
          </div>
      </section>

      {/* Action Cards */}
      <section className="py-16 bg-white relative -mt-10 z-20">
          <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                      { icon: MessageCircle, title: 'Ask questions', text: 'Over 100,000 members and experts comprise SRXHUB Community - so why not ask a question or share an idea?', action: 'Post now', color: 'text-orange-500', bg: 'bg-orange-50' },
                      { icon: Heart, title: 'Give answers', text: 'Want to return the favor? Help fellow users out with your expertise and gain points along the way!', action: 'Answer now', color: 'text-pink-500', bg: 'bg-pink-50' },
                      { icon: Users, title: 'Join a ZUG near you', text: 'Choose from over 140 SRXHUB User Groups (ZUGs) across the world to stay informed of meetups near you.', action: 'Join now', color: 'text-blue-500', bg: 'bg-blue-50' }
                  ].map((card, idx) => (
                      <motion.div 
                         key={idx}
                         whileHover={{ y: -10 }}
                         className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 text-center flex flex-col items-center"
                      >
                          <div className={`w-16 h-16 ${card.bg} rounded-full flex items-center justify-center mb-6`}>
                              <card.icon className={card.color} size={32} />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-3">{card.title}</h3>
                          <p className="text-gray-600 text-sm mb-6 leading-relaxed flex-grow">{card.text}</p>
                          <Link to="/register" className="font-bold text-gray-800 hover:text-brand-red flex items-center">
                              {card.action} <ArrowRight size={16} className="ml-2" />
                          </Link>
                      </motion.div>
                  ))}
              </div>
          </div>
      </section>

      {/* Product Forums */}
      <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">SRXHUB Product Forums</h2>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                  {forumIcons.map((item, idx) => (
                      <motion.div 
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => navigate(`/product/${item.id}`)}
                        className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md flex flex-col items-center justify-center cursor-pointer transition-all"
                      >
                          <item.icon className="text-gray-600 mb-2" size={28} />
                          <span className="text-sm font-medium text-gray-700">{item.label}</span>
                      </motion.div>
                  ))}
              </div>
              <div className="text-center mt-8">
                  <Link to="/products" className="text-brand-blue font-bold text-sm hover:underline">VIEW ALL</Link>
              </div>
          </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
              <div className="flex flex-col lg:flex-row gap-12">
                  
                  {/* Left Column: Discussions */}
                  <div className="lg:w-2/3">
                      <div className="flex border-b border-gray-200 mb-6">
                          <button 
                             onClick={() => setActiveTab('announcements')}
                             className={`pb-4 px-6 font-bold text-sm flex items-center ${activeTab === 'announcements' ? 'border-b-2 border-brand-blue text-brand-blue' : 'text-gray-500 hover:text-gray-700'}`}
                          >
                             <Layout size={18} className="mr-2" /> Announcements
                          </button>
                          <button 
                             onClick={() => setActiveTab('discussed')}
                             className={`pb-4 px-6 font-bold text-sm flex items-center ${activeTab === 'discussed' ? 'border-b-2 border-brand-blue text-brand-blue' : 'text-gray-500 hover:text-gray-700'}`}
                          >
                             <MessageCircle size={18} className="mr-2" /> Most Discussed
                          </button>
                      </div>
                      
                      <div className="space-y-4">
                          <AnimatePresence mode='wait'>
                              <motion.div
                                 key={activeTab}
                                 initial={{ opacity: 0, y: 10 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 exit={{ opacity: 0, y: -10 }}
                                 transition={{ duration: 0.3 }}
                              >
                                  {(activeTab === 'announcements' ? announcements : discussed).map((item: any) => (
                                      <div key={item.id} className="bg-blue-50/50 p-6 rounded-lg mb-4 hover:bg-blue-50 transition-colors border-l-4 border-brand-blue cursor-pointer group">
                                          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-brand-blue transition-colors">
                                              {item.title}
                                          </h3>
                                          <div className="flex items-center text-xs text-gray-500 space-x-4">
                                              <span>{item.date}</span>
                                              <span className="flex items-center"><UserCheck size={12} className="mr-1" /> {item.author}</span>
                                              {item.replies && <span>{item.replies} replies</span>}
                                          </div>
                                      </div>
                                  ))}
                              </motion.div>
                          </AnimatePresence>
                          <div className="text-center pt-4">
                              <Link to="/products" className="text-brand-blue font-bold text-sm hover:underline border border-brand-blue px-6 py-2 rounded">
                                  LEARN MORE
                              </Link>
                          </div>
                      </div>
                  </div>

                  {/* Right Column: Events */}
                  <div className="lg:w-1/3">
                      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                          <Calendar className="mr-2 text-brand-red" /> Upcoming Events
                      </h3>
                      <div className="space-y-6">
                          {events.map((event) => (
                              <div key={event.id} className="border-b border-gray-100 pb-4 last:border-0">
                                  <div className="text-xs font-bold text-gray-500 mb-1 uppercase tracking-wide">{event.date}</div>
                                  <h4 className="font-bold text-gray-900 text-sm mb-2 hover:text-brand-blue cursor-pointer">{event.title}</h4>
                                  <div className="flex items-center text-xs text-gray-500">
                                      <span className="bg-gray-100 px-2 py-1 rounded flex items-center">
                                         📍 {event.location}
                                      </span>
                                  </div>
                                  <Link to="/register" className="mt-3 text-xs font-bold text-white bg-brand-blue px-3 py-1 rounded hover:bg-blue-700 transition-colors inline-block">
                                      REGISTER NOW
                                  </Link>
                              </div>
                          ))}
                          <a href="#" className="block text-center text-brand-blue font-bold text-sm hover:underline mt-4">
                              VIEW ALL &gt;
                          </a>
                      </div>
                  </div>

              </div>
          </div>
      </section>

      {/* Customer Voices */}
      <section className="py-16 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Customer Voices</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {/* Using the predefined pool of unique images directly to avoid repeats */}
                  {IMAGE_POOLS.people.slice(0, 12).map((img, i) => (
                      <div key={i} className="relative group overflow-hidden rounded-lg cursor-pointer" onClick={() => navigate('/customers')}>
                          <img 
                             src={img}
                             alt={`User ${i + 1}`}
                             className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                              <span className="text-xs font-bold">User Name {i + 1}</span>
                          </div>
                      </div>
                  ))}
              </div>
              <div className="text-center mt-12">
                  <Link to="/customers" className="border border-white text-white font-bold py-2 px-8 rounded hover:bg-white hover:text-black transition-colors">
                      VIEW ALL
                  </Link>
              </div>
          </div>
      </section>

      {/* User Groups Banner */}
      <section className="py-20 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-10 md:mb-0">
                  <h2 className="text-4xl font-bold text-gray-900 mb-6">SRXHUB User Groups</h2>
                  <p className="text-lg text-gray-600 mb-8 max-w-lg">
                      Join SRXHUB User Groups and be part of upcoming meetings near you. Connect and talk SRXHUB with peers, learn from the experts and have fun doing it!
                  </p>
                  <Link to="/register" className="bg-brand-red text-white font-bold py-3 px-8 rounded hover:bg-brand-darkRed transition-colors">
                      JOIN NOW
                  </Link>
              </div>
              <div className="md:w-1/2 flex justify-center">
                  <div className="relative w-80 h-80 bg-white rounded-full flex items-center justify-center shadow-xl">
                      {/* Simulated nodes */}
                      <div className="absolute top-0 left-1/2 w-12 h-12 bg-blue-500 rounded-full border-4 border-white"></div>
                      <div className="absolute bottom-10 right-10 w-16 h-16 bg-green-500 rounded-full border-4 border-white flex items-center justify-center text-white font-bold">ZUG</div>
                      <div className="absolute bottom-10 left-10 w-16 h-16 bg-yellow-500 rounded-full border-4 border-white"></div>
                      <div className="text-center">
                          <Users size={64} className="text-gray-400 mx-auto mb-2" />
                          <div className="font-bold text-xl text-gray-800">Community</div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
    </div>
  );
};

export default Community;
