import React from 'react';
import {Link,NavLink} from "react-router-dom"

function Footer() {
  return (
    <footer className="bg-blue-50 py-12 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:justify-between">
          <div className="mb-8 md:mb-0">
            {/* Logo */}
            <img
              className="h-10 w-auto"
              src="your-logo.svg" // Replace with your logo SVG or image
              alt="SPD Logo"
            />
            <p className="mt-4 text-base text-gray-500">
              Your AI-Powered Smart Pill Dispenser Solution
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {/* First Column */}
            <div>
              <h5 className="font-semibold text-gray-600">Company</h5>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link to="/about" className="text-gray-500 hover:text-blue-800">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/team" className="text-gray-500 hover:text-blue-800">
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="text-gray-500 hover:text-blue-800">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            {/* Second Column */}
            <div>
              <h5 className="font-semibold text-gray-600">Product</h5>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link to="/features" className="text-gray-500 hover:text-blue-800">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/integrations" className="text-gray-500 hover:text-blue-800">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="text-gray-500 hover:text-blue-800">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            {/* Third Column */}
            <div>
              <h5 className="font-semibold text-gray-600">Support</h5>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link to="/contact" className="text-gray-500 hover:text-blue-800">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/help" className="text-gray-500 hover:text-blue-800">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-gray-500 hover:text-blue-800">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            {/* Fourth Column */}
            <div>
              <h5 className="font-semibold text-gray-600">Follow Us</h5>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link to="#" className="text-gray-500 hover:text-blue-800">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-500 hover:text-blue-800">
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-500 hover:text-blue-800">
                    Facebook
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 py-4 border-t border-gray-200">
          <p className="text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} SPD. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;