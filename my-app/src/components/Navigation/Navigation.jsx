

// import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import { FiSearch, FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';
// import { useCart } from '../../context/CartContext';

// const Navigation = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
 
  
//   const { cartItems } = useCart();

//   const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

//   const navLinks = [
//     { name: 'Home', path: '/' },
//     { name: 'Men', path: '/men' },
//     { name: 'Women', path: '/women' },
//     { name: 'Kids', path: '/kids' },
//     { name: 'About', path: '/about' },
//   ];

//   // Active link style
//   const activeLinkClass = "text-indigo-600 border-indigo-500";
//   const inactiveLinkClass = "text-gray-700 hover:text-indigo-600 border-transparent";

//   return (
//     <nav className="bg-white shadow-md sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16 items-center">
//           {/* Logo and Desktop Navigation */}
//           <div className="flex items-center">
//             <div className="flex-shrink-0">
//               <NavLink 
//                 to="/" 
//                 className="text-xl font-bold text-indigo-600 hover:text-indigo-700"
//               >
//                 ShopEase
//               </NavLink>
//             </div>
            
//             {/* Desktop Navigation */}
//             <div className="hidden md:ml-6 md:flex md:space-x-8">
//               {navLinks.map((link) => (
//                 <NavLink
//                   key={link.name}
//                   to={link.path}
//                   end={link.path === '/'} // Add 'end' prop for exact matching on home link
//                   className={({ isActive }) => 
//                     `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
//                       isActive ? activeLinkClass : inactiveLinkClass
//                     }`
//                   }
//                 >
//                   {link.name}
//                 </NavLink>
//               ))}
//             </div>
//           </div>

//           {/* Search Bar */}
//           <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
//             <div className="max-w-lg w-full lg:max-w-xs">
//               <label htmlFor="search" className="sr-only">Search</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FiSearch className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   id="search"
//                   name="search"
//                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   placeholder="Search products..."
//                   type="search"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Right side icons */}
//           <div className="hidden md:ml-4 md:flex md:items-center">
//             {/* Cart */}
//             <div className="ml-4 relative">
            

// <NavLink 
//   to="/cart" 
//   className="p-1 text-gray-700 hover:text-indigo-600"
//   aria-label="Shopping cart"
// >
//   <div className="relative">
//     <FiShoppingCart className="h-6 w-6" />
//     {totalItems > 0 && (
//       <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
//         {totalItems}
//       </span>
//     )}
//   </div>
// </NavLink>

//             </div>

//             {/* Auth Buttons */}
//             <div className="ml-6 flex items-center space-x-4">
//               <NavLink
//                 to="/login"
//                 className={({ isActive }) => 
//                   `px-4 py-2 text-sm font-medium rounded-md ${
//                     isActive 
//                       ? 'bg-indigo-100 text-indigo-700' 
//                       : 'text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50'
//                   }`
//                 }
//               >
//                 Login
//               </NavLink>
//               <NavLink
//                 to="/signup"
//                 className={({ isActive }) => 
//                   `px-4 py-2 text-sm font-medium text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
//                     isActive ? 'bg-indigo-700' : 'bg-indigo-600'
//                   }`
//                 }
//               >
//                 Sign Up
//               </NavLink>
//             </div>
//           </div>

