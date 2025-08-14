// import React, { useState } from 'react';
// import ProfilePage from './ProfilePage';  // ProfilePage.js
// import Orders from './Orders';           // Orders.js
// import Settings from './Settings';       // Settings.js

// const AccountPage = () => {
//   const [activeTab, setActiveTab] = useState('profile');  // Default tab is Profile

//   return (
//     <div className="max-w-6xl mx-auto p-6 space-y-6">
//       <h1 className="text-3xl font-bold text-indigo-700 mb-6">My Account</h1>

//       {/* Tab Navigation */}
//       <div className="flex space-x-6 mb-6">
//         <button
//           className={`px-4 py-2 text-sm font-medium rounded-md ${
//             activeTab === 'profile' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:text-indigo-700'
//           }`}
//           onClick={() => setActiveTab('profile')}
//         >
//           Profile
//         </button>
//         <button
//           className={`px-4 py-2 text-sm font-medium rounded-md ${
//             activeTab === 'orders' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:text-indigo-700'
//           }`}
//           onClick={() => setActiveTab('orders')}
//         >
//           Orders
//         </button>
//         <button
//           className={`px-4 py-2 text-sm font-medium rounded-md ${
//             activeTab === 'settings' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:text-indigo-700'
//           }`}
//           onClick={() => setActiveTab('settings')}
//         >
//           Settings
//         </button>
//       </div>

//       {/* Tab Content */}
//       {activeTab === 'profile' && <ProfilePage />}
//       {activeTab === 'orders' && <Orders />}
//       {activeTab === 'settings' && <Settings />}
//     </div>
//   );
// };

// export default AccountPage;

import React, { useState, useEffect } from 'react';
import ProfilePage from './ProfilePage';
import Orders from './Orders';
import Settings from './Settings';
import CreateCategory from './CreateCategory';
import CreateProduct from './CreateProduct';

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isAdmin, setIsAdmin] = useState(false);

  // useEffect(() => {
  //   // Check if user has ADMIN role (assuming roles are stored in localStorage)
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   if (user && Array.isArray(user.roles)) {
  //     setIsAdmin(user.roles.includes("ADMIN"));
  //   }
  // }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">My Account</h1>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-4 mb-6">
        <button
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            activeTab === 'profile' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:text-indigo-700'
          }`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            activeTab === 'orders' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:text-indigo-700'
          }`}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            activeTab === 'settings' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:text-indigo-700'
          }`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>

        {isAdmin && (
          <>
            <button
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === 'createCategory' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:text-indigo-700'
              }`}
              onClick={() => setActiveTab('createCategory')}
            >
              CreateCategory
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === 'createProduct' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:text-indigo-700'
              }`}
              onClick={() => setActiveTab('createProduct')}
            >
              Create Product
            </button>
             <button
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            activeTab === 'profile' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:text-indigo-700'
          }`}
          onClick={() => setActiveTab('profile')}
        >
          CreateCategory
        </button>
          </>
        )}
      </div>

      {/* Tab Content */}
      {activeTab === 'profile' && <ProfilePage />}
      {activeTab === 'orders' && <Orders />}
      {activeTab === 'settings' && <Settings />}
      {isAdmin && activeTab === 'createCategory' && <CreateCategory />}
      {isAdmin && activeTab === 'createProduct' && <CreateProduct />}
    </div>
  );
};

export default AccountPage;

