
import React, { useState, useEffect } from "react";
import axios from "axios";

const initialProductForm = {
  name: "",
  description: "",
  price: "",
  brand: "",
  isNewArrival: false,
  rating: "",
  categoryId: "",
  categoryTypeId: "",
  thumbnail: "",
  slug: "",
  variants: [],
  productResources: [],
};

const AdminProductPage = () => {
  const [products, setProducts] = useState([]);
  const [productForm, setProductForm] = useState(initialProductForm);
  const [variantForm, setVariantForm] = useState({
    color: "",
    size: "",
    stockQuantity: "",
  });
  const [resourceForm, setResourceForm] = useState({
    name: "",
    url: "",
    type: "",
    isPrimary: false,
  });
  const [categoryFilter, setCategoryFilter] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8081/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Create or Update Product
  const handleSubmit = async () => {
    try {
      if (editingId) {
        await axios.put(
          `http://localhost:8081/api/products/${editingId}`,
          productForm
        );
      } else {
        await axios.post("http://localhost:8081/api/products", productForm);
      }
      fetchProducts();
      resetForm();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  // Load product by ID for editing
  const handleEdit = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8081/api/products/${id}`);
      setProductForm(res.data);
      setEditingId(id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Failed to load product:", err);
    }
  };

  // Filter products by category
  const filterByCategory = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8081/api/products/category/${categoryFilter}`
      );
      setProducts(res.data);
    } catch (error) {
      console.error("Error filtering products:", error);
    }
  };

  const resetForm = () => {
    setProductForm(initialProductForm);
    setEditingId(null);
  };

  // Handling form inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductForm({
      ...productForm,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Variants and Resources
  const addVariant = () => {
    setProductForm({
      ...productForm,
      variants: [...productForm.variants, variantForm],
    });
    setVariantForm({ color: "", size: "", stockQuantity: "" });
  };

  const addResource = () => {
    setProductForm({
      ...productForm,
      productResources: [...productForm.productResources, resourceForm],
    });
    setResourceForm({ name: "", url: "", type: "", isPrimary: false });
  };

  const removeVariant = (index) => {
    const updated = [...productForm.variants];
    updated.splice(index, 1);
    setProductForm({ ...productForm, variants: updated });
  };

  const removeResource = (index) => {
    const updated = [...productForm.productResources];
    updated.splice(index, 1);
    setProductForm({ ...productForm, productResources: updated });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        {editingId ? "Update Product" : "Create New Product"}
      </h2>

      {/* Product Form */}
      <div className="grid grid-cols-2 gap-4 mb-6 bg-white p-6 rounded-2xl shadow transition duration-300 hover:shadow-lg">
        <input
          name="name"
          placeholder="Product Name"
          value={productForm.name}
          onChange={handleChange}
          className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="brand"
          placeholder="Brand"
          value={productForm.brand}
          onChange={handleChange}
          className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={productForm.price}
          onChange={handleChange}
          className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="rating"
          type="number"
          step="0.1"
          placeholder="Rating"
          value={productForm.rating}
          onChange={handleChange}
          className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="slug"
          placeholder="Slug (unique)"
          value={productForm.slug}
          onChange={handleChange}
          className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="thumbnail"
          placeholder="Thumbnail URL"
          value={productForm.thumbnail}
          onChange={handleChange}
          className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="categoryId"
          placeholder="Category ID"
          value={productForm.categoryId}
          onChange={handleChange}
          className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="categoryTypeId"
          placeholder="Category Type ID"
          value={productForm.categoryTypeId}
          onChange={handleChange}
          className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <textarea
        name="description"
        placeholder="Description"
        value={productForm.description}
        onChange={handleChange}
        className="border p-3 w-full mb-4 rounded-lg focus:ring-2 focus:ring-blue-500"
      />

      <label className="flex items-center gap-2 mb-6">
        <input
          type="checkbox"
          name="isNewArrival"
          checked={productForm.isNewArrival}
          onChange={handleChange}
        />
        <span>New Arrival</span>
      </label>

      {/* Variant Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Add Product Variant</h3>
        <div className="flex gap-2 flex-wrap">
          <input
            name="color"
            placeholder="Color"
            value={variantForm.color}
            onChange={(e) =>
              setVariantForm({ ...variantForm, color: e.target.value })
            }
            className="border p-2 rounded-lg"
          />
          <input
            name="size"
            placeholder="Size"
            value={variantForm.size}
            onChange={(e) =>
              setVariantForm({ ...variantForm, size: e.target.value })
            }
            className="border p-2 rounded-lg"
          />
          <input
            name="stockQuantity"
            type="number"
            placeholder="Stock"
            value={variantForm.stockQuantity}
            onChange={(e) =>
              setVariantForm({
                ...variantForm,
                stockQuantity: e.target.value,
              })
            }
            className="border p-2 rounded-lg"
          />
          <button
            onClick={addVariant}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Add
          </button>
        </div>
        <ul className="mt-2">
          {productForm.variants.map((v, i) => (
            <li
              key={i}
              className="text-sm flex justify-between items-center border p-2 mt-2 rounded-lg transition hover:bg-gray-50"
            >
              {v.color} | {v.size} | Stock: {v.stockQuantity}
              <button
                onClick={() => removeVariant(i)}
                className="text-red-600 hover:underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Resource Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Add Product Resource</h3>
        <div className="flex gap-2 flex-wrap">
          <input
            name="name"
            placeholder="Name"
            value={resourceForm.name}
            onChange={(e) =>
              setResourceForm({ ...resourceForm, name: e.target.value })
            }
            className="border p-2 rounded-lg"
          />
          <input
            name="url"
            placeholder="URL"
            value={resourceForm.url}
            onChange={(e) =>
              setResourceForm({ ...resourceForm, url: e.target.value })
            }
            className="border p-2 rounded-lg"
          />
          <input
            name="type"
            placeholder="Type (e.g., image)"
            value={resourceForm.type}
            onChange={(e) =>
              setResourceForm({ ...resourceForm, type: e.target.value })
            }
            className="border p-2 rounded-lg"
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={resourceForm.isPrimary}
              onChange={(e) =>
                setResourceForm({ ...resourceForm, isPrimary: e.target.checked })
              }
            />
            <span>Primary</span>
          </label>
          <button
            onClick={addResource}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Add
          </button>
        </div>
        <ul className="mt-2">
          {productForm.productResources.map((r, i) => (
            <li
              key={i}
              className="text-sm flex justify-between items-center border p-2 mt-2 rounded-lg transition hover:bg-gray-50"
            >
              {r.name} ({r.type}) - {r.url}{" "}
              {r.isPrimary && (
                <strong className="text-green-700 ml-2">Primary</strong>
              )}
              <button
                onClick={() => removeResource(i)}
                className="text-red-600 hover:underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Submit / Cancel */}
      <div className="flex gap-4 mb-10">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {editingId ? "Update Product" : "Create Product"}
        </button>
        {editingId && (
          <button
            onClick={resetForm}
            className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Filter by Category */}
      <div className="mt-10 bg-white p-6 rounded-2xl shadow transition hover:shadow-lg">
        <h3 className="text-lg font-semibold mb-3">Filter by Category Name</h3>
        <div className="flex gap-2">
          <input
            placeholder="Category name (e.g., Kids)"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border p-2 rounded-lg"
          />
          <button
            onClick={filterByCategory}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Filter
          </button>
        </div>
      </div>

     

      {/* Product List */}
<h2 className="text-2xl font-bold mt-10 mb-4">All Products</h2>
<ul className="space-y-4">
  {products.map((p) => (
    <li key={p.id} className="border p-4 rounded flex gap-4 items-start">
      {/* Thumbnail */}
      {p.thumbnail && (
        <img
          src={p.thumbnail}
          alt={p.name}
          className="w-20 h-20 object-cover rounded border"
        />
      )}

      {/* Product Info */}
      <div className="flex-1">
        <div className="font-semibold text-lg">
          {p.name} ({p.slug})
        </div>
        <div className="text-sm text-gray-700">
          {p.brand} - ₹{p.price} - ⭐ {p.rating}
        </div>
        <div className="text-sm text-gray-600">
          Category: {p.categoryName} / {p.categoryTypeName}
        </div>
        <div className="text-gray-800 mt-1">{p.description}</div>

        <button
          onClick={() => handleEdit(p.id)}
          className="mt-2 text-blue-600 underline"
        >
          Edit
        </button>
      </div>
    </li>
  ))}
</ul>

    </div>
  );
};

export default AdminProductPage;
