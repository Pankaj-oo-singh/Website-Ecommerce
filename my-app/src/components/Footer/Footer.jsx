import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">ShopEase</h3>
            <p className="mb-4">Your one-stop shop for all your needs.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-indigo-300">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="hover:text-indigo-300">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="hover:text-indigo-300">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="hover:text-indigo-300">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-indigo-300">Home</a></li>
              <li><a href="#" className="hover:text-indigo-300">Shop</a></li>
              <li><a href="#" className="hover:text-indigo-300">About Us</a></li>
              <li><a href="#" className="hover:text-indigo-300">Contact</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-indigo-300">FAQs</a></li>
              <li><a href="#" className="hover:text-indigo-300">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-indigo-300">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-indigo-300">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="mb-4">Subscribe to get updates on new products and offers.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 w-full rounded-l text-gray-800 focus:outline-none"
              />
              <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-r">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-6 text-center">
          <p>&copy; {new Date().getFullYear()} ShopEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;