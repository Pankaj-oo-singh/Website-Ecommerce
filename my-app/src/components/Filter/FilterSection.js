
// import React from 'react';
// import PriceRangeSlider from './PriceRangeSlider';

// const FilterSection = ({
//   categories,
//   colors,
//   selectedCategories,
//   selectedColors,
//   priceRange,
//   onCategoryChange,
//   onColorChange,
//   onPriceChange,
//   minPrice,
//   maxPrice
// }) => {
//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-xl font-bold text-gray-800 mb-6">Filters</h2>
      
//       {/* Category Filter */}
//       <div className="mb-6">
//         <h3 className="text-md font-semibold text-gray-700 mb-3">Category</h3>
//         <div className="space-y-2">
//           {categories.map((category) => (
//             <label key={category} className="flex items-center">
//               <input
//                 type="checkbox"
//                 checked={selectedCategories.includes(category)}
//                 onChange={() => onCategoryChange(category)}
//                 className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//               />
//               <span className="ml-2 text-sm text-gray-700">{category}</span>
//             </label>
//           ))}
//         </div>
//       </div>
      
//       {/* Price Filter */}
//       <div className="mb-6">
//         <h3 className="text-md font-semibold text-gray-700 mb-3">Price Range</h3>
//         <PriceRangeSlider
//           minPrice={minPrice}
//           maxPrice={maxPrice}
//           onPriceChange={onPriceChange}
//         />
//       </div>
      
//       {/* Color Filter */}
//       <div className="mb-6">
//         <h3 className="text-md font-semibold text-gray-700 mb-3">Color</h3>
//         <div className="flex flex-wrap gap-2">
//           {colors.map((color) => (
//             <label
//               key={color}
//               className={`inline-flex items-center justify-center w-8 h-8 rounded-full cursor-pointer border-2 ${selectedColors.includes(color) ? 'border-indigo-500' : 'border-transparent'}`}
//               style={{ backgroundColor: color.toLowerCase() }}
//               // style={{ backgroundColor: color ? color.toLowerCase() : 'transparent' }}

//               title={color}
//             >
//               <input
//                 type="checkbox"
//                 checked={selectedColors.includes(color)}
//                 onChange={() => onColorChange(color)}
//                 className="opacity-0 absolute"
//               />
//             </label>
//           ))}
//         </div>
//       </div>
      
//       <button
//         onClick={() => {
//           onCategoryChange('reset');
//           onColorChange('reset');
//           onPriceChange([minPrice, maxPrice]);
//         }}
//         className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors duration-200"
//       >
//         Reset Filters
//       </button>
//     </div>
//   );
// };

// export default FilterSection;






// import React from 'react';
// import PriceRangeSlider from './PriceRangeSlider';

// const FilterSection = ({
//   categories, // expecting an array of category type objects now
//   colors,
//   selectedCategories,
//   selectedColors,
//   priceRange,
//   onCategoryChange,
//   onColorChange,
//   onPriceChange,
//   minPrice,
//   maxPrice
// }) => {
//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-xl font-bold text-gray-800 mb-6">Filters</h2>
      
//       {/* Category Filter */}
//       <div className="mb-6">
//         <h3 className="text-md font-semibold text-gray-700 mb-3">Category Type</h3>
//         <div className="space-y-2">
//           {categories.map((categoryType) => (
//             <label key={categoryType.id} className="flex items-center">
//               <input
//                 type="checkbox"
//                 checked={selectedCategories.includes(categoryType.name)}
//                 onChange={() => onCategoryChange(categoryType.name)}
//                 className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//               />
//               <span className="ml-2 text-sm text-gray-700">{categoryType.name}</span>
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Price Filter */}
//       <div className="mb-6">
//         <h3 className="text-md font-semibold text-gray-700 mb-3">Price Range</h3>
//         <PriceRangeSlider
//           minPrice={minPrice}
//           maxPrice={maxPrice}
//           onPriceChange={onPriceChange}
//         />
//       </div>
      
//       {/* Color Filter */}
//       <div className="mb-6">
//         <h3 className="text-md font-semibold text-gray-700 mb-3">Color</h3>
//         <div className="flex flex-wrap gap-2">
//           {colors.map((color) => (
//             <label
//               key={color}
//               className={`inline-flex items-center justify-center w-8 h-8 rounded-full cursor-pointer border-2 ${selectedColors.includes(color) ? 'border-indigo-500' : 'border-transparent'}`}
//               style={{ backgroundColor: color.toLowerCase() }}
//               title={color}
//             >
//               <input
//                 type="checkbox"
//                 checked={selectedColors.includes(color)}
//                 onChange={() => onColorChange(color)}
//                 className="opacity-0 absolute"
//               />
//             </label>
//           ))}
//         </div>
//       </div>
      
//       <button
//         onClick={() => {
//           onCategoryChange('reset');
//           onColorChange('reset');
//           onPriceChange([minPrice, maxPrice]);
//         }}
//         className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors duration-200"
//       >
//         Reset Filters
//       </button>
//     </div>
//   );
// };

