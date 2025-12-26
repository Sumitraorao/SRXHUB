
import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCT_CATEGORIES } from '../constants';
import { 
  ArrowLeft, CheckCircle2, ChevronRight, Star, 
  BarChart2, Mail, Users, Headphones, BookOpen, 
  Zap, Shield, Globe, Play, Layers, ArrowRight,
  TrendingUp, Clock, CreditCard, Smile, Layout,
  Smartphone, Lock, Share2, Briefcase, DollarSign
} from 'lucide-react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';

// --- RICH DATA CONFIGURATION ---
// This holds the specific storytelling elements for your top products
const PRODUCT_DETAILS: Record<string, any> = {
  crm: {
    tagline: "The heartbeat of your sales team.",
    heroTitle: "Convert leads into loyal customers.",
    heroImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2000",
    gradient: "from-blue-600 to-indigo-700",
    accentColor: "text-blue-600",
    lightTheme: "bg-blue-50 text-blue-900",
    icon: Users,
    roleTitle: "I am your Intelligent Sales Engine",
    roleDesc: "I don't just store data; I actively help you sell. I track every customer touchpoint, automate your follow-ups, and visualize your sales pipeline so you never miss a revenue opportunity.",
    features: [
      { title: "Lead Management", desc: "Capture leads from social media, website, and email automatically.", icon: Users },
      { title: "Deal Pipelines", desc: "Visual Kanban boards to track the stage of every potential sale.", icon: BarChart2 },
      { title: "Workflow Automation", desc: "Trigger emails and tasks based on deal stage changes.", icon: Zap },
      { title: "Sales Forecasting", desc: "Predict revenue with AI-backed analytics.", icon: TrendingUp },
    ],
    process: [
      { step: "01", title: "Capture", desc: "Leads land in the system instantly via webforms or email." },
      { step: "02", title: "Nurture", desc: "Automated sequences warm them up until they are ready to buy." },
      { step: "03", title: "Close", desc: "Sign contracts digitally and convert them to happy customers." }
    ]
  },
  mail: {
    tagline: "Secure, ad-free business email.",
    heroTitle: "Communication that means business.",
    heroImage: "https://images.unsplash.com/photo-1557200130-b7220623052f?auto=format&fit=crop&q=80&w=2000",
    gradient: "from-yellow-500 to-orange-600",
    accentColor: "text-yellow-600",
    lightTheme: "bg-yellow-50 text-yellow-900",
    icon: Mail,
    roleTitle: "I am your Secure Digital Postman",
    roleDesc: "I protect your conversations from prying eyes. Unlike free services, I don't read your emails to show ads. I provide encryption, custom domains, and integrated calendars to keep your team synchronized.",
    features: [
      { title: "Custom Domain", desc: "Look professional with you@yourcompany.com.", icon: Globe },
      { title: "Encryption", desc: "S/MIME encryption to keep sensitive data safe.", icon: Shield },
      { title: "Control Panel", desc: "Manage aliases, groups, and policies easily.", icon: Layers },
      { title: "Offline Access", desc: "Read and draft emails without internet.", icon: Zap },
    ],
    process: [
      { step: "01", title: "Connect", desc: "Set up your custom domain and migrate existing emails." },
      { step: "02", title: "Organize", desc: "Use AI filters and folders to keep your inbox zero." },
      { step: "03", title: "Collaborate", desc: "Share folders, calendars, and tasks with your team." }
    ]
  },
  books: {
    tagline: "Accounting made automatic.",
    heroTitle: "Your finances, perfectly balanced.",
    heroImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=2000",
    gradient: "from-green-600 to-emerald-700",
    accentColor: "text-green-600",
    lightTheme: "bg-green-50 text-green-900",
    icon: BookOpen,
    roleTitle: "I am your Digital CFO",
    roleDesc: "I handle invoices, track expenses, reconcile bank accounts, and generate tax reports while you sleep. I ensure you get paid faster and stay compliant with local tax laws.",
    features: [
      { title: "Invoicing", desc: "Send professional invoices that get paid faster.", icon: FileText },
      { title: "Bank Feeds", desc: "Connect your bank for automatic transaction imports.", icon: CreditCard },
      { title: "Inventory", desc: "Track stock levels and reorder points automatically.", icon: Layers },
      { title: "GST/Tax", desc: "Generate tax reports compliant with local regulations.", icon: DollarSign },
    ],
    process: [
      { step: "01", title: "Record", desc: "Snap photos of receipts and auto-log expenses." },
      { step: "02", title: "Invoice", desc: "Send estimates and convert them to invoices instantly." },
      { step: "03", title: "Report", desc: "Get real-time P&L and Balance Sheet reports." }
    ]
  },
  people: {
    tagline: "Your greatest asset, managed beautifully.",
    heroTitle: "Build a happier, productive workforce.",
    heroImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000",
    gradient: "from-teal-500 to-cyan-600",
    accentColor: "text-teal-600",
    lightTheme: "bg-teal-50 text-teal-900",
    icon: Users,
    roleTitle: "I am your Chief People Officer",
    roleDesc: "From hiring to retiring, I manage attendance, leave, performance, and payroll. I give your employees a self-service portal so they feel empowered and valued.",
    features: [
      { title: "Attendance", desc: "Geo-fenced attendance marking for remote teams.", icon: Clock },
      { title: "Performance", desc: "360-degree feedback and goal tracking.", icon: TrendingUp },
      { title: "Onboarding", desc: "Digital paperwork and workflows for new hires.", icon: CheckCircle2 },
      { title: "LMS", desc: "Learning management system for employee training.", icon: BookOpen },
    ],
    process: [
      { step: "01", title: "Hire", desc: "Post jobs and track applicants through the pipeline." },
      { step: "02", title: "Manage", desc: "Track time, leave, and shift scheduling effortlessly." },
      { step: "03", title: "Grow", desc: "Run appraisal cycles and manage compensation." }
    ]
  },
  desk: {
    tagline: "Customer happiness delivered.",
    heroTitle: "Support at the speed of conversation.",
    heroImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=2000",
    gradient: "from-purple-600 to-violet-700",
    accentColor: "text-purple-600",
    lightTheme: "bg-purple-50 text-purple-900",
    icon: Headphones,
    roleTitle: "I am your Support Command Center",
    roleDesc: "I gather tickets from email, chat, social media, and phone calls into one place. I help your agents solve problems faster with AI-suggested answers and context.",
    features: [
      { title: "Omnichannel", desc: "Manage Email, Phone, Chat, and Social in one view.", icon: Share2 },
      { title: "Automation", desc: "Assign tickets to the right agent automatically.", icon: Zap },
      { title: "Self Service", desc: "Build a knowledge base and help center.", icon: Globe },
      { title: "SLA Management", desc: "Ensure you never miss a response deadline.", icon: Clock },
    ],
    process: [
      { step: "01", title: "Receive", desc: "Ticket arrives from any channel (Email, Twitter, etc)." },
      { step: "02", title: "Resolve", desc: "Agents use AI tools to provide accurate answers." },
      { step: "03", title: "Analyze", desc: "Measure customer satisfaction and agent performance." }
    ]
  }
};

