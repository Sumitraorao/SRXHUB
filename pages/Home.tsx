import React from 'react';
import { Users, Mail, BookOpen, UserCheck, Headphones, ArrowRight } from 'lucide-react';

const Home = () => {
  const featuredApps = [
    { id: 'crm', name: 'CRM', desc: 'Comprehensive CRM for customer-facing teams.', icon: Users, color: 'bg-blue-100' },
    { id: 'mail', name: 'Mail', desc: 'Secure email service for all teams.', icon: Mail, color: 'bg-yellow-100' },
    { id: 'books', name: 'Books', desc: 'Accounting platform for growing businesses.', icon: BookOpen, color: 'bg-green-100' },
    { id: 'people', name: 'People', desc: 'Manage and simplify HR processes.', icon: UserCheck, color: 'bg-teal-100' },
    { id: 'desk', name: 'Desk', desc: 'Helpdesk for great customer support.', icon: Headphones, color: 'bg-purple-100' }
  ];

  const stats = [
    { value: '100M+', label: 'Users Globally' },
    { value: '150+', label: 'Countries Served' },
    { value: '15K+', label: 'Employees Worldwide' },
    { value: '25+', label: 'Years in Business' },
    { value: '55+', label: 'Products' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="px-4 py-20 md:py-32 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Your life's work, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">powered by our life's work</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            A unique and powerful software suite to transform the way you work. Designed for businesses of all sizes, built by a company that values your privacy.
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-lg text-lg font-semibold flex items-center justify-center gap-2 mx-auto transition-all transform hover:scale-105">
            GET STARTED FOR FREE <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Featured Apps Section */}
      <section className="px-4 py-20 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">FEATURED APPS</h2>
        <p className="text-gray-600 text-center mb-16 text-lg">Powerful tools built for every business need</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {featuredApps.map((app) => {
            const IconComponent = app.icon;
            return (
              <div key={app.id} className="bg-white rounded-lg p-6 border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all">
                <div className={`${app.color} rounded-lg p-4 mb-4 w-fit`}>
                  <IconComponent size={32} className="text-gray-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{app.name}</h3>
                <p className="text-gray-600 text-sm">{app.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-16 text-center">Global Scale, Local Touch</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-blue-100 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">Ready to do your best work?</h2>
          <p className="text-xl text-gray-300 mb-12">Join millions of businesses running on SRXHUB.</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 rounded-lg text-lg font-semibold flex items-center justify-center gap-2 mx-auto transition-all">
            GET STARTED NOW <ArrowRight size={20} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
