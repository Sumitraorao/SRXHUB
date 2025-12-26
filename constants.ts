
import { 
  Users, Mail, BookOpen, UserCheck, Headphones, PieChart, ShieldCheck, 
  BarChart3, Globe, MessageSquare, Briefcase, ShoppingCart, DollarSign, 
  Settings, PenTool, Layout, Calendar, Clock, Lock, Cloud, Zap, Search, Eye,
  Layers, Database, Smartphone, Code, Server, CheckCircle, BarChart
} from 'lucide-react';
import { FeatureApp, FooterSection, NavItem, Product, ProductCategory, StatItem } from './types';

// --- IMAGE RANDOMIZER LOGIC ---

export const IMAGE_POOLS = {
  tech: [
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000", // Chip
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000", // Data Screen
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000", // Globe Network
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000", // Cybersecurity
    "https://images.unsplash.com/photo-1558494949-ef526b0042a0?auto=format&fit=crop&q=80&w=1000", // Servers
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1000", // Code
    "https://images.unsplash.com/photo-1531297461136-82af022f5b79?auto=format&fit=crop&q=80&w=1000", // Abstract Tech
  ],
  office: [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000", // Modern Office
    "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1000", // Meeting Room
    "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?auto=format&fit=crop&q=80&w=1000", // Coworking
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1000", // Team Strategy
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000", // People working
  ],
  abstract: [
    "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=1000", // Block chain
    "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1000", // UI Gradient
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000", // Liquid
    "https://images.unsplash.com/photo-1506318137071-a8bcbf6d9188?auto=format&fit=crop&q=80&w=1000", // Light
  ],
  people: [
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400", // Professional Man
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400", // Professional Woman
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400", // CEO type
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400", // Portrait
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400", // Woman Smiling
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400", // Man serious
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400", // Man smiling
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400", // Woman portrait
    "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=400", // Man profile
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400", // Woman happy
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400", // Man rough
    "https://images.unsplash.com/photo-1522075469751-3a3694c2dd81?auto=format&fit=crop&q=80&w=400", // Professional office
  ]
};

export const getRandomImage = (category: 'tech' | 'office' | 'abstract' | 'people') => {
  const pool = IMAGE_POOLS[category];
  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
};

// --- END RANDOMIZER ---

export const NAV_ITEMS: NavItem[] = [
  { 
    label: 'Services', 
    href: 'https://digitalmax.mgx.world/', 
    hasMenu: false, // Changed to direct link
  },
  { label: 'SrxAI', href: '/ai' },
  { label: 'Enterprise', href: '/enterprise' },
  { 
    label: 'Customers', 
    href: '/customers',
    hasMenu: true,
    menuType: 'dropdown',
    subItems: [
      { label: 'Customer Stories', href: '/customers' },
      { label: 'User Community', href: '/community' }
    ]
  },
  { 
    label: 'Partners', 
    href: '/partners',
    hasMenu: true,
    menuType: 'dropdown',
    subItems: [
        { label: 'Become a Partner', href: '/partners?type=become' },
        { label: 'Work with a Partner', href: '/partners?type=work' }
    ]
  },
  { 
    label: 'Resources', 
    href: '#',
    hasMenu: true,
    menuType: 'dropdown',
    subItems: [
        { label: 'Security Solutions', href: '/security' },
        { label: 'Knowledge Base', href: '#' },
        { label: 'Blog', href: '#' }
    ]
  },
];

export const ENTERPRISE_NAV_ITEMS: NavItem[] = [
  { label: 'Platform', href: '#platform' },
  { label: 'Verticals', href: '#verticals' },
  { label: 'Extensions', href: '#extensions' },
  { label: 'Security', href: '#security' },
  { label: 'Implementation', href: '#implementation' },
];

