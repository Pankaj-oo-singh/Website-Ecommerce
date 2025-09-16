
import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminCategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    code: "",
    description: "",
    categoryTypes: [],
  });

  const [typeForm, setTypeForm] = useState({
    name: "",
    code: "",
    description: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8081/api/category/getAllCategory",
        { withCredentials: true }
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setCategoryForm({ ...categoryForm, [name]: value });
  };

  const handleTypeChange = (e) => {
    const { name, value } = e.target;
    setTypeForm({ ...typeForm, [name]: value });
  };

  const addType = () => {
    if (typeForm.name && typeForm.code && typeForm.description) {
      setCategoryForm({
        ...categoryForm,
        categoryTypes: [...categoryForm.categoryTypes, typeForm],
      });
      setTypeForm({ name: "", code: "", description: "" });
    }
  };

  const removeType = (index) => {
    const updatedTypes = categoryForm.categoryTypes.filter((_, i) => i !== index);
    setCategoryForm({ ...categoryForm, categoryTypes: updatedTypes });
  };

  const submitCategory = async () => {
    try {
      if (isEditing && editCategoryId) {
        await axios.put(
          `http://localhost:8081/api/category/${editCategoryId}`,
          categoryForm,
          { withCredentials: true }
        );
      } else {
        await axios.post("http://localhost:8081/api/category", categoryForm, {
          withCredentials: true,
        });
      }
      fetchCategories();
      resetForm();
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  const resetForm = () => {
    setCategoryForm({ name: "", code: "", description: "", categoryTypes: [] });
    setIsEditing(false);
    setEditCategoryId(null);
  };

  const handleEdit = (category) => {
    setCategoryForm({
      name: category.name,
      code: category.code,
      description: category.description,
      categoryTypes: category.categoryTypes || [],
    });
    setIsEditing(true);
    setEditCategoryId(category.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/category/${id}`, {
        withCredentials: true,
      });
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header */}
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        {isEditing ? "Update Category" : "Create New Category"}
      </h2>

      {/* Category Form */}
      <div className="space-y-4 mb-6 bg-white p-6 rounded-2xl shadow transition duration-300 hover:shadow-lg">
        <input
          type="text"
          name="name"
          value={categoryForm.name}
          onChange={handleCategoryChange}
          placeholder="Category Name"
          className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="code"
          value={categoryForm.code}
          onChange={handleCategoryChange}
          placeholder="Category Code"
          className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="description"
          value={categoryForm.description}
          onChange={handleCategoryChange}
          placeholder="Category Description"
          className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Add Category Types */}
      <h3 className="text-xl font-semibold mb-3">Add Category Types</h3>
      <div className="flex gap-2 mb-4 flex-wrap">
        <input
          type="text"
          name="name"
          value={typeForm.name}
          onChange={handleTypeChange}
          placeholder="Type Name"
          className="border p-2 rounded-lg"
        />
        <input
          type="text"
          name="code"
          value={typeForm.code}
          onChange={handleTypeChange}
          placeholder="Type Code"
          className="border p-2 rounded-lg"
        />
        <input
          type="text"
          name="description"
          value={typeForm.description}
          onChange={handleTypeChange}
          placeholder="Type Description"
          className="border p-2 rounded-lg"
        />
        <button
          onClick={addType}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Add Type
        </button>
      </div>

      {/* Display Added Types */}
      <ul className="mb-6">
        {categoryForm.categoryTypes.map((type, index) => (
          <li
            key={index}
            className="border p-3 rounded-lg mb-2 flex justify-between items-center transition duration-300 hover:bg-gray-50"
          >
            <div>
              <strong>{type.name}</strong> - {type.code} - {type.description}
            </div>
            <button
              onClick={() => removeType(index)}
              className="text-red-500 hover:underline"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      {/* Submit + Cancel */}
      <div className="flex gap-4 mb-10">
        <button
          onClick={submitCategory}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {isEditing ? "Update Category" : "Submit Category"}
        </button>
        {isEditing && (
          <button
            onClick={resetForm}
            className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition"
          >
            Cancel
          </button>
        )}
      </div>

      {/* All Categories */}
      <h2 className="text-2xl font-bold mt-10 mb-4">All Categories</h2>
      {loading ? (
        <p className="text-gray-600">Loading categories...</p>
      ) : (
        <ul className="space-y-4">
          {categories.map((cat) => (
            <li
              key={cat.id}
              className="border p-4 rounded-2xl shadow-sm bg-white transition transform hover:scale-[1.01] hover:shadow-md"
            >
              <div className="font-semibold text-lg">
                {cat.name} <span className="text-gray-500">({cat.code})</span>
              </div>
              <div className="text-sm text-gray-700 mb-1">{cat.description}</div>
              <div className="text-sm mb-2">
                <strong>Types:</strong>{" "}
                {cat.categoryTypes?.length
                  ? cat.categoryTypes.map((type) => type.name).join(", ")
                  : "None"}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(cat)}
                  className="bg-yellow-500 text-white px-4 py-1 rounded-lg hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="bg-red-600 text-white px-4 py-1 rounded-lg hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminCategoryPage;
