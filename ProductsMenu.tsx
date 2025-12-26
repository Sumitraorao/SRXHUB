
import React, { useState, useEffect } from 'react';
import { PRODUCT_CATEGORIES } from '../constants';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, X } from 'lucide-react';

interface ProductsMenuProps {
  onClose: () => void;
}

const ProductsMenu: React.FC<ProductsMenuProps> = ({ onClose }) => {
  const [activeCategory, setActiveCategory] = useState(PRODUCT_CATEGORIES[0].id);

  const selectedCategoryData = PRODUCT_CATEGORIES.find(c => c.id === activeCategory);

  return (
    <div className="absolute top-16 left-0 w-full bg-white shadow-xl z-40 border-t border-gray-100 h-[500px] flex animate-in slide-in-from-top-2 duration-200">
      
      {/* Close Button Mobile/Tablet */}
      <button onClick={onClose} className="absolute top-4 right-4 md:hidden">
        <X size={24} />
      </button>

      <div className="max-w-7xl mx-auto w-full flex">
        
        {/* Left Sidebar: Categories */}
        <div className="w-1/4 bg-gray-50 border-r border-gray-200 overflow-y-auto py-6">
          <div className="mb-6 px-6">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Categories</h3>
            <ul className="space-y-1">
              {PRODUCT_CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full text-left px-4 py-3 rounded-md text-sm font-medium flex justify-between items-center transition-all ${
                      activeCategory === cat.id 
                        ? 'bg-white text-brand-blue shadow-sm' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {cat.label}
                    {activeCategory === cat.id && <ChevronRight size={14} />}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="px-6 mt-8">
             <Link 
               to="/products" 
               onClick={onClose}
               className="flex items-center text-brand-blue font-bold text-sm hover:underline"
             >
                EXPLORE ALL PRODUCTS <ArrowRight size={14} className="ml-2"/>
             </Link>
          </div>
        </div>

        {/* Right Content: Products Grid */}
        <div className="w-3/4 p-8 overflow-y-auto bg-white">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{selectedCategoryData?.label}</h2>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedCategoryData?.products.map((product) => (
              <Link to={`/product/${product.id}`} onClick={onClose} key={product.id} className="group flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="mr-3 mt-1 text-gray-600 group-hover:text-brand-blue transition-colors">
                  <product.icon size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm group-hover:text-brand-blue flex items-center">
                    {product.name}
                    {product.isNew && <span className="ml-2 text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded uppercase font-bold">New</span>}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{product.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductsMenu;
