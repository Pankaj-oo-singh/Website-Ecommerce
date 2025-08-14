// src/components/PriceRangeSlider.jsx
import React, { useState, useEffect } from 'react';

const PriceRangeSlider = ({ minPrice, maxPrice, onPriceChange }) => {
  const [min, setMin] = useState(minPrice);
  const [max, setMax] = useState(maxPrice);

  useEffect(() => {
    onPriceChange([min, max]);
  }, [min, max, onPriceChange]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">Price Range</span>
        <span className="text-sm text-gray-500">
          ${min} - ${max}
        </span>
      </div>
      <div className="flex items-center space-x-4">
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={min}
          onChange={(e) => setMin(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={max}
          onChange={(e) => setMax(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
};

export default PriceRangeSlider;