import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg space-y-6">
        <h1 className="text-6xl font-bold text-red-600 mb-4 animate__animated animate__fadeIn animate__delay-1s">
          404
        </h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4 animate__animated animate__fadeIn animate__delay-2s">
          Oops! Page Not Found
        </h2>
        <p className="text-lg text-gray-500 mb-6 animate__animated animate__fadeIn animate__delay-3s">
          The page you're looking for doesn't exist or has been moved. But don’t worry, there’s plenty more to explore!
        </p>

        <div className="animate__animated animate__fadeIn animate__delay-4s">
          <img
            src="https://via.placeholder.com/400x250?text=Page+Not+Found"
            alt="404 Not Found"
            className="rounded-md shadow-lg"
          />
        </div>

        <div className="mt-6 animate__animated animate__fadeIn animate__delay-5s">
          <Link
            to="/"
            className="bg-indigo-600 text-white px-8 py-3 rounded-md hover:bg-indigo-700 transition"
          >
            Return to Shop
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
