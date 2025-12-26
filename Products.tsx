
import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../services/mockApi';
import { ProductCategory } from '../types';
import { Search } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const Products: React.FC = () => {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [activeHash, setActiveHash] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    getAllProducts().then(setCategories);
    // Set initial active hash
    const handleScroll = () => {
       const sections = document.querySelectorAll('section[id]');
       let current = '';
       sections.forEach(section => {
           const sectionTop = (section as HTMLElement).offsetTop;
           if (window.scrollY >= sectionTop - 150) {
               current = section.getAttribute('id') || '';
           }
       });
       setActiveHash(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
        // Offset for sticky header
        const offset = 120; 
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
        setActiveHash(id);
    }
  };

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* Header Search Section */}
      <motion.div 
         initial={{ opacity: 0, y: -20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6 }}
         className="bg-brand-blue text-white pt-20 pb-24 text-center px-4"
      >
         <h1 className="text-3xl md:text-5xl font-bold mb-6 font-serif">
             All the software you need to <br/> run your business
         </h1>
         <div className="max-w-2xl mx-auto relative">
             <input 
                type="text" 
                placeholder="I'm looking for..." 
                className="w-full py-4 px-6 pr-12 rounded-lg text-gray-900 shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
             />
             <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                 <Search size={24} />
             </div>
         </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
         <div className="flex flex-col lg:flex-row gap-8">
             
             {/* Mobile Sticky Category Nav */}
             <div className="lg:hidden sticky top-[64px] z-30 bg-white shadow-md rounded-lg mb-4 overflow-x-auto whitespace-nowrap py-3 px-2 hide-scrollbar">
                <div className="flex space-x-2">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => scrollToSection(cat.id)}
                            className={`px-4 py-2 rounded-full text-sm font-bold border transition-colors ${
                                activeHash === cat.id
                                ? 'bg-brand-blue text-white border-brand-blue'
                                : 'bg-gray-50 text-gray-600 border-gray-200'
                            }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
             </div>

             {/* Sticky Sidebar Navigation (Desktop) */}
             <div className="hidden lg:block w-64 flex-shrink-0">
                 <div className="sticky top-24 bg-white rounded-lg shadow-md p-4">
                     <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 px-2">Apps</h3>
                     <ul className="space-y-1">
                         {categories.map(cat => (
                             <li key={cat.id}>
                                 <button 
                                    onClick={() => scrollToSection(cat.id)}
                                    className={`w-full text-left px-3 py-2 rounded text-sm font-medium transition-colors ${
                                        activeHash === cat.id 
                                        ? 'bg-blue-50 text-brand-blue border-l-4 border-brand-blue' 
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                                 >
                                     {cat.label}
                                 </button>
                             </li>
                         ))}
                     </ul>
                 </div>
             </div>

             {/* Main Content Area */}
             <div className="flex-1 pb-20">
                 <div className="space-y-16 mt-8">
                     {categories.map((cat) => (
                         <section key={cat.id} id={cat.id} className="scroll-mt-32 md:scroll-mt-24">
                             <motion.div
                               initial={{ opacity: 0, x: -30 }}
                               whileInView={{ opacity: 1, x: 0 }}
                               viewport={{ once: true, margin: "-100px" }}
                               transition={{ duration: 0.6 }}
                             >
                                 <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                                     {cat.label}
                                 </h2>
                                 <p className="text-gray-600 mb-8 max-w-3xl">
                                     Help your {cat.label.toLowerCase()} teams be more productive with tools they'll love.
                                 </p>
                             </motion.div>
                             
                             <motion.div 
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                variants={container}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, margin: "-50px" }}
                             >
                                 {cat.products.map((product) => (
                                     <motion.div 
                                        key={product.id} 
                                        variants={item}
                                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                        onClick={() => navigate(`/product/${product.id}`)}
                                        className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-lg transition-all flex flex-col h-full hover:border-blue-200 cursor-pointer"
                                     >
                                         <div className="flex items-center mb-4">
                                             <div className="text-brand-blue mr-3 p-2 bg-blue-50 rounded-lg">
                                                 <product.icon size={28} />
                                             </div>
                                             <h3 className="font-bold text-xl text-gray-800">{product.name}</h3>
                                             {product.isNew && (
                                                 <span className="ml-auto bg-green-100 text-green-800 text-[10px] font-bold px-2 py-1 rounded uppercase">New</span>
                                             )}
                                         </div>
                                         <p className="text-gray-600 text-sm mb-6 flex-grow">
                                             {product.description}
                                         </p>
                                         <div className="mt-auto pt-4 border-t border-gray-50">
                                             <button 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(`/product/${product.id}`);
                                                }}
                                                className="text-brand-blue font-bold text-sm hover:underline uppercase tracking-wide"
                                             >
                                                 Try Now
                                             </button>
                                         </div>
                                     </motion.div>
                                 ))}
                             </motion.div>
                         </section>
                     ))}
                 </div>
             </div>

         </div>
      </div>

    </div>
  );
};

export default Products;