//           {/* Mobile menu button */}
//           <div className="-mr-2 flex items-center md:hidden">
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
//               aria-expanded={isMenuOpen}
//               aria-label="Toggle menu"
//             >
//               {isMenuOpen ? (
//                 <FiX className="block h-6 w-6" />
//               ) : (
//                 <FiMenu className="block h-6 w-6" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       {isMenuOpen && (
//         <div className="md:hidden">
//           <div className="pt-2 pb-3 space-y-1">
//             {navLinks.map((link) => (
//               <NavLink
//                 key={link.name}
//                 to={link.path}
//                 end={link.path === '/'}
//                 onClick={() => setIsMenuOpen(false)}
//                 className={({ isActive }) => 
//                   `block py-2 pl-3 pr-4 text-base font-medium border-l-4 ${
//                     isActive 
//                       ? 'text-indigo-600 bg-indigo-50 border-indigo-500' 
//                       : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50 border-transparent'
//                   }`
//                 }
//               >
//                 {link.name}
//               </NavLink>
//             ))}
//           </div>
//           <div className="pt-4 pb-3 border-t border-gray-200">
//             <div className="flex items-center px-4 space-x-3">
//               <NavLink 
//                 to="/cart"
//                 className="p-1 text-gray-700 hover:text-indigo-600 relative flex items-center"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 <div className="relative">
//                   <FiShoppingCart className="h-6 w-6" />
//                   {cartItems > 0 && (
//                     <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
//                       {cartItems}
//                     </span>
//                   )}
//                 </div>
//                 <span className="ml-2">Cart</span>
//               </NavLink>
//             </div>
//             <div className="mt-3 px-4 space-y-2">
//               <NavLink
//                 to="/login"
//                 onClick={() => setIsMenuOpen(false)}
//                 className={({ isActive }) => 
//                   `block w-full px-4 py-2 text-center text-sm font-medium rounded-md ${
//                     isActive ? 'bg-indigo-100 text-indigo-700' : 'text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50'
//                   }`
//                 }
//               >
//                 Login
//               </NavLink>
//               <NavLink
//                 to="/signup"
//                 onClick={() => setIsMenuOpen(false)}
//                 className={({ isActive }) => 
//                   `block w-full px-4 py-2 text-center text-sm font-medium text-white rounded-md hover:bg-indigo-700 ${
//                     isActive ? 'bg-indigo-700' : 'bg-indigo-600'
//                   }`
//                 }
//               >
//                 Sign Up
//               </NavLink>
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navigation;



// import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import { FiSearch, FiShoppingCart, FiMenu, FiX, FiUser } from 'react-icons/fi';
// import { useCart } from '../../context/CartContext';

// const Navigation = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const { cartItems } = useCart();

//   const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

//   const navLinks = [
//     { name: 'Home', path: '/' },
//     { name: 'Men', path: '/men' },
//     { name: 'Women', path: '/women' },
//     { name: 'Kids', path: '/kids' },
//     { name: 'About', path: '/about' },
//   ];

//   const activeLinkClass = "text-indigo-600 border-indigo-500";
//   const inactiveLinkClass = "text-gray-700 hover:text-indigo-600 border-transparent";

//   return (
//     <nav className="bg-white shadow-md sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16 items-center">
//           {/* Logo and Desktop Navigation */}
//           <div className="flex items-center">
//             <div className="flex-shrink-0">
//               <NavLink 
//                 to="/" 
//                 className="text-xl font-bold text-indigo-600 hover:text-indigo-700"
//               >
//                 ShopEase
//               </NavLink>
//             </div>

//             <div className="hidden md:ml-6 md:flex md:space-x-8">
//               {navLinks.map((link) => (
//                 <NavLink
//                   key={link.name}
//                   to={link.path}
//                   end={link.path === '/'}
//                   className={({ isActive }) =>
//                     `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
//                       isActive ? activeLinkClass : inactiveLinkClass
//                     }`
//                   }
//                 >
//                   {link.name}
//                 </NavLink>
//               ))}
//             </div>
//           </div>

//           {/* Search Bar */}
//           <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
//             <div className="max-w-lg w-full lg:max-w-xs">
//               <label htmlFor="search" className="sr-only">Search</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FiSearch className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   id="search"
//                   name="search"
//                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   placeholder="Search products..."
//                   type="search"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Right side icons */}
//           <div className="hidden md:ml-4 md:flex md:items-center space-x-4">
//             {/* Account */}
//             <NavLink
//               to="/account-details"
//               className={({ isActive }) =>
//                 `p-2 text-gray-700 hover:text-indigo-600 ${
//                   isActive ? 'text-indigo-600 font-semibold' : ''
//                 }`
//               }
//               aria-label="Account"
//             >
//               <div className="flex items-center space-x-1">
//                 <FiUser className="h-5 w-5" />
//                 <span className="hidden sm:inline text-sm">Account</span>
//               </div>
//             </NavLink>

