// ThankYouPage.jsx
import React from 'react';

const ThankYouPage = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded shadow-md text-center">
        <h2 className="text-3xl font-bold text-green-600 mb-4">Thank you!</h2>
        <p className="text-lg text-gray-700">Your order has been placed successfully.</p>
      </div>
    </div>
  );
};

export default ThankYouPage;
