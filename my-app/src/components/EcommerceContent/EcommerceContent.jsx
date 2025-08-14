// import React from 'react';
// import { FiShoppingBag, FiStar, FiClock } from 'react-icons/fi';

// const EcommerceContent = () => {
//   // Sample product data
//   const featuredProducts = [
//     {
//       id: 1,
//       name: 'Wireless Headphones',
//       price: 99.99,
//       rating: 4.5,
//       image: 'https://m.media-amazon.com/images/I/41lArSiD5hL.jpg',
//       isNew: true
//     },
//     {
//       id: 2,
//       name: 'Smart Watch',
//       price: 199.99,
//       rating: 4.2,
//       image: 'https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/25208120/2023/9/26/0a21665f-e7f2-401a-ae47-4903cf1c5ebe1695720756900-CMF-by-Nothing-Watch-Pro-8711695720756698-1.jpg',
//       isNew: false
//     },
//     {
//       id: 3,
//       name: 'Bluetooth Speaker',
//       price: 79.99,
//       rating: 4.7,
//       image: 'https://www.boat-lifestyle.com/cdn/shop/files/STONE350PRO_Blue_08.jpg?v=1720589644',
//       isNew: true
//     },
//     {
//       id: 4,
//       name: 'Gaming Keyboard',
//       price: 129.99,
//       rating: 4.8,
//       image: 'https://itgadgetsonline.com/wp-content/uploads/2023/12/Razer-BlackWidow-V4-X-Mechanical-Gaming-Keyboard-1-1.webp',
//       isNew: false
//     }
//   ];

//   const categories = [
//     { name: 'Electronics', icon: <FiShoppingBag /> },
//     { name: 'Clothing', icon: <FiShoppingBag /> },
//     { name: 'Home & Garden', icon: <FiShoppingBag /> },
//     { name: 'Beauty', icon: <FiShoppingBag /> },
//     { name: 'Sports', icon: <FiShoppingBag /> }
//   ];

//   return (
//     <main className="flex-grow">
//       {/* Hero Banner */}
//       <section className="bg-indigo-600 text-white py-20">
//         <div className="container mx-auto px-4 text-center">
//           <h1 className="text-4xl md:text-5xl font-bold mb-4">Summer Sale is Live!</h1>
//           <p className="text-xl mb-8">Up to 50% off on selected items</p>
//           <button className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300">
//             Shop Now
//           </button>
//         </div>
//       </section>

//       {/* Categories */}
//       <section className="py-16">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
//           <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
//             {categories.map((category, index) => (
//               <div 
//                 key={index} 
//                 className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-center cursor-pointer"
//               >
//                 <div className="text-3xl mb-3 text-indigo-600 flex justify-center">
//                   {category.icon}
//                 </div>
//                 <h3 className="font-medium">{category.name}</h3>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Featured Products */}
//       <section className="py-16 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <div className="flex justify-between items-center mb-12">
//             <h2 className="text-3xl font-bold">Featured Products</h2>
//             <button className="text-indigo-600 hover:underline">View All</button>
//           </div>
          
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//             {featuredProducts.map((product) => (
//               <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
//                 <div className="relative">
//                   <img 
//                     src={product.image} 
//                     alt={product.name} 
//                     className="w-full h-64 object-cover"
//                   />
//                   {product.isNew && (
//                     <span className="absolute top-2 left-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded">
//                       New
//                     </span>
//                   )}
//                   <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-gray-100">
//                     <FiShoppingBag className="text-gray-700" />
//                   </button>
//                 </div>
//                 <div className="p-4">
//                   <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
//                   <div className="flex items-center mb-2">
//                     {[...Array(5)].map((_, i) => (
//                       <FiStar 
//                         key={i} 
//                         className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
//                       />
//                     ))}
//                     <span className="text-sm text-gray-500 ml-1">({product.rating})</span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
//                     <button className="bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700 transition">
//                       Add to Cart
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Special Offer */}
//       <section className="py-16 bg-indigo-50">
//         <div className="container mx-auto px-4">
//           <div className="bg-indigo-600 text-white rounded-lg p-8 md:p-12 flex flex-col md:flex-row items-center">
//             <div className="md:w-1/2 mb-6 md:mb-0">
//               <h2 className="text-2xl md:text-3xl font-bold mb-4">Limited Time Offer!</h2>
//               <p className="mb-4">Get 30% off on your first order when you spend over $100.</p>
//               <div className="flex items-center space-x-2 mb-6">
//                 <FiClock className="text-xl" />
//                 <span>Offer ends in 2 days 4 hours</span>
//               </div>
//               <button className="bg-white text-indigo-600 px-6 py-2 rounded font-semibold hover:bg-gray-100">
//                 Shop Now
//               </button>
//             </div>
//             <div className="md:w-1/2 flex justify-center">
//               {/* <img 
//                 src="https://via.placeholder.com/400x250?text=Special+Offer" 
//                 alt="Special Offer" 
//                 className="rounded-lg shadow-md"
//               /> */}
//               <img src="https://i.pinimg.com/736x/f8/69/f0/f869f0b2dd2ab59a33d10c8f97856251.jpg" alt="Special Offer" />

