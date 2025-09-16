
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../Api/fetchProducts';
import { useCart } from '../../context/CartContext';
import Footer from '../../components/Footer/Footer';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [variantStock, setVariantStock] = useState(null);
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    const loadProductDetails = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);

        if (data?.variants?.length > 0) {
          setSelectedColor(data.variants[0].color);
          setSelectedSize(data.variants[0].size);
          setVariantStock(data.variants[0].stockQuantity);
        }
      } catch (err) {
        console.error('Failed to load product:', err);
      }
    };

    loadProductDetails();
  }, [id]);

  const handleColorChange = (color) => {
    setSelectedColor(color);
    const match = product.variants.find(
      (v) => v.color === color && v.size === selectedSize
    );
    setVariantStock(match ? match.stockQuantity : null);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    const match = product.variants.find(
      (v) => v.color === selectedColor && v.size === size
    );
    setVariantStock(match ? match.stockQuantity : null);
  };

  const getAvailableSizes = () => {
    return product.variants
      .filter((v) => v.color === selectedColor)
      .map((v) => v.size);
  };

  const getAvailableColors = () => {
    return [...new Set(product.variants.map((v) => v.color))];
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert('Please select both color and size!');
      return;
    }

    const variant = product.variants.find(
      (v) => v.color === selectedColor && v.size === selectedSize
    );

    const cartItem = {
      productId: product.id,
      productVariantId: variant?.id,
      name: product.name,
      price: product.price,
      image: product.productResources?.find((r) => r.isPrimary)?.url || '',
      color: selectedColor,
      size: selectedSize,
      quantity: 1,
      stockQuantity: variant?.stockQuantity,
    };

    addToCart(cartItem);
    alert('Product added to cart!');
  };

  const handleImageClick = (imageUrl) => {
    setActiveImage(imageUrl);
  };

  if (!product) {
    return <div className="text-center py-12 text-lg">Loading product...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Content */}
      <main className="flex-grow container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Product Images */}
          <div className="md:w-1/2">
            <div className="w-full mb-4">
              <img
                src={
                  activeImage ||
                  product.productResources?.find((r) => r.isPrimary)?.url ||
                  'https://via.placeholder.com/400'
                }
                alt={product.name}
                className="w-full max-w-md mx-auto rounded-xl shadow-md hover:scale-105 transition duration-300"
              />
            </div>
            <div className="flex gap-4">
              {product.productResources?.map((img) => (
                <img
                  key={img.id}
                  src={img.url}
                  alt={img.name}
                  className="w-24 h-32 object-cover rounded-lg border cursor-pointer hover:scale-105 transition duration-300"
                  onClick={() => handleImageClick(img.url)}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="md:w-1/2 space-y-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-gray-600 text-lg">Brand: {product.brand}</p>
            <p className="text-xl font-semibold text-blue-600">₹ {product.price}</p>
            <p className="text-yellow-500">Rating: {product.rating} ★</p>
            <p className="text-gray-700">{product.description}</p>
            <p className="text-sm text-gray-500">
              Category: {product.categoryName} / {product.categoryTypeName}
            </p>

            {/* Variant Selection */}
            <div className="mt-4 space-y-2">
              <div>
                <label className="block text-sm font-medium mb-1">Color:</label>
                <select
                  className="border px-3 py-2 rounded-md w-full"
                  value={selectedColor}
                  onChange={(e) => handleColorChange(e.target.value)}
                >
                  {getAvailableColors().map((color, idx) => (
                    <option key={idx} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Size:</label>
                <select
                  className="border px-3 py-2 rounded-md w-full"
                  value={selectedSize}
                  onChange={(e) => handleSizeChange(e.target.value)}
                >
                  {getAvailableSizes().map((size, idx) => (
                    <option key={idx} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              {variantStock !== null && (
                <p className="text-green-600 text-sm">In Stock: {variantStock}</p>
              )}
            </div>

            <button
              className="mt-6 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
              onClick={handleAddToCart}
              disabled={variantStock === 0}
            >
              {variantStock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </main>

      {/* Footer always at bottom */}
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
