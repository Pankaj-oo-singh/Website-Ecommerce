import React, { useState } from "react";

const CreateProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // await your API call
      alert("Product created: " + productData.name);
      setProductData({ name: "", description: "", price: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to create product");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Create Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={productData.name}
          onChange={handleChange}
          required
          className="border p-2 w-full mb-2"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={productData.description}
          onChange={handleChange}
          required
          className="border p-2 w-full mb-2"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={productData.price}
          onChange={handleChange}
          required
          className="border p-2 w-full mb-4"
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