//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// };

// export default EcommerceContent;


import React from 'react';
import { FiShoppingBag, FiStar, FiClock } from 'react-icons/fi';
import p1 from "../../Assest/imag/photohome1.avif"
import p2 from "../../Assest/imag/photo2.avif"
import p3 from "../../Assest/imag/photo3.avif"
import p4 from "../../Assest/imag/photo4.avif"
import sp from "../../Assest/imag/specialoffer.jpg"
import { PiX } from 'react-icons/pi';


const EcommerceContent = () => {
  // Sample product data with Unsplash image URLs
  const featuredProducts = [
    {
      id: 1,
      name: 'Men\'s Casual Shirt',
      price: 29.99,
      rating: 4.5,
      image: p4,
      isNew: true,
      category: 'Men'
    },
    {
      id: 2,
      name: 'Women\'s Hoodie',
      price: 49.99,
      rating: 4.2,
      image: p3,
      isNew: false,
      category: 'Women'
    },
    {
      id: 3,
      name: 'Kids\' Sneakers',
      price: 39.99,
      rating: 4.7,
      image: p2,
      isNew: true,
      category: 'Kids'
    },
    {
      id: 4,
      name: 'Men\'s Jeans',
      price: 59.99,
      rating: 4.8,
      image: p1,
      isNew: false,
      category: 'Men'
    }
  ];

  const categories = [
    { name: 'Men\'s Clothing', icon: <FiShoppingBag /> },
    { name: 'Women\'s Clothing', icon: <FiShoppingBag /> },
    { name: 'Kids\' Clothing', icon: <FiShoppingBag /> },
    { name: 'Shoes', icon: <FiShoppingBag /> },
    { name: 'Accessories', icon: <FiShoppingBag /> }
  ];

  return (
    <main className="flex-grow">
      {/* Hero Banner */}
      <section className="bg-indigo-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Seasonal Fashion Sale!</h1>
          <p className="text-xl mb-8">Up to 50% off on selected clothing and accessories</p>
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300">
            Shop Now
          </button>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-center cursor-pointer"
              >
                <div className="text-3xl mb-3 text-indigo-600 flex justify-center">
                  {category.icon}
                </div>
                <h3 className="font-medium">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <button className="text-indigo-600 hover:underline">View All</button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-64 object-cover"
                  />
                  {product.isNew && (
                    <span className="absolute top-2 left-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded">
                      New
                    </span>
                  )}
                  <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-gray-100">
                    <FiShoppingBag className="text-gray-700" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <FiStar 
                        key={i} 
                        className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                    <span className="text-sm text-gray-500 ml-1">({product.rating})</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                    <button className="bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700 transition">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offer */}
      <section className="py-16 bg-indigo-50">
        <div className="container mx-auto px-4">
          <div className="bg-indigo-600 text-white rounded-lg p-8 md:p-12 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Limited Time Offer!</h2>
              <p className="mb-4">Get 30% off on your first clothing order when you spend over $100.</p>
              <div className="flex items-center space-x-2 mb-6">
                <FiClock className="text-xl" />
                <span>Offer ends in 2 days 4 hours</span>
              </div>
              <button className="bg-white text-indigo-600 px-6 py-2 rounded font-semibold hover:bg-gray-100">
                Shop Now
              </button>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                  src={sp} alt="Special Offer"className="w-[300px] h-[200px] rounded-lg shadow-md"/>

            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default EcommerceContent;
