import React from 'react';
import { Link } from 'react-router-dom';
import { FaShippingFast, FaShieldAlt, FaHeadset, FaLeaf, FaAward } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-indigo-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Story</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Delivering quality products with exceptional service since 2015
          </p>
        </div>
      </div>

      {/* About Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=600&q=80" 
              alt="Our team" 
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Who We Are</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2015, our e-commerce platform began with a simple mission: to make online shopping 
              effortless, enjoyable, and accessible to everyone. What started as a small team of passionate 
              individuals has grown into a thriving community of customers and employees who share our vision.
            </p>
            <p className="text-gray-600 mb-4">
              We carefully curate our product selection to bring you the best quality items at competitive 
              prices. Our team works tirelessly to ensure every aspect of your shopping experience exceeds 
              expectations.
            </p>
            <p className="text-gray-600 mb-6">
              Today, we serve customers across the country with fast shipping, easy returns, and 
              award-winning customer service.
            </p>
            <Link 
              to="/products" 
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-gray-50 hover:shadow-md transition-shadow">
              <div className="text-indigo-600 text-4xl mb-4 flex justify-center">
                <FaShippingFast />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                We promise quick processing and shipping so you get your items when you need them.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-gray-50 hover:shadow-md transition-shadow">
              <div className="text-indigo-600 text-4xl mb-4 flex justify-center">
                <FaShieldAlt />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-gray-600">
                Every product is carefully vetted to meet our high standards of quality and durability.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-gray-50 hover:shadow-md transition-shadow">
              <div className="text-indigo-600 text-4xl mb-4 flex justify-center">
                <FaHeadset />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Our customer service team is always ready to help with any questions or concerns.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "Sarah Johnson", role: "CEO & Founder", img: "https://randomuser.me/api/portraits/women/43.jpg" },
              { name: "Michael Chen", role: "Operations Manager", img: "https://randomuser.me/api/portraits/men/32.jpg" },
              { name: "David Wilson", role: "Head of Customer Service", img: "https://randomuser.me/api/portraits/men/75.jpg" },
              { name: "Emma Rodriguez", role: "Marketing Director", img: "https://randomuser.me/api/portraits/women/65.jpg" },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-40 h-40 mx-auto mb-4 overflow-hidden rounded-full border-4 border-white shadow-lg">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-indigo-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2 flex items-center justify-center">
                <FaAward className="mr-2" /> 8+
              </div>
              <p className="text-indigo-200">Years in Business</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500K+</div>
              <p className="text-indigo-200">Happy Customers</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 flex items-center justify-center">
                <FaLeaf className="mr-2" /> 10K+
              </div>
              <p className="text-indigo-200">Eco-Friendly Products</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <p className="text-indigo-200">Customer Support</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to Shop With Us?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Join thousands of satisfied customers who trust us for quality products and exceptional service.
          </p>
          <Link 
            to="/products" 
            className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-lg hover:bg-indigo-700 transition-colors text-lg"
          >
            Browse Our Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

