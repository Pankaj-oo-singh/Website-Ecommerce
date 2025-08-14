import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminCategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    code: '',
    description: '',
    categoryTypes: [],
  });

  const [typeForm, setTypeForm] = useState({ name: '', code: '', description: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/category/getAllCategory', {
        withCredentials: true,
      });
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
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
      setTypeForm({ name: '', code: '', description: '' });
    }
  };

  const removeType = (index) => {
    const updatedTypes = categoryForm.categoryTypes.filter((_, i) => i !== index);
    setCategoryForm({ ...categoryForm, categoryTypes: updatedTypes });
  };

  const submitCategory = async () => {
    try {
      if (isEditing && editCategoryId) {
        await axios.put(`http://localhost:8081/api/category/${editCategoryId}`, categoryForm, {
          withCredentials: true,
        });
      } else {
        await axios.post('http://localhost:8081/api/category', categoryForm, {
          withCredentials: true,
        });
      }

      fetchCategories();
      resetForm();
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const resetForm = () => {
    setCategoryForm({ name: '', code: '', description: '', categoryTypes: [] });
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
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/category/${id}`, {
        withCredentials: true,
      });
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">
        {isEditing ? 'Update Category' : 'Create New Category'}
      </h2>

      <div className="space-y-4 mb-6">
        <input
          type="text"
          name="name"
          value={categoryForm.name}
          onChange={handleCategoryChange}
          placeholder="Category Name"
          className="border p-2 w-full"
        />
        <input
          type="text"
          name="code"
          value={categoryForm.code}
          onChange={handleCategoryChange}
          placeholder="Category Code"
          className="border p-2 w-full"
        />
        <textarea
          name="description"
          value={categoryForm.description}
          onChange={handleCategoryChange}
          placeholder="Category Description"
          className="border p-2 w-full"
        />
      </div>

      <h3 className="text-xl font-semibold mb-2">Add Category Types</h3>
      <div className="flex gap-2 mb-4 flex-wrap">
        <input
          type="text"
          name="name"
          value={typeForm.name}
          onChange={handleTypeChange}
          placeholder="Type Name"
          className="border p-2"
        />
        <input
          type="text"
          name="code"
          value={typeForm.code}
          onChange={handleTypeChange}
          placeholder="Type Code"
          className="border p-2"
        />
        <input
          type="text"
          name="description"
          value={typeForm.description}
          onChange={handleTypeChange}
          placeholder="Type Description"
          className="border p-2"
        />
        <button onClick={addType} className="bg-green-600 text-white px-4 py-2 rounded">
          Add Type
        </button>
      </div>

      {/* Display added types */}
      <ul className="mb-6">
        {categoryForm.categoryTypes.map((type, index) => (
          <li
            key={index}
            className="border p-2 rounded mb-2 flex justify-between items-center"
          >
            <div>
              <strong>{type.name}</strong> - {type.code} - {type.description}
            </div>
            <button onClick={() => removeType(index)} className="text-red-500 hover:underline">
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="flex gap-4 mb-10">
        <button onClick={submitCategory} className="bg-blue-600 text-white px-6 py-2 rounded">
          {isEditing ? 'Update Category' : 'Submit Category'}
        </button>
        {isEditing && (
          <button onClick={resetForm} className="bg-gray-400 text-white px-6 py-2 rounded">
            Cancel
          </button>
        )}
      </div>

      <h2 className="text-xl font-bold mt-10 mb-4">All Categories</h2>
      <ul className="space-y-4">
        {categories.map((cat) => (
          <li key={cat.id} className="border p-4 rounded shadow-sm">
            <div className="font-semibold text-lg">{cat.name} ({cat.code})</div>
            <div className="text-sm text-gray-700 mb-1">{cat.description}</div>
            <div className="text-sm mb-2">
              <strong>Types:</strong>{' '}
              {cat.categoryTypes?.length
                ? cat.categoryTypes.map((type) => type.name).join(', ')
                : 'None'}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(cat)}
                className="bg-yellow-500 text-white px-4 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(cat.id)}
                className="bg-red-600 text-white px-4 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminCategoryPage;