export const FEATURED_APPS: (FeatureApp & { id: string })[] = [
  {
    id: 'crm',
    name: 'CRM',
    description: 'Comprehensive CRM platform for customer-facing teams.',
    icon: Users,
    color: 'text-blue-500'
  },
  {
    id: 'mail',
    name: 'Mail',
    description: 'Secure email service for teams of all sizes.',
    icon: Mail,
    color: 'text-yellow-500'
  },
  {
    id: 'books',
    name: 'Books',
    description: 'Powerful accounting platform for growing businesses.',
    icon: BookOpen,
    color: 'text-green-500'
  },
  {
    id: 'people',
    name: 'People',
    description: 'Organize, automate, and simplify your HR processes.',
    icon: UserCheck,
    color: 'text-teal-500'
  },
  {
    id: 'desk',
    name: 'Desk',
    description: 'Helpdesk software to deliver great customer support.',
    icon: Headphones,
    color: 'text-purple-500'
  }
];

export const STATS: StatItem[] = [
  { value: '100M+', label: 'Users Globally' },
  { value: '150+', label: 'Countries Served' },
  { value: '15K+', label: 'Employees Worldwide' },
  { value: '25+', label: 'Years in Business' },
  { value: '55+', label: 'Products' },
];

export const FOOTER_LINKS: FooterSection[] = [
  {
    title: 'Apps and Extensions',
    links: [
        { label: 'Mobile Apps', href: '/mobile-apps' },
        { label: 'Developer Center', href: '/developer-center' },
        { label: 'Google Workspace Integration', href: '#' },
        { label: 'Microsoft 365 Integration', href: '#' },
        { label: 'Apple Watch Integration', href: '#' },
        { label: 'Browser Extensions', href: '#' }
    ]
  },
  {
    title: 'Learn',
    links: [
        { label: 'Training and Certification', href: '#' },
        { label: 'Academy', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Knowledge Base', href: '#' },
        { label: 'Newsletter', href: '#' }
    ]
  },
  {
    title: 'Community',
    links: [
        { label: 'User Community', href: '/community' },
        { label: 'Customer Stories', href: '/customers' },
        { label: 'Influence', href: '#' },
        { label: 'Idea Hub', href: '#' },
        { label: 'Partners', href: '/partners' }
    ]
  },
  {
    title: 'Company',
    links: [
        { label: 'About Us', href: '/about' },
        { label: 'Press', href: '#' },
        { label: 'Events', href: '#' },
        { label: 'Branding Assets', href: '#' },
        { label: 'Security', href: '/security' },
        { label: 'Compliance', href: '#' }
    ]
  }
];

// Product Data
export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: 'sales',
    label: 'Sales',
    products: [
      { id: 'crm', name: 'CRM', description: 'Comprehensive CRM platform for customer-facing teams.', icon: Users, category: 'sales' },
      { id: 'bigin', name: 'Bigin', description: 'Simple CRM for small businesses moving from spreadsheets.', icon: Briefcase, category: 'sales' },
      { id: 'forms', name: 'Forms', description: 'Build online forms for every business need.', icon: Layout, category: 'sales' },
      { id: 'salesiq', name: 'SalesIQ', description: 'Live chat app to engage and convert website visitors.', icon: MessageSquare, category: 'sales' },
      { id: 'sign', name: 'Sign', description: 'Digital signature app for businesses.', icon: PenTool, category: 'sales' },
      { id: 'crmplus', name: 'CRM Plus', description: 'Unified platform to deliver top-notch customer experiences.', icon: Users, category: 'sales', isNew: true },
    ]
  },
  {
    id: 'marketing',
    label: 'Marketing',
    products: [
      { id: 'campaigns', name: 'Campaigns', description: 'Create, send, and track email marketing campaigns.', icon: Mail, category: 'marketing' },
      { id: 'social', name: 'Social', description: 'All-in-one social media management software.', icon: Globe, category: 'marketing' },
      { id: 'sites', name: 'Sites', description: 'Online website builder with extensive customization options.', icon: Layout, category: 'marketing' },
      { id: 'survey', name: 'Survey', description: 'Design surveys to reach and interact with your audience.', icon: PieChart, category: 'marketing' },
      { id: 'marketingautomation', name: 'Marketing Automation', description: 'All-in-one marketing automation software.', icon: Zap, category: 'marketing' },
    ]
  },
  {
    id: 'service',
    label: 'Service',
    products: [
      { id: 'desk', name: 'Desk', description: 'Helpdesk software to deliver great customer support.', icon: Headphones, category: 'service' },
      { id: 'assist', name: 'Assist', description: 'Remote support and unattended remote access software.', icon: Settings, category: 'service' },
      { id: 'lens', name: 'Lens', description: 'Interactive remote assistance software with augmented reality.', icon: Eye, category: 'service' },
      { id: 'fsm', name: 'FSM', description: 'End-to-end field service management platform.', icon: Briefcase, category: 'service', isNew: true },
    ]
  },
  {
    id: 'finance',
    label: 'Finance',
    products: [
      { id: 'books', name: 'Books', description: 'Powerful accounting platform for growing businesses.', icon: BookOpen, category: 'finance' },
      { id: 'invoice', name: 'Invoice', description: '100% free invoicing solution.', icon: DollarSign, category: 'finance' },
      { id: 'expense', name: 'Expense', description: 'Effortless expense reporting platform.', icon: PieChart, category: 'finance' },
      { id: 'inventory', name: 'Inventory', description: 'Powerful stock management and inventory control.', icon: ShoppingCart, category: 'finance' },
      { id: 'payroll', name: 'Payroll', description: 'Effortless payroll processing software for businesses.', icon: DollarSign, category: 'finance' },
    ]
  },
  {
    id: 'people',
    label: 'Human Resources',
    products: [
      { id: 'people', name: 'People', description: 'Organize, automate, and simplify your HR processes.', icon: UserCheck, category: 'people' },
      { id: 'recruit', name: 'Recruit', description: 'Intuitive recruiting platform built to provide hiring solutions.', icon: Users, category: 'people' },
      { id: 'workerly', name: 'Workerly', description: 'Manage temporary staffing with an employee scheduling solution.', icon: Clock, category: 'people' },
    ]
  },
  {
    id: 'it',
    label: 'Security & IT',
    products: [
      { id: 'vault', name: 'Vault', description: 'Online password manager for teams.', icon: Lock, category: 'it' },
      { id: 'catalyst', name: 'Catalyst', description: 'Pro-code platform to build and deploy your apps.', icon: Cloud, category: 'it' },
    ]
  }
];

