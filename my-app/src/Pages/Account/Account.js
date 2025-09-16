
import React, { useState, useEffect } from "react";
import ProfilePage from "./ProfilePage";
import Orders from "./Orders";
import Settings from "./Settings";
import CreateCategory from "../AdminPanel/AdminCategoryPage";
import CreateProduct from "../AdminPanel/AdminProductPage";

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminSubTab, setAdminSubTab] = useState("category"); // 👈 for sub-tabs

  useEffect(() => {
    // get roles from JWT in localStorage
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        if (decoded.roles && decoded.roles.includes("ADMIN")) {
          setIsAdmin(true);
        }
      } catch (err) {
        console.error("Failed to decode token:", err);
      }
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">My Account</h1>

      {/* Main Tabs */}
      <div className="flex flex-wrap gap-4 mb-6">
        <button
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            activeTab === "profile"
              ? "bg-indigo-100 text-indigo-700"
              : "text-gray-600 hover:text-indigo-700"
          }`}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            activeTab === "orders"
              ? "bg-indigo-100 text-indigo-700"
              : "text-gray-600 hover:text-indigo-700"
          }`}
          onClick={() => setActiveTab("orders")}
        >
          Orders
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            activeTab === "settings"
              ? "bg-indigo-100 text-indigo-700"
              : "text-gray-600 hover:text-indigo-700"
          }`}
          onClick={() => setActiveTab("settings")}
        >
          Settings
        </button>

        {/* Admin Tab */}
        {isAdmin && (
          <button
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeTab === "admin"
                ? "bg-red-100 text-red-700"
                : "text-gray-600 hover:text-red-700"
            }`}
            onClick={() => setActiveTab("admin")}
          >
            Admin
          </button>
        )}
      </div>

      {/* Tab Content */}
      {activeTab === "profile" && <ProfilePage />}
      {activeTab === "orders" && <Orders />}
      {activeTab === "settings" && <Settings />}

      {/* Admin Sub-Tabs */}
      {isAdmin && activeTab === "admin" && (
        <div className="space-y-6">
          {/* Sub-tab buttons */}
          <div className="flex gap-4 mb-4">
            <button
              className={`px-4 py-2 text-sm rounded-md ${
                adminSubTab === "category"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setAdminSubTab("category")}
            >
              Create Category
            </button>
            <button
              className={`px-4 py-2 text-sm rounded-md ${
                adminSubTab === "product"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setAdminSubTab("product")}
            >
              Create Product
            </button>
          </div>

          {/* Sub-tab content */}
          {adminSubTab === "category" && <CreateCategory />}
          {adminSubTab === "product" && <CreateProduct />}
        </div>
      )}
    </div>
  );
};

export default AccountPage;
