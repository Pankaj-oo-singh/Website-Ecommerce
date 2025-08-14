import React from 'react';

const Settings = () => {
  const handleLogout = () => {
    // Clear tokens/localStorage or perform logout logic
    localStorage.clear();
    window.location.href = '/login'; // Redirect to login or landing page
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-semibold text-indigo-700 mb-6">Account Settings</h2>

      <button
        onClick={handleLogout}
        className="inline-flex justify-center px-6 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none"
      >
        Logout
      </button>
    </div>
  );
};

export default Settings;