// Enterprise Page Data
export const ENTERPRISE_SOLUTIONS = [
  {
    title: 'Customer Experience',
    description: 'Engage your customers at every stage of the journey. Unify CRM activities like sales, marketing, and support.',
    apps: ['CRM Plus', 'Desk', 'SalesIQ'],
    linkId: 'crm'
  },
  {
    title: 'Employee Experience',
    description: 'Streamline HR operations across departments, business units, and locations. Manage entire employee lifecycle.',
    apps: ['People Plus', 'Payroll', 'Expense'],
    linkId: 'people'
  },
  {
    title: 'Productivity & Collaboration',
    description: 'Enterprise-ready tools for secure collaboration and communication. Transform operational efficiency.',
    apps: ['Workplace', 'Projects', 'Connect'],
    linkId: 'projects'
  },
  {
    title: 'Finance',
    description: 'Move fast and make smart financial decisions, while maintaining compliance. Billing to order management.',
    apps: ['Books', 'Inventory', 'Billing'],
    linkId: 'books'
  },
  {
    title: 'Custom Solutions',
    description: 'Design, build, and deploy bespoke solutions for your organization specific needs with low-code.',
    apps: ['Creator', 'Catalyst', 'Flow'],
    linkId: 'catalyst'
  },
  {
    title: 'Business Intelligence',
    description: 'Craft contextual data narratives and drive informed strategic business decisions blending data from 500+ sources.',
    apps: ['Analytics', 'DataPrep'],
    linkId: 'analytics'
  }
];

export const ENTERPRISE_TESTIMONIALS = [
  {
    industry: 'BFSI',
    quote: "This platform has automated approximately 90-95% of customer query processes, leading to a remarkable 30% increase in customer satisfaction.",
    author: "Manimekhalai A",
    role: "Managing Director & CEO, Union Bank of India"
  },
  {
    industry: 'MANUFACTURING',
    quote: "SRXHUB CRM created a centralised deal booking system that reduced customer response times and manual user errors by over 40 percent.",
    author: "Udit Pahwa",
    role: "Chief Information Officer, Blue Star Limited"
  }
];

