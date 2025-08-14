



// import React, { useState, useEffect } from 'react';
// import { products, categories, colors } from '../../data/products';
// import ProductCard from './ProductCard';
// import FilterSection from '../../components/Filter/FilterSection';
// import Footer from '../../components/Footer/Footer';

// const ProductListPage = ({ categoryType }) => {
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState(
//     categoryType ? [categoryType] : []
//   );
//   const [selectedColors, setSelectedColors] = useState([]);
//   const [priceRange, setPriceRange] = useState([
//     Math.min(...products.map(p => p.price)),
//     Math.max(...products.map(p => p.price)),
//   ]);

//   const minPrice = Math.min(...products.map(p => p.price));
//   const maxPrice = Math.max(...products.map(p => p.price));

//   useEffect(() => {
//     let result = products;

//     // Filter by category
//     if (selectedCategories.length > 0) {
//       result = result.filter(product =>
//         selectedCategories.includes(product.category)
//       );
//     }

//     // Filter by color
//     if (selectedColors.length > 0) {
//       result = result.filter(product =>
//         selectedColors.includes(product.color)
//       );
//     }

//     // Filter by price range
//     result = result.filter(
//       product => product.price >= priceRange[0] && product.price <= priceRange[1]
//     );

//     setFilteredProducts(result);
//   }, [selectedCategories, selectedColors, priceRange]);

//   const handleCategoryChange = (category) => {
//     if (category === 'reset') {
//       setSelectedCategories([]);
//       return;
//     }
//     setSelectedCategories(prev =>
//       prev.includes(category)
//         ? prev.filter(c => c !== category)
//         : [...prev, category]
//     );
//   };

//   const handleColorChange = (color) => {
//     if (color === 'reset') {
//       setSelectedColors([]);
//       return;
//     }
//     setSelectedColors(prev =>
//       prev.includes(color)
//         ? prev.filter(c => c !== color)
//         : [...prev, color]
//     );
//   };

//   return (
//     <div>
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-8">
//           {categoryType ? `${categoryType.charAt(0).toUpperCase()}${categoryType.slice(1).toLowerCase()} Collection` : 'Our Products'}
//         </h1>

//         <div className="flex flex-col md:flex-row gap-8">
//           {/* Filters */}
//           <div className="w-full md:w-1/4">
//             <FilterSection
//               categories={categories}
//               colors={colors}
//               selectedCategories={selectedCategories}
//               selectedColors={selectedColors}
//               priceRange={priceRange}
//               onCategoryChange={handleCategoryChange}
//               onColorChange={handleColorChange}
//               onPriceChange={setPriceRange}
//               minPrice={minPrice}
//               maxPrice={maxPrice}
//             />
//           </div>

//           {/* Product Grid */}
//           <div className="w-full md:w-3/4">
//             <div className="mb-4 flex justify-between items-center">
//               <p className="text-gray-600">
//                 Showing {filteredProducts.length} of {products.length} products
//               </p>
//             </div>

//             {filteredProducts.length === 0 ? (
//               <div className="text-center py-12">
//                 <h3 className="text-xl font-medium text-gray-700 mb-2">No products found</h3>
//                 <p className="text-gray-500">Try adjusting your filters</p>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredProducts.map(product => (
//                   <ProductCard key={product.id} product={product} />
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default ProductListPage;

// import React, { useState, useEffect } from 'react';
// import { products, colors } from '../../data/products';
// import ProductCard from './ProductCard';
// import FilterSection from '../../components/Filter/FilterSection';
// import Footer from '../../components/Footer/Footer';
// import { fetchCategories } from '../../Api/fetchcategories'; // Make sure this path is correct

// const ProductListPage = ({ categoryType }) => {
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [selectedColors, setSelectedColors] = useState([]);
//   const [priceRange, setPriceRange] = useState([0, 0]);
//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(0);
//   const [categoryTypes, setCategoryTypes] = useState([]);

//   useEffect(() => {
//     // Fetch category types from backend
//     const loadCategories = async () => {
//       const data = await fetchCategories();
//       const matchedCategory = data.find(cat => cat.code.toLowerCase() === categoryType?.toLowerCase());
//       if (matchedCategory) {
//         setCategoryTypes(matchedCategory.categoryTypes);
//         setSelectedCategories(categoryType ? matchedCategory.categoryTypes.map(ct => ct.name) : []);
//       }
//     };

//     loadCategories();

//     // Initialize price range
//     const min = Math.min(...products.map(p => p.price));
//     const max = Math.max(...products.map(p => p.price));
//     setMinPrice(min);
//     setMaxPrice(max);
//     setPriceRange([min, max]);
//   }, [categoryType]);

//   useEffect(() => {
//     let result = products;

//     // Filter by category
//     if (selectedCategories.length > 0) {
//       result = result.filter(product =>
//         selectedCategories.includes(product.category)
//       );
//     }

//     // Filter by color
//     if (selectedColors.length > 0) {
//       result = result.filter(product =>
//         selectedColors.includes(product.color)
//       );
//     }

//     // Filter by price
//     result = result.filter(
//       product => product.price >= priceRange[0] && product.price <= priceRange[1]
//     );

//     setFilteredProducts(result);
//   }, [selectedCategories, selectedColors, priceRange]);

//   const handleCategoryChange = (category) => {
//     if (category === 'reset') {
//       setSelectedCategories([]);
//       return;
//     }
//     setSelectedCategories(prev =>
//       prev.includes(category)
//         ? prev.filter(c => c !== category)
//         : [...prev, category]
//     );
//   };

//   const handleColorChange = (color) => {
//     if (color === 'reset') {
//       setSelectedColors([]);
//       return;
//     }
//     setSelectedColors(prev =>
//       prev.includes(color)
//         ? prev.filter(c => c !== color)
//         : [...prev, color]
//     );
//   };

//   return (
//     <div>
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-8">
//           {categoryType
//             ? `${categoryType.charAt(0).toUpperCase()}${categoryType.slice(1).toLowerCase()} Collection`
//             : 'Our Products'}
//         </h1>

//         <div className="flex flex-col md:flex-row gap-8">
//           {/* Filters */}
//           <div className="w-full md:w-1/4">
//             <FilterSection
//               categories={categoryTypes} // updated
//               colors={colors}
//               selectedCategories={selectedCategories}
//               selectedColors={selectedColors}
//               priceRange={priceRange}
//               onCategoryChange={handleCategoryChange}
//               onColorChange={handleColorChange}
//               onPriceChange={setPriceRange}
//               minPrice={minPrice}
//               maxPrice={maxPrice}
//             />
//           </div>

//           {/* Product Grid */}
//           <div className="w-full md:w-3/4">
//             <div className="mb-4 flex justify-between items-center">
//               <p className="text-gray-600">
//                 Showing {filteredProducts.length} of {products.length} products
//               </p>
//             </div>

//             {filteredProducts.length === 0 ? (
//               <div className="text-center py-12">
//                 <h3 className="text-xl font-medium text-gray-700 mb-2">No products found</h3>
//                 <p className="text-gray-500">Try adjusting your filters</p>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredProducts.map(product => (
//                   <ProductCard key={product.id} product={product} />
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default ProductListPage;





// import React, { useState, useEffect } from 'react';
// import ProductCard from './ProductCard';
// import FilterSection from '../../components/Filter/FilterSection';
// import Footer from '../../components/Footer/Footer';
// import { fetchCategories } from '../../Api/fetchcategories';
// import { getAllProducts } from '../../Api/fetchProducts'; // <-- import your API call
// import { colors } from '../../data/products'; // You can keep this if colors are still static

// const ProductListPage = ({ categoryType }) => {
//   const [allProducts, setAllProducts] = useState([]); // All products from backend
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [selectedColors, setSelectedColors] = useState([]);
//   const [priceRange, setPriceRange] = useState([0, 0]);
//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(0);
//   const [categoryTypes, setCategoryTypes] = useState([]);

//   useEffect(() => {
//     const loadData = async () => {
//       const categoriesData = await fetchCategories();
//       const matchedCategory = categoriesData.find(
//         cat => cat.code.toLowerCase() === categoryType?.toLowerCase()
//       );

//       let categoryId = null;
//       if (matchedCategory) {
//         setCategoryTypes(matchedCategory.categoryTypes);
//         setSelectedCategories(matchedCategory.categoryTypes.map(ct => ct.name));
//         categoryId = matchedCategory.id;
//       }

//       const productsData = await getAllProducts(categoryId); // use categoryId here
//       setAllProducts(productsData || []);
//     };

//     loadData();
//   }, [categoryType]);

//   useEffect(() => {
//     // Update price range when products are loaded
//     if (allProducts.length > 0) {
//       const min = Math.min(...allProducts.map(p => p.price));
//       const max = Math.max(...allProducts.map(p => p.price));
//       setMinPrice(min);
//       setMaxPrice(max);
//       setPriceRange([min, max]);
//     }
//   }, [allProducts]);

//   useEffect(() => {
//     let result = allProducts;

//     if (selectedCategories.length > 0) {
//       result = result.filter(product =>
//         selectedCategories.includes(product.category)
//       );
//     }

//     if (selectedColors.length > 0) {
//       result = result.filter(product =>
//         selectedColors.includes(product.color)
//       );
//     }

//     result = result.filter(
//       product => product.price >= priceRange[0] && product.price <= priceRange[1]
//     );

//     setFilteredProducts(result);
//   }, [allProducts, selectedCategories, selectedColors, priceRange]);

//   const handleCategoryChange = (category) => {
//     if (category === 'reset') {
//       setSelectedCategories([]);
//       return;
//     }
//     setSelectedCategories(prev =>
//       prev.includes(category)
//         ? prev.filter(c => c !== category)
//         : [...prev, category]
//     );
//   };

//   const handleColorChange = (color) => {
//     if (color === 'reset') {
//       setSelectedColors([]);
//       return;
//     }
//     setSelectedColors(prev =>
//       prev.includes(color)
//         ? prev.filter(c => c !== color)
//         : [...prev, color]
//     );
//   };

//   return (
//     <div>
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-8">
//           {categoryType
//             ? `${categoryType.charAt(0).toUpperCase()}${categoryType.slice(1).toLowerCase()} Collection`
//             : 'Our Products'}
//         </h1>

//         <div className="flex flex-col md:flex-row gap-8">
//           <div className="w-full md:w-1/4">
//             <FilterSection
//               categories={categoryTypes}
//               colors={colors}
//               selectedCategories={selectedCategories}
//               selectedColors={selectedColors}
//               priceRange={priceRange}
//               onCategoryChange={handleCategoryChange}
//               onColorChange={handleColorChange}
//               onPriceChange={setPriceRange}
//               minPrice={minPrice}
//               maxPrice={maxPrice}
//             />
//           </div>

//           <div className="w-full md:w-3/4">
//             <div className="mb-4 flex justify-between items-center">
//               <p className="text-gray-600">
//                 Showing {filteredProducts.length} of {allProducts.length} products
//               </p>
//             </div>

//             {filteredProducts.length === 0 ? (
//               <div className="text-center py-12">
//                 <h3 className="text-xl font-medium text-gray-700 mb-2">No products found</h3>
//                 <p className="text-gray-500">Try adjusting your filters</p>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredProducts.map(product => (
//                   <ProductCard key={product.id} product={product} />
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default ProductListPage;




// import React, { useState, useEffect } from 'react';
// import ProductCard from './ProductCard';
// import FilterSection from '../../components/Filter/FilterSection';
// import Footer from '../../components/Footer/Footer';
// import { fetchCategories } from '../../Api/fetchcategories';
// import { getProductsByCategory } from '../../Api/fetchProducts'; // ✅ updated import
// import { colors } from '../../data/products'; // keep this if colors are static

// const ProductListPage = ({ categoryType }) => {
//   const [allProducts, setAllProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [selectedColors, setSelectedColors] = useState([]);
//   const [priceRange, setPriceRange] = useState([0, 0]);
//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(0);
//   const [categoryTypes, setCategoryTypes] = useState([]);

//   useEffect(() => {
//     const loadData = async () => {
//       const categoriesData = await fetchCategories();
//       const matchedCategory = categoriesData.find(
//         cat => cat.code.toLowerCase() === categoryType?.toLowerCase()
//       );

//       if (matchedCategory) {
//         setCategoryTypes(matchedCategory.categoryTypes);
//         setSelectedCategories(matchedCategory.categoryTypes.map(ct => ct.name));

//         // ✅ Fetch products using category name
//         const productsData = await getProductsByCategory(matchedCategory.name);
//         setAllProducts(productsData || []);
//         console.log(productsData)
//       }
//     };

//     loadData();
//   }, [categoryType]);

//   useEffect(() => {
//     if (allProducts.length > 0) {
//       const min = Math.min(...allProducts.map(p => p.price));
//       const max = Math.max(...allProducts.map(p => p.price));
//       setMinPrice(min);
//       setMaxPrice(max);
//       setPriceRange([min, max]);
//     }
//   }, [allProducts]);

//   useEffect(() => {
//     let result = allProducts;

//     if (selectedCategories.length > 0) {
//       result = result.filter(product =>
//         selectedCategories.includes(product.category)
//       );
//     }

//     if (selectedColors.length > 0) {
//       result = result.filter(product =>
//         selectedColors.includes(product.color)
//       );
//     }

//     result = result.filter(
//       product => product.price >= priceRange[0] && product.price <= priceRange[1]
//     );

//     setFilteredProducts(result);
//   }, [allProducts, selectedCategories, selectedColors, priceRange]);

//   const handleCategoryChange = (category) => {
//     if (category === 'reset') {
//       setSelectedCategories([]);
//       return;
//     }
//     setSelectedCategories(prev =>
//       prev.includes(category)
//         ? prev.filter(c => c !== category)
//         : [...prev, category]
//     );
//   };

//   const handleColorChange = (color) => {
//     if (color === 'reset') {
//       setSelectedColors([]);
//       return;
//     }
//     setSelectedColors(prev =>
//       prev.includes(color)
//         ? prev.filter(c => c !== color)
//         : [...prev, color]
//     );
//   };

//   return (
//     <div>
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-8">
//           {categoryType
//             ? `${categoryType.charAt(0).toUpperCase()}${categoryType.slice(1).toLowerCase()} Collection`
//             : 'Our Products'}
//         </h1>

//         <div className="flex flex-col md:flex-row gap-8">
//           {/* Filters */}
//           <div className="w-full md:w-1/4">
//             <FilterSection
//               categories={categoryTypes}
//               colors={colors}
//               selectedCategories={selectedCategories}
//               selectedColors={selectedColors}
//               priceRange={priceRange}
//               onCategoryChange={handleCategoryChange}
//               onColorChange={handleColorChange}
//               onPriceChange={setPriceRange}
//               minPrice={minPrice}
//               maxPrice={maxPrice}
//             />
//           </div>

//           {/* Products Grid */}
//           <div className="w-full md:w-3/4">
//             <div className="mb-4 flex justify-between items-center">
//               <p className="text-gray-600">
//                 Showing {filteredProducts.length} of {allProducts.length} products
//               </p>
//             </div>

//             {filteredProducts.length === 0 ? (
//               <div className="text-center py-12">
//                 <h3 className="text-xl font-medium text-gray-700 mb-2">No products found</h3>
//                 <p className="text-gray-500">Try adjusting your filters</p>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredProducts.map(product => (
//                   <ProductCard key={product.id} product={product} />
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default ProductListPage;
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import FilterSection from '../../components/Filter/FilterSection';
import Footer from '../../components/Footer/Footer';
import { fetchCategories } from '../../Api/fetchcategories';
import { getProductsByCategory } from '../../Api/fetchProducts';
import { colors } from '../../data/products'; // static list of colors

const ProductListPage = ({ categoryType }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [categoryTypes, setCategoryTypes] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const categoriesData = await fetchCategories();
      const matchedCategory = categoriesData.find(
        cat => cat.code.toLowerCase() === categoryType?.toLowerCase()
      );

      if (matchedCategory) {
        setCategoryTypes(matchedCategory.categoryTypes);
        setSelectedCategories(matchedCategory.categoryTypes.map(ct => ct.name));

        const productsData = await getProductsByCategory(matchedCategory.name);
        setAllProducts(productsData || []);
        console.log(productsData);
      }
    };

    loadData();
  }, [categoryType]);

  useEffect(() => {
    if (allProducts.length > 0) {
      const min = Math.min(...allProducts.map(p => p.price));
      const max = Math.max(...allProducts.map(p => p.price));
      setMinPrice(min);
      setMaxPrice(max);
      setPriceRange([min, max]);
    }
  }, [allProducts]);

  useEffect(() => {
    let result = allProducts;

    if (selectedCategories.length > 0) {
      result = result.filter(product =>
        selectedCategories.includes(product.categoryTypeName)
      );
    }

    if (selectedColors.length > 0) {
      result = result.filter(product =>
        selectedColors.includes(product.color)
      );
    }

    result = result.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    setFilteredProducts(result);
  }, [allProducts, selectedCategories, selectedColors, priceRange]);

  const handleCategoryChange = (category) => {
    if (category === 'reset') {
      setSelectedCategories([]);
      return;
    }
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleColorChange = (color) => {
    if (color === 'reset') {
      setSelectedColors([]);
      return;
    }
    setSelectedColors(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          {categoryType
            ? `${categoryType.charAt(0).toUpperCase()}${categoryType.slice(1).toLowerCase()} Collection`
            : 'Our Products'}
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters */}
          <div className="w-full md:w-1/4">
            <FilterSection
              categories={categoryTypes}
              colors={colors}
              selectedCategories={selectedCategories}
              selectedColors={selectedColors}
              priceRange={priceRange}
              onCategoryChange={handleCategoryChange}
              onColorChange={handleColorChange}
              onPriceChange={setPriceRange}
              minPrice={minPrice}
              maxPrice={maxPrice}
            />
          </div>

          {/* Products Grid */}
          <div className="w-full md:w-3/4">
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-600">
                Showing {filteredProducts.length} of {allProducts.length} products
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-700 mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductListPage;
