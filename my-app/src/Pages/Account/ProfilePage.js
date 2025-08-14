


import React, { useEffect, useState } from "react";
import {
  fetchUserDetails,
  addAddressAPI,
  deleteAddressAPI,
} from '../../Api/UserInfo'; // Adjust path


const ProfileDetailPage = () => {
  const [user, setUser] = useState(null);
  const [newAddress, setNewAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await fetchUserDetails();
      setUser(userData);
    } catch (err) {
      console.error("Error loading user data:", err);
    }
  };

  const handleAddAddress = async () => {
    try {
      const { name, street, city, state, zipCode, phoneNumber } = newAddress;
      if (!name || !street || !city || !state || !zipCode || !phoneNumber) {
        setError("Please fill in all address fields.");
        return;
      }

      await addAddressAPI(newAddress);
      setNewAddress({
        name: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        phoneNumber: "",
      });
      setError("");
      await loadUserData();
    } catch (err) {
      setError("Failed to add address.");
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      await deleteAddressAPI(id);
      await loadUserData();
    } catch (err) {
      setError("Failed to delete address.");
    }
  };

  return (
    <div style={{ maxWidth: "700px", margin: "auto", padding: "20px" }}>
      <h2>User Profile</h2>

      {user ? (
        <>
          <div style={{ marginBottom: "20px" }}>
            <p><strong>Name:</strong> {user.firstName}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>

          <hr />
          <h3>Saved Addresses</h3>
          {user.addressList?.length > 0 ? (
            <ul>
              {user.addressList.map((address) => (
                <li key={address.id} style={{ marginBottom: "15px" }}>
                  <strong>{address.name}</strong><br />
                  {address.street}, {address.city}, {address.state} - {address.zipCode}<br />
                  Phone: {address.phoneNumber}<br />
                  <button
  onClick={() => handleDeleteAddress(address.id)}
  className="mt-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
>
  Delete
</button>

                </li>
              ))}
            </ul>
          ) : (
            <p>No addresses found.</p>
          )}

          <hr />
          <h3>Add New Address</h3>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <input
              type="text"
              placeholder="Name"
              value={newAddress.name}
              onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Street"
              value={newAddress.street}
              onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
            />
            <input
              type="text"
              placeholder="City"
              value={newAddress.city}
              onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
            />
            <input
              type="text"
              placeholder="State"
              value={newAddress.state}
              onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
            />
            <input
              type="text"
              placeholder="Zip Code"
              value={newAddress.zipCode}
              onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={newAddress.phoneNumber}
              onChange={(e) => setNewAddress({ ...newAddress, phoneNumber: e.target.value })}
            />
            <button
  onClick={handleAddAddress}
  className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 font-bold mt-4 w-40"
>
  Add Address
</button>

          </div>
        </>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default ProfileDetailPage;
