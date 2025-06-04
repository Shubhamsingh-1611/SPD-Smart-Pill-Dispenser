import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="bg-blue-50 py-24" >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          {/* Hero Title */}
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Empowering Health with AI-Driven Precision
          </h2>
          {/* Hero Description */}
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            The AI-Powered Smart Pill Dispenser (SPD) is a revolutionary solution designed to simplify medication management, improve adherence, and enhance patient care. By leveraging artificial intelligence, IoT, and seamless connectivity, SPD ensures you take the right medicine at the right time, every time. 
          </p>
          {/* Get Started Button */}
          <div className="mt-10">
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;