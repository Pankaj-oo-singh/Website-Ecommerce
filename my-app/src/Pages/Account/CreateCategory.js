import React, { useState } from "react";

const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // send POST request to backend
    try {
      // await your API call here
      alert("Category created: " + categoryName);
      setCategoryName("");
    } catch (err) {
      console.error(err);
      alert("Error creating category");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Create Category</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
          className="border p-2 w-full mb-4"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateCategory;