export const ENTERPRISE_FEATURES_TABS = [
  {
    id: 'interoperable',
    label: 'Interoperable, customisable, and extensible',
    content: {
      heading: 'Interoperable, customisable, and extensible',
      description: 'With 2,500+ third-party apps, pre-built extensions, and integration points with APIs, it is easy to extend and customize your SRXHUB deployment.',
      items: [
        { icon: Code, title: 'APIs', desc: 'Integrate apps across your tech stack' },
        { icon: Smartphone, title: 'SDKs', desc: 'Build customized web and mobile apps' },
        { icon: Server, title: 'Serverless', desc: 'Automate operations at scale' },
        { icon: Layers, title: 'Workflow', desc: 'Connect third-party apps with one another' }
      ]
    }
  },
  {
    id: 'faster',
    label: 'Faster time to value with quicker implementation',
    content: {
      heading: 'Faster time to value with quicker implementation',
      description: 'We heavily invest in contextual coding with serverless capabilities to reduce the learning curve and shorten the implementation cycle while minimizing costs.',
      items: [
         { icon: Clock, title: 'Rapid Deployment', desc: 'Go live in weeks, not months' },
         { icon: CheckCircle, title: 'Low Code', desc: 'Visual development for faster results' },
         { icon: Users, title: 'Expert Support', desc: 'Dedicated implementation teams' }
      ]
    }
  },
  {
    id: 'stack',
    label: 'Continuously integrated tech stack',
    content: {
      heading: 'Continuously integrated tech stack',
      description: 'All of SRXHUB software technology is built on top of a unified and integrated data layer, enabling enterprises to use our microservices across all apps.',
      items: [
          { icon: Database, title: 'Unified Data', desc: 'Single source of truth' },
          { icon: ShieldCheck, title: 'Security', desc: 'Enterprise-grade protection' },
          { icon: Zap, title: 'Performance', desc: 'Optimized for scale' }
      ]
    }
  }
];

// Customer Stories Data
export const CUSTOMER_LOGOS = [
  { name: 'Ola', color: 'bg-white text-gray-800' },
  { name: 'Amazon', color: 'bg-white text-gray-800' },
  { name: 'Suzuki', color: 'bg-blue-50 text-blue-900' },
  { name: 'Zomato', color: 'bg-red-50 text-red-600' },
  { name: 'Philips', color: 'bg-blue-100 text-blue-800' },
  { name: 'Netflix', color: 'bg-black text-white' },
  { name: 'Lyft', color: 'bg-pink-100 text-pink-600' },
  { name: 'BigBasket', color: 'bg-green-50 text-green-700' },
  { name: 'IKEA', color: 'bg-yellow-100 text-blue-800' },
  { name: 'FedEx', color: 'bg-gray-100 text-purple-900' },
  { name: 'Xiaomi', color: 'bg-orange-100 text-orange-600' },
  { name: 'Siemens', color: 'bg-teal-50 text-teal-800' },
  { name: 'Swiggy', color: 'bg-orange-50 text-orange-500' },
  { name: 'Dell', color: 'bg-blue-50 text-blue-800' },
  { name: 'Stanford', color: 'bg-red-100 text-red-900' },
  { name: 'Deloitte', color: 'bg-black text-white' },
  { name: 'KPMG', color: 'bg-blue-900 text-white' },
  { name: 'Laliga', color: 'bg-red-500 text-white' },
];

export const CUSTOMER_FILTERS = [
  {
    category: 'Industry',
    options: ['Accounting & Finance', 'Advertising & Marketing', 'Automation', 'B2B Solutions', 'Real Estate', 'Retail']
  },
  {
    category: 'Product',
    options: ['SRXHUB Assist', 'SRXHUB Backstage', 'SRXHUB Books', 'SRXHUB CRM', 'SRXHUB People', 'SRXHUB Creator', 'SRXHUB Inventory', 'SRXHUB Meeting', 'SRXHUB Desk', 'SRXHUB Projects', 'SRXHUB Invoice']
  },
  {
    category: 'Country',
    options: ['India', 'USA', 'UK']
  }
];

