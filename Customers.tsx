import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, ArrowRight, Loader2, Filter } from 'lucide-react';
import { CUSTOMER_LOGOS, CUSTOMER_STORIES, CUSTOMER_FILTERS } from '../constants';

const Customers: React.FC = () => {
  const [count, setCount] = useState(0);
  const targetCount = 130; // 130 Million
  const [visibleCount, setVisibleCount] = useState(9);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  // Filter State: Category -> Set of selected options
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Number counting animation
  useEffect(() => {
    let start = 0;
    const duration = 2000; // 2 seconds
    const increment = targetCount / (duration / 16); // 60fps

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetCount) {
        setCount(targetCount);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, []);

  const handleFilterChange = (category: string, option: string) => {
    // Reset visible count when filters change to show top results
    setVisibleCount(9);
    
    setSelectedFilters(prev => {
        const currentOptions = prev[category] || [];
        const isSelected = currentOptions.includes(option);
        
        let newOptions;
        if (isSelected) {
            newOptions = currentOptions.filter(o => o !== option);
        } else {
            newOptions = [...currentOptions, option];
        }

        // Clean up empty arrays
        if (newOptions.length === 0) {
            const { [category]: _, ...rest } = prev;
            return rest;
        }

        return {
            ...prev,
            [category]: newOptions
        };
    });
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    // Simulate network delay for effect
    setTimeout(() => {
        setVisibleCount(prev => prev + 6);
        setIsLoadingMore(false);
    }, 500);
  };

  const allFilteredStories = CUSTOMER_STORIES.filter(story => {
      // If no filters selected, show all
      if (Object.keys(selectedFilters).length === 0) return true;

      // Check if story matches ALL selected categories (AND logic across categories)
      return Object.entries(selectedFilters).every(([category, selectedOptions]) => {
          // Explicit cast to fix type safety
          const options = selectedOptions as string[];
          const filters = story.filters as Record<string, string> | undefined;
          const storyValue = filters?.[category];
          
          if (!storyValue) return false;
          return options.includes(storyValue);
      });
  });

  const visibleStories = allFilteredStories.slice(0, visibleCount);
  const hasMoreStories = allFilteredStories.length > visibleCount;

  return (
    <div className="bg-white min-h-screen">
      
      {/* Hero Section */}
      <section className="pt-16 pb-12 bg-white text-center px-4">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
        >
          <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-yellow-500 mx-auto mb-8"></div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
             Trusted by over <span className="text-brand-red">{count} Million Users</span> globally
          </h1>
          <p className="text-gray-500 text-sm tracking-widest uppercase">The world's leading companies trust SRXHUB to run their different business operations.</p>
        </motion.div>
      </section>

      {/* Logo Wall */}
      <section className="w-full bg-gray-50 border-y border-gray-100 overflow-hidden">
         <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9">
            {CUSTOMER_LOGOS.map((logo, idx) => (
                <motion.div 
                   key={idx}
                   initial={{ opacity: 0 }}
                   whileInView={{ opacity: 1 }}
                   transition={{ delay: idx * 0.05 }}
                   className={`h-32 flex items-center justify-center p-4 border border-white/50 ${logo.color} font-bold text-lg md:text-xl shadow-sm hover:shadow-md transition-shadow cursor-default`}
                >
                    {logo.name}
                </motion.div>
            ))}
         </div>
      </section>

      {/* Main Content: Sidebar + Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row gap-8">
              
              {/* Sidebar Filters */}
              <div className="lg:w-1/4">
                  <div className="sticky top-24">
                      {/* Mobile Filter Toggle */}
                      <div className="flex justify-between items-center mb-6 lg:hidden bg-gray-50 p-4 rounded-lg cursor-pointer" onClick={() => setShowMobileFilters(!showMobileFilters)}>
                          <span className="font-bold text-gray-900 flex items-center"><Filter size={18} className="mr-2"/> Filters</span>
                          <button className="text-brand-blue text-sm font-bold">{showMobileFilters ? 'Hide' : 'Expand'}</button>
                      </div>
                      
                      <div className={`${showMobileFilters ? 'block' : 'hidden'} lg:block space-y-8`}>
                          {CUSTOMER_FILTERS.map((filter, idx) => (
                              <div key={idx} className="border-b border-gray-200 pb-6 last:border-0">
                                  <h3 className="font-bold text-gray-900 mb-4 flex justify-between items-center cursor-pointer group">
                                      {filter.category}
                                      <Search size={16} className="text-gray-400 group-hover:text-brand-blue" />
                                  </h3>
                                  <ul className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                                      {filter.options.map((opt, oIdx) => {
                                          const isChecked = selectedFilters[filter.category]?.includes(opt) || false;
                                          return (
                                              <li key={oIdx} className="flex items-center group">
                                                  <div className="relative flex items-center">
                                                      <input 
                                                          type="checkbox" 
                                                          id={`${filter.category}-${oIdx}`} 
                                                          className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-gray-300 transition-all checked:border-brand-blue checked:bg-brand-blue"
                                                          checked={isChecked}
                                                          onChange={() => handleFilterChange(filter.category, opt)}
                                                      />
                                                      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100">
                                                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                              <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                          </svg>
                                                      </div>
                                                  </div>
                                                  <label 
                                                      htmlFor={`${filter.category}-${oIdx}`} 
                                                      className={`ml-3 text-sm cursor-pointer select-none transition-colors ${isChecked ? 'text-brand-blue font-medium' : 'text-gray-600 group-hover:text-gray-900'}`}
                                                  >
                                                      {opt}
                                                  </label>
                                              </li>
                                          );
                                      })}
                                  </ul>
                                  {filter.options.length > 5 && (
                                      <button className="text-xs text-brand-blue mt-2 hover:underline">See all</button>
                                  )}
                              </div>
                          ))}
                      </div>
                  </div>
              </div>

              {/* Stories Grid */}
              <div className="lg:w-3/4">
                  <motion.div 
                     layout
                     className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                      <AnimatePresence mode='popLayout'>
                          {visibleStories.map((story) => (
                              <motion.div 
                                 layout
                                 key={story.id}
                                 initial={{ opacity: 0, scale: 0.8 }}
                                 animate={{ opacity: 1, scale: 1 }}
                                 exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                                 whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                                 transition={{ 
                                     layout: { type: "spring", stiffness: 50, damping: 15 },
                                     opacity: { duration: 0.3 }
                                 }}
                                 className="bg-white rounded-lg border border-gray-200 shadow-sm transition-shadow duration-300 flex flex-col overflow-hidden group h-full cursor-pointer"
                              >
                                  {story.type === 'image' && story.image && (
                                      <div className="h-48 overflow-hidden relative">
                                          <img src={story.image} alt={story.company} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                                      </div>
                                  )}
                                  
                                  <div className="p-6 flex flex-col flex-grow relative">
                                      <div className="mb-4">
                                          <span className="font-bold text-xl font-serif text-gray-800 uppercase tracking-widest">{story.logoText}</span>
                                      </div>
                                      
                                      <p className="text-gray-600 text-sm mb-6 leading-relaxed flex-grow">
                                          "{story.quote}"
                                      </p>
                                      
                                      <div className="mt-auto">
                                          {story.author !== 'Read more' ? (
                                              <div className="flex items-start">
                                                 <div className="text-xs">
                                                     <div className="font-bold text-brand-blue">{story.author}</div>
                                                     <div className="text-gray-500">{story.role}</div>
                                                 </div>
                                              </div>
                                          ) : (
                                              <span className="text-brand-blue font-bold text-xs hover:underline flex items-center">
                                                  Read more <ArrowRight size={12} className="ml-1" />
                                              </span>
                                          )}
                                          
                                          {story.author !== 'Read more' && (
                                               <div className="mt-4 pt-4 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                                   <span className="text-brand-blue font-bold text-xs hover:underline flex items-center">
                                                      Read more <ArrowRight size={12} className="ml-1" />
                                                   </span>
                                               </div>
                                          )}
                                      </div>
                                  </div>
                              </motion.div>
                          ))}
                      </AnimatePresence>
                  </motion.div>
                  
                  {visibleStories.length === 0 && (
                      <div className="text-center py-20 text-gray-500 bg-gray-50 rounded-lg">
                          <Search size={48} className="mx-auto text-gray-300 mb-4" />
                          <p className="text-lg">No stories match the selected filters.</p>
                          <button 
                             onClick={() => { setSelectedFilters({}); setVisibleCount(9); }}
                             className="text-brand-blue font-bold mt-2 hover:underline"
                          >
                             Clear all filters
                          </button>
                      </div>
                  )}

                  {hasMoreStories && (
                      <div className="mt-16 text-center">
                          <button 
                             onClick={handleLoadMore}
                             disabled={isLoadingMore}
                             className="bg-white border border-gray-300 text-gray-700 font-bold py-3 px-10 rounded hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900 transition-all shadow-sm active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center mx-auto"
                          >
                              {isLoadingMore ? (
                                  <>
                                     <Loader2 size={18} className="animate-spin mr-2" />
                                     LOADING...
                                  </>
                              ) : (
                                  'LOAD MORE STORIES'
                              )}
                          </button>
                      </div>
                  )}
              </div>
          </div>
      </section>
    </div>
  );
};

export default Customers;