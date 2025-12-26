
import React, { useEffect } from 'react';

const About: React.FC = () => {
  useEffect(() => {
    window.location.href = "https://digitalmax.mgx.world/";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Redirecting to DigitalMax...</h2>
        <p className="text-gray-500 mb-4">Please wait while we take you to our partner site.</p>
        <a href="https://digitalmax.mgx.world/" className="text-brand-blue hover:underline font-medium">Click here if you are not redirected automatically</a>
      </div>
    </div>
  );
};

export default About;
