
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, FileText, Lock } from 'lucide-react';

const Policies: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Legal & Privacy</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            We are committed to protecting your data and ensuring transparent business practices.
          </p>
        </div>

        <div className="space-y-12">
          {/* Privacy Policy */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            id="privacy"
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12"
          >
            <div className="flex items-center mb-6">
              <div className="bg-green-100 p-3 rounded-full mr-4 text-green-600">
                <Lock size={28} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Privacy Policy</h2>
            </div>
            
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                <strong>Effective Date: January 1, 2025</strong>
              </p>
              <p>
                At SRXHUB, we take your privacy seriously. This Privacy Policy describes how we collect, use, and disclose information when you use our websites, software, and services.
              </p>
              <h3 className="text-lg font-bold text-gray-800 mt-4">1. Information We Collect</h3>
              <p>
                We collect information you provide directly to us, such as when you create an account, update your profile, or communicate with us. This may include your name, email address, phone number, and company details.
              </p>
              <h3 className="text-lg font-bold text-gray-800 mt-4">2. How We Use Your Information</h3>
              <p>
                We use the information we collect to provide, maintain, and improve our services, to process your transactions, and to communicate with you about new features or support.
              </p>
              <h3 className="text-lg font-bold text-gray-800 mt-4">3. Data Security</h3>
              <p>
                We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
              </p>
            </div>
          </motion.div>

          {/* Terms of Service */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            id="terms"
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12"
          >
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-3 rounded-full mr-4 text-blue-600">
                <FileText size={28} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Terms of Service</h2>
            </div>
            
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                <strong>Last Updated: January 1, 2025</strong>
              </p>
              <p>
                Please read these Terms of Service carefully before using SRXHUB services. By accessing or using our services, you agree to be bound by these terms.
              </p>
              <h3 className="text-lg font-bold text-gray-800 mt-4">1. Acceptance of Terms</h3>
              <p>
                By registering for and/or using the Service in any manner, you agree to all of the terms and conditions contained herein.
              </p>
              <h3 className="text-lg font-bold text-gray-800 mt-4">2. User Responsibilities</h3>
              <p>
                You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use.
              </p>
              <h3 className="text-lg font-bold text-gray-800 mt-4">3. Intellectual Property</h3>
              <p>
                The Service and its original content, features, and functionality are and will remain the exclusive property of SRXHUB Corporation and its licensors.
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default Policies;
