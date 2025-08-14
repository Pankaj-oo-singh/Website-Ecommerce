import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialProductForm = {
  name: '',
  description: '',
  price: '',
  brand: '',
  isNewArrival: false,
  rating: '',
  categoryId: '',
  categoryTypeId: '',
  thumbnail: '',
  slug: '',
  variants: [],
  productResources: [],
};

const AdminProductPage = () => {
  const [products, setProducts] = useState([]);
  const [productForm, setProductForm] = useState(initialProductForm);
  const [variantForm, setVariantForm] = useState({ color: '', size: '', stockQuantity: '' });
  const [resourceForm, setResourceForm] = useState({ name: '', url: '', type: '', isPrimary: false });
  const [categoryFilter, setCategoryFilter] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Fetch all products
  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:8081/api/products');
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Create or Update Product
  const handleSubmit = async () => {
    try {
      if (editingId) {
        await axios.put(`http://localhost:8081/api/products/${editingId}`, productForm);
      } else {
        await axios.post('http://localhost:8081/api/products', productForm);
      }
      fetchProducts();
      resetForm();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  // Load product by ID for editing
  const handleEdit = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8081/api/products/${id}`);
      setProductForm(res.data);
      setEditingId(id);
      window.scrollTo(0, 0);
    } catch (err) {
      console.error('Failed to load product:', err);
    }
  };

  // Filter products by category
  const filterByCategory = async () => {
    try {
      const res = await axios.get(`http://localhost:8081/api/products/category/${categoryFilter}`);
      setProducts(res.data);
    } catch (error) {
      console.error('Error filtering products:', error);
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
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Variants and Resources
  const addVariant = () => {
    setProductForm({
      ...productForm,
      variants: [...productForm.variants, variantForm],
    });
    setVariantForm({ color: '', size: '', stockQuantity: '' });
  };

  const addResource = () => {
    setProductForm({
      ...productForm,
      productResources: [...productForm.productResources, resourceForm],
    });
    setResourceForm({ name: '', url: '', type: '', isPrimary: false });
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
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{editingId ? 'Edit Product' : 'Create Product'}</h2>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <input name="name" placeholder="Product Name" value={productForm.name} onChange={handleChange} className="border p-2" />
        <input name="brand" placeholder="Brand" value={productForm.brand} onChange={handleChange} className="border p-2" />
        <input name="price" type="number" placeholder="Price" value={productForm.price} onChange={handleChange} className="border p-2" />
        <input name="rating" type="number" step="0.1" placeholder="Rating" value={productForm.rating} onChange={handleChange} className="border p-2" />
        <input name="slug" placeholder="Slug (unique)" value={productForm.slug} onChange={handleChange} className="border p-2" />
        <input name="thumbnail" placeholder="Thumbnail URL" value={productForm.thumbnail} onChange={handleChange} className="border p-2" />
        <input name="categoryId" placeholder="Category ID" value={productForm.categoryId} onChange={handleChange} className="border p-2" />
        <input name="categoryTypeId" placeholder="Category Type ID" value={productForm.categoryTypeId} onChange={handleChange} className="border p-2" />
      </div>

      <textarea name="description" placeholder="Description" value={productForm.description} onChange={handleChange} className="border p-2 w-full mb-2" />

      <label className="flex items-center gap-2 mb-4">
        <input type="checkbox" name="isNewArrival" checked={productForm.isNewArrival} onChange={handleChange} />
        New Arrival
      </label>

      {/* Variant Section */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Add Product Variant</h3>
        <div className="flex gap-2">
          <input name="color" placeholder="Color" value={variantForm.color} onChange={(e) => setVariantForm({ ...variantForm, color: e.target.value })} className="border p-2" />
          <input name="size" placeholder="Size" value={variantForm.size} onChange={(e) => setVariantForm({ ...variantForm, size: e.target.value })} className="border p-2" />
          <input name="stockQuantity" type="number" placeholder="Stock" value={variantForm.stockQuantity} onChange={(e) => setVariantForm({ ...variantForm, stockQuantity: e.target.value })} className="border p-2" />
          <button onClick={addVariant} className="bg-green-600 text-white px-4 py-2 rounded">Add</button>
        </div>
        <ul className="mt-2">
          {productForm.variants.map((v, i) => (
            <li key={i} className="text-sm flex justify-between items-center border p-1 mt-1">
              {v.color} | {v.size} | Stock: {v.stockQuantity}
              <button onClick={() => removeVariant(i)} className="text-red-600">Remove</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Resource Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Add Product Resource</h3>
        <div className="flex gap-2 flex-wrap">
          <input name="name" placeholder="Name" value={resourceForm.name} onChange={(e) => setResourceForm({ ...resourceForm, name: e.target.value })} className="border p-2" />
          <input name="url" placeholder="URL" value={resourceForm.url} onChange={(e) => setResourceForm({ ...resourceForm, url: e.target.value })} className="border p-2" />
          <input name="type" placeholder="Type (e.g., image)" value={resourceForm.type} onChange={(e) => setResourceForm({ ...resourceForm, type: e.target.value })} className="border p-2" />
          <label className="flex items-center gap-1">
            <input type="checkbox" checked={resourceForm.isPrimary} onChange={(e) => setResourceForm({ ...resourceForm, isPrimary: e.target.checked })} />
            Primary
          </label>
          <button onClick={addResource} className="bg-green-600 text-white px-4 py-2 rounded">Add</button>
        </div>
        <ul className="mt-2">
          {productForm.productResources.map((r, i) => (
            <li key={i} className="text-sm flex justify-between items-center border p-1 mt-1">
              {r.name} ({r.type}) - {r.url} {r.isPrimary && <strong className="text-green-700 ml-2">Primary</strong>}
              <button onClick={() => removeResource(i)} className="text-red-600">Remove</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Submit / Cancel */}
      <div className="flex gap-4">
        <button onClick={handleSubmit} className="bg-blue-600 text-white px-6 py-2 rounded">
          {editingId ? 'Update Product' : 'Create Product'}
        </button>
        {editingId && (
          <button onClick={resetForm} className="bg-gray-400 text-white px-6 py-2 rounded">
            Cancel
          </button>
        )}
      </div>

      {/* Filter by Category */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-2">Filter by Category Name</h3>
        <div className="flex gap-2">
          <input
            placeholder="Category name (e.g., Kids)"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border p-2"
          />
          <button onClick={filterByCategory} className="bg-purple-600 text-white px-4 py-2 rounded">
            Filter
          </button>
        </div>
      </div>

      {/* Product List */}
      <h2 className="text-2xl font-bold mt-10 mb-4">All Products</h2>
      <ul className="space-y-4">
        {products.map((p) => (
          <li key={p.id} className="border p-4 rounded">
            <div className="font-semibold text-lg">{p.name} ({p.slug})</div>
            <div>{p.brand} - ₹{p.price} - ⭐ {p.rating}</div>
            <div>Category: {p.categoryName} / {p.categoryTypeName}</div>
            <div>{p.description}</div>
            <button onClick={() => handleEdit(p.id)} className="mt-2 text-blue-600 underline">
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminProductPage;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const initialProductForm = {
//   name: '',
//   description: '',
//   price: '',
//   brand: '',
//   isNewArrival: false,
//   rating: '',
//   categoryId: '',
//   categoryTypeId: '',
//   thumbnail: '',
//   slug: '',
//   variants: [],
//   productResources: [],
// };

// const AdminProductPage = () => {
//   const [user, setUser] = useState(null);
//   const [loadingUser, setLoadingUser] = useState(true);
//   const [hasAccess, setHasAccess] = useState(false);

//   const [products, setProducts] = useState([]);
//   const [productForm, setProductForm] = useState(initialProductForm);
//   const [variantForm, setVariantForm] = useState({ color: '', size: '', stockQuantity: '' });
//   const [resourceForm, setResourceForm] = useState({ name: '', url: '', type: '', isPrimary: false });
//   const [categoryFilter, setCategoryFilter] = useState('');
//   const [editingId, setEditingId] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get('http://localhost:8081/api/user/profile', {
//           withCredentials: true,
//         });
//         setUser(res.data);
//         const isAdmin = Array.isArray(res.data.roles)
//           ? res.data.roles.some(role => role.name === 'ADMIN' || role === 'ADMIN')
//           : false;
//         setHasAccess(isAdmin);
//       } catch (error) {
//         console.error('Failed to fetch user profile:', error);
//       } finally {
//         setLoadingUser(false);
//       }
//     };
//     fetchUser();
//   }, []);

//   useEffect(() => {
//     if (hasAccess) {
//       fetchProducts();
//     }
//   }, [hasAccess]);

//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get('http://localhost:8081/api/products');
//       setProducts(res.data);
//     } catch (error) {
//       console.error('Failed to fetch products:', error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setProductForm({
//       ...productForm,
//       [name]: type === 'checkbox' ? checked : value,
//     });
//   };

//   const handleSubmit = async () => {
//     try {
//       if (editingId) {
//         await axios.put(`http://localhost:8081/api/products/${editingId}`, productForm);
//       } else {
//         await axios.post('http://localhost:8081/api/products', productForm);
//       }
//       fetchProducts();
//       resetForm();
//     } catch (error) {
//       console.error('Error saving product:', error);
//     }
//   };

//   const resetForm = () => {
//     setProductForm(initialProductForm);
//     setEditingId(null);
//   };

//   const handleEdit = async (id) => {
//     try {
//       const res = await axios.get(`http://localhost:8081/api/products/${id}`);
//       setProductForm(res.data);
//       setEditingId(id);
//       window.scrollTo(0, 0);
//     } catch (err) {
//       console.error('Failed to load product:', err);
//     }
//   };

//   const filterByCategory = async () => {
//     try {
//       const res = await axios.get(`http://localhost:8081/api/products/category/${categoryFilter}`);
//       setProducts(res.data);
//     } catch (error) {
//       console.error('Error filtering products:', error);
//     }
//   };

//   const addVariant = () => {
//     setProductForm({
//       ...productForm,
//       variants: [...productForm.variants, variantForm],
//     });
//     setVariantForm({ color: '', size: '', stockQuantity: '' });
//   };

//   const removeVariant = (index) => {
//     const updated = [...productForm.variants];
//     updated.splice(index, 1);
//     setProductForm({ ...productForm, variants: updated });
//   };

//   const addResource = () => {
//     setProductForm({
//       ...productForm,
//       productResources: [...productForm.productResources, resourceForm],
//     });
//     setResourceForm({ name: '', url: '', type: '', isPrimary: false });
//   };

//   const removeResource = (index) => {
//     const updated = [...productForm.productResources];
//     updated.splice(index, 1);
//     setProductForm({ ...productForm, productResources: updated });
//   };

//   if (loadingUser) return <div className="p-6">Loading user...</div>;
//   if (!hasAccess) return <div className="p-6 text-red-600 font-semibold">Access Denied: Admins only</div>;

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">{editingId ? 'Edit Product' : 'Create Product'}</h2>

//       <div className="grid grid-cols-2 gap-4 mb-4">
//         <input name="name" placeholder="Product Name" value={productForm.name} onChange={handleChange} className="border p-2" />
//         <input name="brand" placeholder="Brand" value={productForm.brand} onChange={handleChange} className="border p-2" />
//         <input name="price" type="number" placeholder="Price" value={productForm.price} onChange={handleChange} className="border p-2" />
//         <input name="rating" type="number" step="0.1" placeholder="Rating" value={productForm.rating} onChange={handleChange} className="border p-2" />
//         <input name="slug" placeholder="Slug" value={productForm.slug} onChange={handleChange} className="border p-2" />
//         <input name="thumbnail" placeholder="Thumbnail URL" value={productForm.thumbnail} onChange={handleChange} className="border p-2" />
//         <input name="categoryId" placeholder="Category ID" value={productForm.categoryId} onChange={handleChange} className="border p-2" />
//         <input name="categoryTypeId" placeholder="Category Type ID" value={productForm.categoryTypeId} onChange={handleChange} className="border p-2" />
//       </div>

//       <textarea name="description" placeholder="Description" value={productForm.description} onChange={handleChange} className="border p-2 w-full mb-2" />

//       <label className="flex items-center gap-2 mb-4">
//         <input type="checkbox" name="isNewArrival" checked={productForm.isNewArrival} onChange={handleChange} />
//         New Arrival
//       </label>

//       <div className="mb-4">
//         <h3 className="text-lg font-semibold">Product Variants</h3>
//         <div className="flex gap-2">
//           <input name="color" placeholder="Color" value={variantForm.color} onChange={(e) => setVariantForm({ ...variantForm, color: e.target.value })} className="border p-2" />
//           <input name="size" placeholder="Size" value={variantForm.size} onChange={(e) => setVariantForm({ ...variantForm, size: e.target.value })} className="border p-2" />
//           <input name="stockQuantity" type="number" placeholder="Stock" value={variantForm.stockQuantity} onChange={(e) => setVariantForm({ ...variantForm, stockQuantity: e.target.value })} className="border p-2" />
//           <button onClick={addVariant} className="bg-green-600 text-white px-4 py-2 rounded">Add</button>
//         </div>
//         <ul className="mt-2">
//           {productForm.variants.map((v, i) => (
//             <li key={i} className="text-sm flex justify-between items-center border p-1 mt-1">
//               {v.color} | {v.size} | Stock: {v.stockQuantity}
//               <button onClick={() => removeVariant(i)} className="text-red-600">Remove</button>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="mb-6">
//         <h3 className="text-lg font-semibold">Product Resources</h3>
//         <div className="flex gap-2 flex-wrap">
//           <input name="name" placeholder="Name" value={resourceForm.name} onChange={(e) => setResourceForm({ ...resourceForm, name: e.target.value })} className="border p-2" />
//           <input name="url" placeholder="URL" value={resourceForm.url} onChange={(e) => setResourceForm({ ...resourceForm, url: e.target.value })} className="border p-2" />
//           <input name="type" placeholder="Type" value={resourceForm.type} onChange={(e) => setResourceForm({ ...resourceForm, type: e.target.value })} className="border p-2" />
//           <label className="flex items-center gap-1">
//             <input type="checkbox" checked={resourceForm.isPrimary} onChange={(e) => setResourceForm({ ...resourceForm, isPrimary: e.target.checked })} />
//             Primary
//           </label>
//           <button onClick={addResource} className="bg-green-600 text-white px-4 py-2 rounded">Add</button>
//         </div>
//         <ul className="mt-2">
//           {productForm.productResources.map((r, i) => (
//             <li key={i} className="text-sm flex justify-between items-center border p-1 mt-1">
//               {r.name} ({r.type}) - {r.url} {r.isPrimary && <strong className="text-green-700 ml-2">Primary</strong>}
//               <button onClick={() => removeResource(i)} className="text-red-600">Remove</button>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="flex gap-4">
//         <button onClick={handleSubmit} className="bg-blue-600 text-white px-6 py-2 rounded">
//           {editingId ? 'Update Product' : 'Create Product'}
//         </button>
//         {editingId && (
//           <button onClick={resetForm} className="bg-gray-400 text-white px-6 py-2 rounded">
//             Cancel
//           </button>
//         )}
//       </div>

//       <div className="mt-10">
//         <h3 className="text-lg font-semibold mb-2">Filter by Category</h3>
//         <div className="flex gap-2">
//           <input
//             placeholder="Category name"
//             value={categoryFilter}
//             onChange={(e) => setCategoryFilter(e.target.value)}
//             className="border p-2"
//           />
//           <button onClick={filterByCategory} className="bg-purple-600 text-white px-4 py-2 rounded">
//             Filter
//           </button>
//         </div>
//       </div>

//       <h2 className="text-2xl font-bold mt-10 mb-4">All Products</h2>
//       <ul className="space-y-4">
//         {products.map((p) => (
//           <li key={p.id} className="border p-4 rounded">
//             <div className="font-semibold text-lg">{p.name} ({p.slug})</div>
//             <div>{p.brand} - ₹{p.price} - ⭐ {p.rating}</div>
//             <div>Category: {p.categoryName} / {p.categoryTypeName}</div>
//             <div>{p.description}</div>
//             <button onClick={() => handleEdit(p.id)} className="mt-2 text-blue-600 underline">
//               Edit
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AdminProductPage;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const initialProductForm = {
//   name: '',
//   description: '',
//   price: '',
//   brand: '',
//   isNewArrival: false,
//   rating: '',
//   categoryId: '',
//   categoryTypeId: '',
//   thumbnail: '',
//   slug: '',
//   variants: [],           // Check if your backend expects 'variants' or 'productVariants'
//   productResources: [],
// };

// const AdminProductPage = () => {
//   const [user, setUser] = useState(null);
//   const [loadingUser, setLoadingUser] = useState(true);
//   const [hasAccess, setHasAccess] = useState(false);

//   const [products, setProducts] = useState([]);
//   const [productForm, setProductForm] = useState(initialProductForm);
//   const [variantForm, setVariantForm] = useState({ color: '', size: '', stockQuantity: '' });
//   const [resourceForm, setResourceForm] = useState({ name: '', url: '', type: '', isPrimary: false });
//   const [categoryFilter, setCategoryFilter] = useState('');
//   const [editingId, setEditingId] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get('http://localhost:8081/api/user/profile', {
//           withCredentials: true,
//         });
//         setUser(res.data);
//         const roles = res.data.roles || [];
//         const isAdmin = roles.some(role => {
//           if (typeof role === 'string') return role === 'ADMIN';
//           if (typeof role === 'object' && role !== null) return role.name === 'ADMIN';
//           return false;
//         });
//         setHasAccess(isAdmin);
//       } catch (error) {
//         console.error('Failed to fetch user profile:', error);
//       } finally {
//         setLoadingUser(false);
//       }
//     };
//     fetchUser();
//   }, []);

//   useEffect(() => {
//     if (hasAccess) {
//       fetchProducts();
//     }
//   }, [hasAccess]);

//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get('http://localhost:8081/api/products', {
//         withCredentials: true,
//       });
//       setProducts(res.data);
//     } catch (error) {
//       console.error('Failed to fetch products:', error);
//     }
//   };

//   const filterByCategory = async () => {
//     if (!categoryFilter.trim()) {
//       fetchProducts();  // reset filter if empty
//       return;
//     }
//     try {
//       const res = await axios.get(`http://localhost:8081/api/products/category/${categoryFilter}`, {
//         withCredentials: true,
//       });
//       setProducts(res.data);
//     } catch (error) {
//       console.error('Error filtering products:', error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setProductForm({
//       ...productForm,
//       [name]: type === 'checkbox' ? checked : value,
//     });
//   };

//   const handleSubmit = async () => {
//     try {
//       // convert numeric fields to numbers (empty string to null)
//       const dataToSend = {
//         ...productForm,
//         price: productForm.price ? Number(productForm.price) : null,
//         rating: productForm.rating ? parseFloat(productForm.rating) : null,
//         variants: productForm.variants.map(v => ({
//           ...v,
//           stockQuantity: v.stockQuantity ? Number(v.stockQuantity) : 0,
//         })),
//       };

//       if (editingId) {
//         await axios.put(`http://localhost:8081/api/products/${editingId}`, dataToSend, {
//           withCredentials: true,
//         });
//       } else {
//         await axios.post('http://localhost:8081/api/products', dataToSend, {
//           withCredentials: true,
//         });
//       }
//       fetchProducts();
//       resetForm();
//     } catch (error) {
//       console.error('Error saving product:', error);
//     }
//   };

//   const resetForm = () => {
//     setProductForm(initialProductForm);
//     setEditingId(null);
//   };

//   const handleEdit = async (id) => {
//     try {
//       const res = await axios.get(`http://localhost:8081/api/products/${id}`, {
//         withCredentials: true,
//       });
//       // Make sure variants and resources exist or default to []
//       setProductForm({
//         ...res.data,
//         variants: res.data.variants || [],
//         productResources: res.data.productResources || [],
//       });
//       setEditingId(id);
//       window.scrollTo(0, 0);
//     } catch (err) {
//       console.error('Failed to load product:', err);
//     }
//   };

//   const addVariant = () => {
//     if (!variantForm.color || !variantForm.size || !variantForm.stockQuantity) return;

//     setProductForm({
//       ...productForm,
//       variants: [...productForm.variants, variantForm],
//     });
//     setVariantForm({ color: '', size: '', stockQuantity: '' });
//   };

//   const removeVariant = (index) => {
//     const updated = [...productForm.variants];
//     updated.splice(index, 1);
//     setProductForm({ ...productForm, variants: updated });
//   };

//   const addResource = () => {
//     if (!resourceForm.name || !resourceForm.url || !resourceForm.type) return;

//     setProductForm({
//       ...productForm,
//       productResources: [...productForm.productResources, resourceForm],
//     });
//     setResourceForm({ name: '', url: '', type: '', isPrimary: false });
//   };

//   const removeResource = (index) => {
//     const updated = [...productForm.productResources];
//     updated.splice(index, 1);
//     setProductForm({ ...productForm, productResources: updated });
//   };

//   if (loadingUser) return <div className="p-6">Loading user...</div>;
//   if (!hasAccess) return <div className="p-6 text-red-600 font-semibold">Access Denied: Admins only</div>;

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">{editingId ? 'Edit Product' : 'Create Product'}</h2>

//       <div className="grid grid-cols-2 gap-4 mb-4">
//         <input
//           name="name"
//           placeholder="Product Name"
//           value={productForm.name}
//           onChange={handleChange}
//           className="border p-2"
//         />
//         <input
//           name="brand"
//           placeholder="Brand"
//           value={productForm.brand}
//           onChange={handleChange}
//           className="border p-2"
//         />
//         <input
//           name="price"
//           type="number"
//           placeholder="Price"
//           value={productForm.price}
//           onChange={handleChange}
//           className="border p-2"
//         />
//         <input
//           name="rating"
//           type="number"
//           step="0.1"
//           placeholder="Rating"
//           value={productForm.rating}
//           onChange={handleChange}
//           className="border p-2"
//         />
//         <input
//           name="slug"
//           placeholder="Slug"
//           value={productForm.slug}
//           onChange={handleChange}
//           className="border p-2"
//         />
//         <input
//           name="thumbnail"
//           placeholder="Thumbnail URL"
//           value={productForm.thumbnail}
//           onChange={handleChange}
//           className="border p-2"
//         />
//         <input
//           name="categoryId"
//           placeholder="Category ID"
//           value={productForm.categoryId}
//           onChange={handleChange}
//           className="border p-2"
//         />
//         <input
//           name="categoryTypeId"
//           placeholder="Category Type ID"
//           value={productForm.categoryTypeId}
//           onChange={handleChange}
//           className="border p-2"
//         />
//       </div>

//       <textarea
//         name="description"
//         placeholder="Description"
//         value={productForm.description}
//         onChange={handleChange}
//         className="border p-2 w-full mb-2"
//       />

//       <label className="flex items-center gap-2 mb-4">
//         <input
//           type="checkbox"
//           name="isNewArrival"
//           checked={productForm.isNewArrival}
//           onChange={handleChange}
//         />
//         New Arrival
//       </label>

//       <div className="mb-4">
//         <h3 className="text-lg font-semibold">Product Variants</h3>
//         <div className="flex gap-2">
//           <input
//             name="color"
//             placeholder="Color"
//             value={variantForm.color}
//             onChange={(e) =>
//               setVariantForm({ ...variantForm, color: e.target.value })
//             }
//             className="border p-2"
//           />
//           <input
//             name="size"
//             placeholder="Size"
//             value={variantForm.size}
//             onChange={(e) =>
//               setVariantForm({ ...variantForm, size: e.target.value })
//             }
//             className="border p-2"
//           />
//           <input
//             name="stockQuantity"
//             type="number"
//             placeholder="Stock"
//             value={variantForm.stockQuantity}
//             onChange={(e) =>
//               setVariantForm({ ...variantForm, stockQuantity: e.target.value })
//             }
//             className="border p-2"
//           />
//           <button
//             onClick={addVariant}
//             className="bg-green-600 text-white px-4 py-2 rounded"
//           >
//             Add
//           </button>
//         </div>
//         <ul className="mt-2">
//           {productForm.variants.map((v, i) => (
//             <li
//               key={i}
//               className="text-sm flex justify-between items-center border p-1 mt-1"
//             >
//               {v.color} | {v.size} | Stock: {v.stockQuantity}
//               <button
//                 onClick={() => removeVariant(i)}
//                 className="text-red-600"
//               >
//                 Remove
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="mb-6">
//         <h3 className="text-lg font-semibold">Product Resources</h3>
//         <div className="flex gap-2 flex-wrap">
//           <input
//             name="name"
//             placeholder="Name"
//             value={resourceForm.name}
//             onChange={(e) =>
//               setResourceForm({ ...resourceForm, name: e.target.value })
//             }
//             className="border p-2"
//           />
//           <input
//             name="url"
//             placeholder="URL"
//             value={resourceForm.url}
//             onChange={(e) =>
//               setResourceForm({ ...resourceForm, url: e.target.value })
//             }
//             className="border p-2"
//           />
//           <input
//             name="type"
//             placeholder="Type"
//             value={resourceForm.type}
//             onChange={(e) =>
//               setResourceForm({ ...resourceForm, type: e.target.value })
//             }
//             className="border p-2"
//           />
//           <label className="flex items-center gap-1">
//             <input
//               type="checkbox"
//               checked={resourceForm.isPrimary}
//               onChange={(e) =>
//                 setResourceForm({ ...resourceForm, isPrimary: e.target.checked })
//               }
//             />
//             Primary
//           </label>
//           <button
//             onClick={addResource}
//             className="bg-green-600 text-white px-4 py-2 rounded"
//           >
//             Add
//           </button>
//         </div>
//         <ul className="mt-2">
//           {productForm.productResources.map((r, i) => (
//             <li
//               key={i}
//               className="text-sm flex justify-between items-center border p-1 mt-1"
//             >
//               {r.name} ({r.type}) - {r.url}{' '}
//               {r.isPrimary && (
//                 <strong className="text-green-700 ml-2">Primary</strong>
//               )}
//               <button
//                 onClick={() => removeResource(i)}
//                 className="text-red-600"
//               >
//                 Remove
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="flex gap-4">
//         <button
//           onClick={handleSubmit}
//           className="bg-blue-600 text-white px-6 py-2 rounded"
//         >
//           {editingId ? 'Update Product' : 'Create Product'}
//         </button>
//         {editingId && (
//           <button
//             onClick={resetForm}
//             className="bg-gray-400 text-white px-6 py-2 rounded"
//           >
//             Cancel
//           </button>
//         )}
//       </div>

//       <div className="mt-10">
//         <h3 className="text-lg font-semibold mb-2">Filter by Category</h3>
//         <div className="flex gap-2">
//           <input
//             placeholder="Category name"
//             value={categoryFilter}
//             onChange={(e) => setCategoryFilter(e.target.value)}
//             className="border p-2"
//           />
//           <button
//             onClick={filterByCategory}
//             className="bg-purple-600 text-white px-4 py-2 rounded"
//           >
//             Filter
//           </button>
//         </div>
//       </div>

//       <h2 className="text-2xl font-bold mt-10 mb-4">All Products</h2>
//       <ul className="space-y-4">
//         {products.map((p) => (
//           <li key={p.id} className="border p-4 rounded">
//             <div className="font-semibold text-lg">
//               {p.name} ({p.slug})
//             </div>
//             <div>
//               {p.brand} - ₹{p.price} - ⭐ {p.rating}
//             </div>
//             <div>
//               Category: {p.categoryName} / {p.categoryTypeName}
//             </div>
//             <div>{p.description}</div>
//             <button
//               onClick={() => handleEdit(p.id)}
//               className="mt-2 text-blue-600 underline"
//             >
//               Edit
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AdminProductPage;