// export default FilterSection;







// import React from 'react';
// import PriceRangeSlider from './PriceRangeSlider';

// const FilterSection = ({
//   categories = [],
//   colors = [],
//   selectedCategories = [],
//   selectedColors = [],
//   priceRange = [0, 0],
//   onCategoryChange,
//   onColorChange,
//   onPriceChange,
//   minPrice = 0,
//   maxPrice = 0
// }) => {
//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-xl font-bold text-gray-800 mb-6">Filters</h2>
      
//       {/* Category Filter */}
//       {categories.length > 0 && (
//         <div className="mb-6">
//           <h3 className="text-md font-semibold text-gray-700 mb-3">Category Type</h3>
//           <div className="space-y-2">
//             {categories.map((categoryType) => (
//               <label key={categoryType.id} className="flex items-center">
//                 <input
//                   type="checkbox"
//                   checked={selectedCategories.includes(categoryType.name)}
//                   onChange={() => onCategoryChange(categoryType.name)}
//                   className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                 />
//                 <span className="ml-2 text-sm text-gray-700">{categoryType.name}</span>
//               </label>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Price Filter */}
//       <div className="mb-6">
//         <h3 className="text-md font-semibold text-gray-700 mb-3">Price Range</h3>
//         <PriceRangeSlider
//           minPrice={minPrice}
//           maxPrice={maxPrice}
//           onPriceChange={onPriceChange}
//           currentRange={priceRange}
//         />
//       </div>
      
//       {/* Color Filter */}
//       {colors.length > 0 && (
//         <div className="mb-6">
//           <h3 className="text-md font-semibold text-gray-700 mb-3">Color</h3>
//           <div className="flex flex-wrap gap-2">
//             {colors.map((color) => (
//               <label
//                 key={color}
//                 className={`inline-flex items-center justify-center w-8 h-8 rounded-full cursor-pointer border-2 ${selectedColors.includes(color) ? 'border-indigo-500' : 'border-transparent'}`}
//                 style={{ backgroundColor: color.toLowerCase() }}
//                 title={color}
//               >
//                 <input
//                   type="checkbox"
//                   checked={selectedColors.includes(color)}
//                   onChange={() => onColorChange(color)}
//                   className="opacity-0 absolute"
//                 />
//               </label>
//             ))}
//           </div>
//         </div>
//       )}
      
//       {/* Reset Filters Button */}
//       <button
//         onClick={() => {
//           onCategoryChange('reset');
//           onColorChange('reset');
//           onPriceChange([minPrice, maxPrice]);
//         }}
//         className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors duration-200 mt-4"
//       >
//         Reset Filters
//       </button>
//     </div>
//   );
// };

// export default FilterSection;


import React from 'react';
import PriceRangeSlider from './PriceRangeSlider';

const FilterSection = ({
  categories = [],             // [{id, name}]
  colors = [],
  selectedCategories = [],    // array of selected categoryType names
  selectedColors = [],
  priceRange = [0, 0],
  onCategoryChange,
  onColorChange,
  onPriceChange,
  minPrice = 0,
  maxPrice = 0,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Filters</h2>
      
      {/* Category Filter */}
      {categories.length > 0 && (
        <div className="mb-6">
          <h3 className="text-md font-semibold text-gray-700 mb-3">Category Type</h3>
          <div className="space-y-2">
            {categories.map((categoryType) => (
              <label key={categoryType.id} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(categoryType.name)}
                  onChange={() => onCategoryChange(categoryType.name)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">{categoryType.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Price Filter */}
      <div className="mb-6">
        {/* <h3 className="text-md font-semibold text-gray-700 mb-3">Price Range</h3> */}
        <PriceRangeSlider
          minPrice={minPrice}
          maxPrice={maxPrice}
          onPriceChange={onPriceChange}
          currentRange={priceRange}
        />
      </div>
      
      {/* Color Filter */}
      {colors.length > 0 && (
        <div className="mb-6">
          <h3 className="text-md font-semibold text-gray-700 mb-3">Color</h3>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <label
                key={color}
                className={`inline-flex items-center justify-center w-8 h-8 rounded-full cursor-pointer border-2 ${selectedColors.includes(color) ? 'border-indigo-500' : 'border-transparent'}`}
                style={{ backgroundColor: color.toLowerCase() }}
                title={color}
              >
                <input
                  type="checkbox"
                  checked={selectedColors.includes(color)}
                  onChange={() => onColorChange(color)}
                  className="opacity-0 absolute"
                />
              </label>
            ))}
          </div>
        </div>
      )}
      
      {/* Reset Filters Button */}
      <button
        onClick={() => {
          onCategoryChange('reset');
          onColorChange('reset');
          onPriceChange([minPrice, maxPrice]);
        }}
        className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors duration-200 mt-4"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterSection;
