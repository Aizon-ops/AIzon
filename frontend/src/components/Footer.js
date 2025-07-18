import React from 'react';
import { FiGithub, FiTwitter, FiMail } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">AIzon</h3>
            <p className="text-gray-300">
              Your one-stop marketplace for AI products and tools.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/categories" className="hover:text-white">Categories</a></li>
              <li><a href="/about" className="hover:text-white">About</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/help" className="hover:text-white">Help Center</a></li>
              <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
              <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <FiGithub className="hover:text-blue-400 cursor-pointer" size={20} />
              <FiTwitter className="hover:text-blue-400 cursor-pointer" size={20} />
<FiMail className="hover:text-blue-400 cursor-pointer" size={20} />
</div>
</div>
</div>
 <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
      <p>© 2024 AIzon. All rights reserved.</p>
    </div>
  </div>
</footer>
);
};

export default Footer;