//             {/* Cart */}
//             <div className="relative">
//               <NavLink 
//                 to="/cart" 
//                 className="p-1 text-gray-700 hover:text-indigo-600"
//                 aria-label="Shopping cart"
//               >
//                 <div className="relative">
//                   <FiShoppingCart className="h-6 w-6" />
//                   {totalItems > 0 && (
//                     <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
//                       {totalItems}
//                     </span>
//                   )}
//                 </div>
//               </NavLink>
//             </div>

//             {/* Auth Buttons */}
//             <NavLink
//               to="/login"
//               className={({ isActive }) => 
//                 `px-4 py-2 text-sm font-medium rounded-md ${
//                   isActive 
//                     ? 'bg-indigo-100 text-indigo-700' 
//                     : 'text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50'
//                 }`
//               }
//             >
//               Login
//             </NavLink>
//             <NavLink
//               to="/signup"
//               className={({ isActive }) => 
//                 `px-4 py-2 text-sm font-medium text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
//                   isActive ? 'bg-indigo-700' : 'bg-indigo-600'
//                 }`
//               }
//             >
//               Sign Up
//             </NavLink>
//           </div>

//           {/* Mobile Menu Toggle */}
//           <div className="-mr-2 flex items-center md:hidden">
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
//               aria-expanded={isMenuOpen}
//               aria-label="Toggle menu"
//             >
//               {isMenuOpen ? (
//                 <FiX className="block h-6 w-6" />
//               ) : (
//                 <FiMenu className="block h-6 w-6" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isMenuOpen && (
//         <div className="md:hidden">
//           <div className="pt-2 pb-3 space-y-1">
//             {navLinks.map((link) => (
//               <NavLink
//                 key={link.name}
//                 to={link.path}
//                 end={link.path === '/'}
//                 onClick={() => setIsMenuOpen(false)}
//                 className={({ isActive }) => 
//                   `block py-2 pl-3 pr-4 text-base font-medium border-l-4 ${
//                     isActive 
//                       ? 'text-indigo-600 bg-indigo-50 border-indigo-500' 
//                       : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50 border-transparent'
//                   }`
//                 }
//               >
//                 {link.name}
//               </NavLink>
//             ))}

//             {/* Account in mobile menu */}
//             <NavLink
//               to="/account-details"
//               onClick={() => setIsMenuOpen(false)}
//               className={({ isActive }) => 
//                 `block py-2 pl-3 pr-4 text-base font-medium border-l-4 ${
//                   isActive 
//                     ? 'text-indigo-600 bg-indigo-50 border-indigo-500' 
//                     : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50 border-transparent'
//                 }`
//               }
//             >
//               Account
//             </NavLink>
//           </div>

//           <div className="pt-4 pb-3 border-t border-gray-200">
//             <div className="mt-3 px-4 space-y-2">
//               <NavLink
//                 to="/login"
//                 onClick={() => setIsMenuOpen(false)}
//                 className={({ isActive }) => 
//                   `block w-full px-4 py-2 text-center text-sm font-medium rounded-md ${
//                     isActive ? 'bg-indigo-100 text-indigo-700' : 'text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50'
//                   }`
//                 }
//               >
//                 Login
//               </NavLink>
//               <NavLink
//                 to="/signup"
//                 onClick={() => setIsMenuOpen(false)}
//                 className={({ isActive }) => 
//                   `block w-full px-4 py-2 text-center text-sm font-medium text-white rounded-md hover:bg-indigo-700 ${
//                     isActive ? 'bg-indigo-700' : 'bg-indigo-600'
//                   }`
//                 }
//               >
//                 Sign Up
//               </NavLink>
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navigation;