// Dynamically generate images for stories
export const CUSTOMER_STORIES = [
   {
       id: 1,
       company: 'fit20',
       type: 'image',
       image: getRandomImage('office'),
       logoText: 'fit20',
       quote: "fit20 boosted conversion rates from 45% to 75% with SRXHUB",
       author: "Rob Boutens",
       role: "IT Manager, fit20",
       link: "#",
       filters: {
           Industry: 'B2B Solutions',
           Product: 'SRXHUB CRM',
           Country: 'UK'
       }
   },
   {
       id: 2,
       company: 'CTRL E',
       type: 'quote',
       logoText: 'CTRL E',
       quote: "Join Arun Jeeraraj as he shares insights into efficient remote IT support using SRXHUB Assist. Discover how SRXHUB empowers teams to manage devices and troubleshoot smarter.",
       author: "Arun Jeeraraj",
       role: "Director",
       link: "#",
       filters: {
           Industry: 'Automation',
           Product: 'SRXHUB Assist',
           Country: 'India'
       }
   },
   {
       id: 3,
       company: 'BizX',
       type: 'quote',
       logoText: 'BizX',
       quote: "We loved the whole backstage experience and we'll do it again. It helped us organize our guests, helping entry and trace time crafting memorable stats.",
       author: "Greg Jackson",
       role: "UK Partner",
       link: "#",
       filters: {
           Industry: 'B2B Solutions',
           Product: 'SRXHUB Backstage',
           Country: 'UK'
       }
   },
   {
       id: 4,
       company: 'Real Estate',
       type: 'quote',
       logoText: 'REAL ESTATE',
       quote: "It's a great CRM - not too much and not too little. It has the ease of use - how intuitive it is, and not overly complicated.",
       author: "Zalmi Duchman",
       role: "Founder",
       link: "#",
       filters: {
           Industry: 'Real Estate',
           Product: 'SRXHUB CRM',
           Country: 'USA'
       }
   },
   {
       id: 5,
       company: 'Reader',
       type: 'quote',
       logoText: 'Reader',
       quote: "How a US-based publishing firm reduced its processing time by 75% and eliminated duplicate subscriptions using SRXHUB Subscriptions.",
       author: "Read more",
       role: "",
       link: "#",
       filters: {
           Industry: 'Advertising & Marketing',
           Product: 'SRXHUB Books',
           Country: 'USA'
       }
   },
   {
       id: 6,
       company: 'Little Earth',
       type: 'quote',
       logoText: 'Little Earth',
       quote: "Our experience with Bigin has been extremely positive. It helped us organize our guests, helping entry and trace time crafting memorable stats.",
       author: "Read more",
       role: "",
       link: "#",
       filters: {
           Industry: 'Retail',
           Product: 'SRXHUB CRM',
           Country: 'India'
       }
   },
   {
       id: 7,
       company: 'Longevita',
       type: 'quote',
       logoText: 'longevita',
       quote: "Managing 15 cosmetic agents and handling an average of 5,000 clients monthly. Longevita relies on SRXHUB Bookings for seamless scheduling and communication.",
       author: "Semra Sourhi",
       role: "Partnerships Manager",
       link: "#",
       filters: {
           Industry: 'B2B Solutions',
           Product: 'SRXHUB People',
           Country: 'UK'
       }
   },
   {
       id: 8,
       company: 'IIFL',
       type: 'image',
       image: getRandomImage('people'),
       logoText: 'IIFL',
       quote: "I came across SRXHUB Books a couple of years ago and there was no doubt that it was a match made in heaven. I use almost every feature.",
       author: "Hiral Panchal",
       role: "Owner, KHM Jewellery",
       link: "#",
       filters: {
           Industry: 'Accounting & Finance',
           Product: 'SRXHUB Books',
           Country: 'India'
       }
   },
   {
       id: 9,
       company: 'Brigade',
       type: 'quote',
       logoText: 'BRIGADE',
       quote: "Brigade Plus transforms sales processes using SRXHUB CRM.",
       author: "Ponnappa PM",
       role: "Assistant VP",
       link: "#",
       filters: {
           Industry: 'Real Estate',
           Product: 'SRXHUB CRM',
           Country: 'India'
       }
   },
   {
       id: 10,
       company: 'Star Tech',
       type: 'image',
       image: getRandomImage('tech'),
       logoText: 'Star Tech',
       quote: "SRXHUB has been instrumental in scaling our operations to 5 new countries in under a year.",
       author: "Sarah Jenkins",
       role: "CTO, Star Tech",
       link: "#",
       filters: {
           Industry: 'Technology',
           Product: 'SRXHUB CRM',
           Country: 'USA'
       }
   },
   {
       id: 11,
       company: 'Green Leaf',
       type: 'quote',
       logoText: 'Green Leaf',
       quote: "The automation capabilities have saved us hundreds of man-hours every month. Truly a game changer.",
       author: "Mike Ross",
       role: "Operations Head",
       link: "#",
       filters: {
           Industry: 'Agriculture & Farming',
           Product: 'SRXHUB Creator',
           Country: 'USA'
       }
   },
   {
       id: 12,
       company: 'Urban Styles',
       type: 'image',
       image: getRandomImage('office'),
       logoText: 'Urban Styles',
       quote: "Managing inventory and sales across 50 stores became seamless with SRXHUB Inventory.",
       author: "Priya Sharma",
       role: "Retail Manager",
       link: "#",
       filters: {
           Industry: 'Retail',
           Product: 'SRXHUB Inventory',
           Country: 'India'
       }
   },
   {
       id: 13,
       company: 'EduLearn',
       type: 'quote',
       logoText: 'EduLearn',
       quote: "We use SRXHUB Meeting for all our virtual classrooms. The stability and features are unmatched.",
       author: "David Lee",
       role: "Director",
       link: "#",
       filters: {
           Industry: 'Education',
           Product: 'SRXHUB Meeting',
           Country: 'UK'
       }
   },
   {
       id: 14,
       company: 'HealthPlus',
       type: 'quote',
       logoText: 'HealthPlus',
       quote: "Patient data security is paramount for us. SRXHUB's compliance standards gave us peace of mind.",
       author: "Dr. Emily Chen",
       role: "Chief Medical Officer",
       link: "#",
       filters: {
           Industry: 'Healthcare',
           Product: 'SRXHUB Desk',
           Country: 'USA'
       }
   },
   {
       id: 15,
       company: 'BuildRight',
       type: 'image',
       image: getRandomImage('tech'),
       logoText: 'BuildRight',
       quote: "Project management on the go. Our site engineers love the mobile app capabilities.",
       author: "Tom Hardy",
       role: "Project Manager",
       link: "#",
       filters: {
           Industry: 'Real Estate',
           Product: 'SRXHUB Projects',
           Country: 'UK'
       }
   },
   {
       id: 16,
       company: 'Fresh Foods',
       type: 'quote',
       logoText: 'Fresh Foods',
       quote: "From farm to table, SRXHUB helps us track every step of our supply chain.",
       author: "Anita Roy",
       role: "Supply Chain Lead",
       link: "#",
       filters: {
           Industry: 'Food & Beverage',
           Product: 'SRXHUB Books',
           Country: 'India'
       }
   },
   {
       id: 17,
       company: 'AutoDrive',
       type: 'quote',
       logoText: 'AutoDrive',
       quote: "Customer support response time dropped by 60% after implementing SRXHUB Desk.",
       author: "Carlos Gomez",
       role: "Customer Success VP",
       link: "#",
       filters: {
           Industry: 'Automotive',
           Product: 'SRXHUB Desk',
           Country: 'USA'
       }
   },
   {
       id: 18,
       company: 'LegalEase',
       type: 'quote',
       logoText: 'LegalEase',
       quote: "Billing and invoicing used to be a nightmare. Now it's automated and error-free.",
       author: "Jessica Pearson",
       role: "Managing Partner",
       link: "#",
       filters: {
           Industry: 'Legal',
           Product: 'SRXHUB Invoice',
           Country: 'UK'
       }
   }
];
