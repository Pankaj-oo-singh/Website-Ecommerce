


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
// import React, { useEffect, useState } from "react";
// import {
//   fetchUserDetails,
//   addAddressAPI,
//   deleteAddressAPI,
// } from "../../Api/UserInfo"; // Adjust path

// const ProfileDetailPage = () => {
//   const [user, setUser] = useState(null);
//   const [newAddress, setNewAddress] = useState({
//     name: "",
//     street: "",
//     city: "",
//     state: "",
//     zipCode: "",
//     phoneNumber: "",
//   });
//   const [error, setError] = useState("");

//   useEffect(() => {
//     loadUserData();
//   }, []);

//   const loadUserData = async () => {
//     try {
//       const userData = await fetchUserDetails();
//       setUser(userData);
//     } catch (err) {
//       console.error("Error loading user data:", err);
//     }
//   };

//   const handleAddAddress = async () => {
//     try {
//       const { name, street, city, state, zipCode, phoneNumber } = newAddress;
//       if (!name || !street || !city || !state || !zipCode || !phoneNumber) {
//         setError("⚠️ Please fill in all address fields.");
//         return;
//       }

//       await addAddressAPI(newAddress);
//       setNewAddress({
//         name: "",
//         street: "",
//         city: "",
//         state: "",
//         zipCode: "",
//         phoneNumber: "",
//       });
//       setError("");
//       await loadUserData();
//     } catch (err) {
//       setError("❌ Failed to add address.");
//     }
//   };

//   const handleDeleteAddress = async (id) => {
//     try {
//       await deleteAddressAPI(id);
//       await loadUserData();
//     } catch (err) {
//       setError("❌ Failed to delete address.");
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
//         User Profile
//       </h2>

//       {user ? (
//         <>
//           {/* User Info Card */}
//           <div className="bg-white shadow-md rounded-xl p-5 border mb-6">
//             <p className="text-lg">
//               <span className="font-semibold">Name:</span> {user.firstName}
//             </p>
//             <p className="text-lg">
//               <span className="font-semibold">Email:</span> {user.email}
//             </p>
//           </div>

//           {/* Addresses */}
//           <h3 className="text-xl font-semibold text-gray-700 mb-4">
//             Saved Addresses
//           </h3>
//           {user.addressList?.length > 0 ? (
//             <div className="grid gap-4">
//               {user.addressList.map((address) => (
//                 <div
//                   key={address.id}
//                   className="border rounded-lg p-4 shadow-sm bg-gray-50 hover:shadow-md transition"
//                 >
//                   <p className="font-semibold text-gray-800">{address.name}</p>
//                   <p className="text-gray-600">
//                     {address.street}, {address.city}, {address.state} -{" "}
//                     {address.zipCode}
//                   </p>
//                   <p className="text-gray-600">📞 {address.phoneNumber}</p>
//                   <button
//                     onClick={() => handleDeleteAddress(address.id)}
//                     className="mt-3 bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-500">No addresses found.</p>
//           )}

//           {/* Add Address */}
//           <div className="mt-8">
//             <h3 className="text-xl font-semibold text-gray-700 mb-4">
//               Add New Address
//             </h3>
//             {error && <p className="text-red-500 mb-3">{error}</p>}

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <input
//                 type="text"
//                 placeholder="Name"
//                 value={newAddress.name}
//                 onChange={(e) =>
//                   setNewAddress({ ...newAddress, name: e.target.value })
//                 }
//                 className="border p-2 rounded-md focus:ring-2 focus:ring-blue-400"
//               />
//               <input
//                 type="text"
//                 placeholder="Street"
//                 value={newAddress.street}
//                 onChange={(e) =>
//                   setNewAddress({ ...newAddress, street: e.target.value })
//                 }
//                 className="border p-2 rounded-md focus:ring-2 focus:ring-blue-400"
//               />
//               <input
//                 type="text"
//                 placeholder="City"
//                 value={newAddress.city}
//                 onChange={(e) =>
//                   setNewAddress({ ...newAddress, city: e.target.value })
//                 }
//                 className="border p-2 rounded-md focus:ring-2 focus:ring-blue-400"
//               />
//               <input
//                 type="text"
//                 placeholder="State"
//                 value={newAddress.state}
//                 onChange={(e) =>
//                   setNewAddress({ ...newAddress, state: e.target.value })
//                 }
//                 className="border p-2 rounded-md focus:ring-2 focus:ring-blue-400"
//               />
//               <input
//                 type="text"
//                 placeholder="Zip Code"
//                 value={newAddress.zipCode}
//                 onChange={(e) =>
//                   setNewAddress({ ...newAddress, zipCode: e.target.value })
//                 }
//                 className="border p-2 rounded-md focus:ring-2 focus:ring-blue-400"
//               />
//               <input
//                 type="text"
//                 placeholder="Phone Number"
//                 value={newAddress.phoneNumber}
//                 onChange={(e) =>
//                   setNewAddress({ ...newAddress, phoneNumber: e.target.value })
//                 }
//                 className="border p-2 rounded-md focus:ring-2 focus:ring-blue-400"
//               />
//             </div>

//             <button
//               onClick={handleAddAddress}
//               className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 font-bold mt-5"
//             >
//               ➕ Add Address
//             </button>
//           </div>
//         </>
//       ) : (
//         <p className="text-gray-600">Loading user details...</p>
//       )}
//     </div>
//   );
// };

// export default ProfileDetailPage;