import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { FiSearch, FiShoppingCart, FiMenu, FiX, FiUser } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const activeLinkClass = "text-indigo-600 border-indigo-500";
  const inactiveLinkClass = "text-gray-700 hover:text-indigo-600 border-transparent";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/category/getAllCategory');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <NavLink to="/" className="text-xl font-bold text-indigo-600 hover:text-indigo-700">
                ShopEase
              </NavLink>
            </div>

            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive ? activeLinkClass : inactiveLinkClass
                  }`
                }
              >
                Home
              </NavLink>
              {categories.map((category) => (
                <NavLink
                  key={category.id}
                  to={`/${category.name.toLowerCase()}`}
                  className={({ isActive }) =>
                    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive ? activeLinkClass : inactiveLinkClass
                    }`
                  }
                >
                  {category.name}
                </NavLink>
              ))}
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive ? activeLinkClass : inactiveLinkClass
                  }`
                }
              >
                About
              </NavLink>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="max-w-lg w-full lg:max-w-xs">
              <label htmlFor="search" className="sr-only">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Search products..."
                  type="search"
                />
              </div>
            </div>
          </div>

          <div className="hidden md:ml-4 md:flex md:items-center space-x-4">
            <NavLink
              to="/account-details"
              className={({ isActive }) =>
                `p-2 text-gray-700 hover:text-indigo-600 ${isActive ? 'text-indigo-600 font-semibold' : ''}`
              }
              aria-label="Account"
            >
              <div className="flex items-center space-x-1">
                <FiUser className="h-5 w-5" />
                <span className="hidden sm:inline text-sm">Account</span>
              </div>
            </NavLink>

            <div className="relative">
              <NavLink 
                to="/cart" 
                className="p-1 text-gray-700 hover:text-indigo-600"
                aria-label="Shopping cart"
              >
                <div className="relative">
                  <FiShoppingCart className="h-6 w-6" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </div>
              </NavLink>
            </div>

            <NavLink
              to="/login"
              className={({ isActive }) => 
                `px-4 py-2 text-sm font-medium rounded-md ${
                  isActive 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50'
                }`
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) => 
                `px-4 py-2 text-sm font-medium text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  isActive ? 'bg-indigo-700' : 'bg-indigo-600'
                }`
              }
            >
              Sign Up
            </NavLink>
          </div>

          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FiX className="block h-6 w-6" />
              ) : (
                <FiMenu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <NavLink
              to="/"
              end
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) => 
                `block py-2 pl-3 pr-4 text-base font-medium border-l-4 ${
                  isActive 
                    ? 'text-indigo-600 bg-indigo-50 border-indigo-500' 
                    : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50 border-transparent'
                }`
              }
            >
              Home
            </NavLink>
            {categories.map((category) => (
              <NavLink
                key={category.id}
                to={`/${category.name.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) => 
                  `block py-2 pl-3 pr-4 text-base font-medium border-l-4 ${
                    isActive 
                      ? 'text-indigo-600 bg-indigo-50 border-indigo-500' 
                      : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50 border-transparent'
                  }`
                }
              >
                {category.name}
              </NavLink>
            ))}
            <NavLink
              to="/account-details"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) => 
                `block py-2 pl-3 pr-4 text-base font-medium border-l-4 ${
                  isActive 
                    ? 'text-indigo-600 bg-indigo-50 border-indigo-500' 
                    : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50 border-transparent'
                }`
              }
            >
              Account
            </NavLink>
          </div>

          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="mt-3 px-4 space-y-2">
              <NavLink
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) => 
                  `block w-full px-4 py-2 text-center text-sm font-medium rounded-md ${
                    isActive ? 'bg-indigo-100 text-indigo-700' : 'text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50'
                  }`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) => 
                  `block w-full px-4 py-2 text-center text-sm font-medium text-white rounded-md hover:bg-indigo-700 ${
                    isActive ? 'bg-indigo-700' : 'bg-indigo-600'
                  }`
                }
              >
                Sign Up
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