// Generic fallback for other products
const GENERIC_PRODUCT = {
  gradient: "from-gray-700 to-gray-900",
  accentColor: "text-gray-700",
  lightTheme: "bg-gray-50 text-gray-900",
  roleTitle: "I am your Productivity Partner",
  roleDesc: "I am designed to streamline your operations and boost efficiency. With powerful features and seamless integration, I help your business grow.",
  features: [
    { title: "Secure Cloud", desc: "Your data is safe and accessible anywhere.", icon: Cloud },
    { title: "Mobile Ready", desc: "Work on the go with native mobile apps.", icon: Smartphone },
    { title: "Integration", desc: "Works seamlessly with other SRXHUB apps.", icon: Layers },
    { title: "24/7 Support", desc: "We are always here to help you succeed.", icon: Headphones },
  ],
  process: [
    { step: "01", title: "Sign Up", desc: "Create your free account in seconds." },
    { step: "02", title: "Configure", desc: "Customize settings to match your workflow." },
    { step: "03", title: "Launch", desc: "Invite your team and start working." }
  ]
};

// --- ICONS MAP FOR GENERIC FALLBACK ---
import { Cloud, FileText } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [richData, setRichData] = useState<any>(null);
  const scrollRef = useRef(null);

  // Parallax Logic
  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    // 1. Find basic product info from constants
    let foundProduct = null;
    for (const cat of PRODUCT_CATEGORIES) {
        const p = cat.products.find(item => item.id === id);
        if (p) {
            foundProduct = p;
            break;
        }
    }
    setProduct(foundProduct);

    // 2. Find rich data or use generic
    const specificData = PRODUCT_DETAILS[id as string];
    if (specificData) {
        setRichData(specificData);
    } else {
        // Create generic rich data based on found product or default
        setRichData({
            ...GENERIC_PRODUCT,
            tagline: foundProduct?.description || "Empowering your business.",
            heroTitle: foundProduct?.name || "Product Overview",
            heroImage: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2000",
            icon: foundProduct?.icon || Layers
        });
    }
    
    window.scrollTo(0,0);
  }, [id]);

  if (!product && !richData) return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="animate-pulse flex flex-col items-center">
              <div className="h-12 w-12 bg-gray-300 rounded-full mb-4"></div>
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
          </div>
      </div>
  );

  return (
    <div className="bg-white min-h-screen font-sans overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section ref={scrollRef} className={`relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-gradient-to-br ${richData.gradient} text-white`}>
          
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
              <Link to="/products" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors">
                  <ArrowLeft size={16} className="mr-2" /> Back to Products
              </Link>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                      <div className="flex items-center space-x-3 mb-4">
                          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                              {product?.icon ? <product.icon size={32} /> : <richData.icon size={32} />}
                          </div>
                          <h1 className="text-xl font-bold tracking-widest uppercase opacity-90">{product?.name || "SRXHUB App"}</h1>
                      </div>
                      
                      <h2 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
                          {richData.heroTitle}
                      </h2>
                      <p className="text-xl md:text-2xl text-blue-100 mb-8 font-light max-w-lg">
                          {richData.tagline}
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-4">
                          <Link to="/register" className="bg-white text-gray-900 font-bold py-4 px-10 rounded-full shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all flex items-center justify-center">
                              Start Free Trial <ChevronRight size={20} className="ml-2" />
                          </Link>
                          <button onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })} className="border-2 border-white/30 hover:bg-white/10 text-white font-bold py-4 px-10 rounded-full transition-all">
                              How it Works
                          </button>
                      </div>
                      
                      <div className="mt-8 flex items-center space-x-2 text-sm text-blue-100">
                          <Star size={16} className="text-yellow-400 fill-current" />
                          <span className="font-bold">4.9/5</span>
                          <span>rated by 10,000+ businesses</span>
                      </div>
                  </motion.div>

                  {/* Hero Image with Parallax */}
                  <motion.div 
                    style={{ y, opacity }}
                    initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative perspective-1000 hidden lg:block"
                  >
                      <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 transform rotate-y-6 hover:rotate-y-0 transition-transform duration-700">
                          <img src={richData.heroImage} alt="Dashboard Preview" className="w-full h-auto object-cover" />
                          
                          {/* Floating Elements */}
                          <motion.div 
                             animate={{ y: [0, -10, 0] }}
                             transition={{ repeat: Infinity, duration: 4 }}
                             className="absolute top-10 -left-10 bg-white p-4 rounded-xl shadow-xl text-gray-800 flex items-center gap-3"
                          >
                              <CheckCircle2 className="text-green-500" />
                              <div>
                                  <div className="text-xs font-bold text-gray-400">STATUS</div>
                                  <div className="font-bold">Optimized</div>
                              </div>
                          </motion.div>

                          <motion.div 
                             animate={{ y: [0, 10, 0] }}
                             transition={{ repeat: Infinity, duration: 5, delay: 1 }}
                             className="absolute bottom-10 -right-5 bg-white p-4 rounded-xl shadow-xl text-gray-800 flex items-center gap-3"
                          >
                              <Shield className="text-blue-500" />
                              <div>
                                  <div className="text-xs font-bold text-gray-400">SECURITY</div>
                                  <div className="font-bold">Bank-Grade</div>
                              </div>
                          </motion.div>
                      </div>
                      {/* Glow behind */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/20 blur-[100px] -z-10"></div>
                  </motion.div>
              </div>
          </div>
      </section>

      {/* 2. THE ROLE SECTION (Explainer) */}
      <section className="py-24 bg-white relative">
          <div className="max-w-5xl mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center gap-16">
                  <motion.div 
                     initial={{ opacity: 0, scale: 0.9 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     viewport={{ once: true }}
                     className="md:w-1/3 flex justify-center"
                  >
                      <div className={`w-40 h-40 md:w-56 md:h-56 rounded-full flex items-center justify-center ${richData.lightTheme} shadow-2xl relative`}>
                          {product?.icon ? <product.icon size={80} /> : <richData.icon size={80} />}
                          <div className="absolute inset-0 border-4 border-dashed border-current opacity-20 rounded-full animate-spin-slow"></div>
                      </div>
                  </motion.div>
                  <motion.div 
                     initial={{ opacity: 0, x: 50 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     className="md:w-2/3"
                  >
                      <h3 className={`text-sm font-bold uppercase tracking-widest mb-4 ${richData.accentColor}`}>What do I do?</h3>
                      <h2 className="text-4xl font-bold text-gray-900 mb-6">{richData.roleTitle}</h2>
                      <p className="text-xl text-gray-600 leading-relaxed">
                          "{richData.roleDesc}"
                      </p>
                  </motion.div>
              </div>
          </div>
      </section>

      {/* 3. HOW IT WORKS (Process) */}
      <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How it works</h2>
                  <p className="text-gray-500 mt-4">Three simple steps to mastery.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                  {/* Connecting Line (Desktop) */}
                  <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-200 -z-0"></div>

                  {richData.process.map((step: any, idx: number) => (
                      <motion.div 
                         key={idx}
                         initial={{ opacity: 0, y: 30 }}
                         whileInView={{ opacity: 1, y: 0 }}
                         viewport={{ once: true }}
                         transition={{ delay: idx * 0.2 }}
                         className="relative z-10 flex flex-col items-center text-center bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-2 transition-transform duration-300"
                      >
                          <div className={`w-12 h-12 rounded-full ${richData.lightTheme} flex items-center justify-center font-bold text-lg mb-6 shadow-md`}>
                              {step.step}
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                          <p className="text-gray-600">{step.desc}</p>
                      </motion.div>
                  ))}
              </div>
          </div>
      </section>

      {/* 4. FEATURES GRID */}
      <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                  <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Everything you need</h2>
                      <p className="text-gray-600 max-w-xl">Packed with powerful features designed to help you scale without the complexity.</p>
                  </div>
                  <Link to="/register" className={`hidden md:flex items-center font-bold ${richData.accentColor} hover:underline`}>
                      See full feature list <ArrowRight size={16} className="ml-2" />
                  </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {richData.features.map((feat: any, idx: number) => (
                      <motion.div 
                         key={idx}
                         initial={{ opacity: 0, scale: 0.95 }}
                         whileInView={{ opacity: 1, scale: 1 }}
                         viewport={{ once: true }}
                         transition={{ delay: idx * 0.1 }}
                         className="p-6 rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 hover:shadow-xl transition-all duration-300 group"
                      >
                          <div className={`w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform ${richData.accentColor}`}>
                              <feat.icon size={24} />
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">{feat.title}</h3>
                          <p className="text-sm text-gray-600 leading-relaxed">{feat.desc}</p>
                      </motion.div>
                  ))}
              </div>
          </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="py-20">
          <div className="max-w-5xl mx-auto px-4">
              <div className={`rounded-3xl p-12 text-center text-white bg-gradient-to-r ${richData.gradient} shadow-2xl relative overflow-hidden`}>
                  {/* Decorative Circles */}
                  <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
                  
                  <div className="relative z-10">
                      <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to dominate your workflow?</h2>
                      <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                          Join thousands of businesses who trust {product?.name || "SRXHUB"} to run their operations.
                      </p>
                      <div className="flex flex-col sm:flex-row justify-center gap-4">
                          <Link to="/register" className="bg-white text-gray-900 font-bold py-4 px-10 rounded-lg hover:bg-gray-100 transition-colors shadow-lg">
                              Get Started Free
                          </Link>
                          <Link to="/contact" className="bg-transparent border-2 border-white text-white font-bold py-4 px-10 rounded-lg hover:bg-white/10 transition-colors">
                              Contact Sales
                          </Link>
                      </div>
                      <p className="mt-6 text-sm opacity-70">No credit card required • 14-day free trial • Cancel anytime</p>
                  </div>
              </div>
          </div>
      </section>

    </div>
  );
};

export default ProductDetail;
