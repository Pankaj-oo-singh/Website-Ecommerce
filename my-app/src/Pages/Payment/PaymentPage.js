











import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { fetchUserDetails } from '../../Api/UserInfo';
import { placeOrderAPI } from '../../Api/Order';

const PaymentPage = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    paymentMethod: 'card',
  });

  const [userAddress, setUserAddress] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const user = await fetchUserDetails();
        const address = user.addressList && user.addressList[0];
        setUserAddress(address);
        setUserId(user.id);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    loadUserData();
  }, []);

  const getTotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert('Cart is empty.');
      return;
    }

    if (!userAddress || !userId) {
      alert('User or address missing.');
      return;
    }

    try {
      const orderRequest = {
        userId: userId,
        addressId: userAddress.id,
        orderItemRequests: cartItems.map(item => ({
          productId: item.productId,
          productVariantId: item.variantId,
          quantity: item.quantity,
          discount: item.discount || 0,
        })),
        totalAmount: parseFloat(getTotal()),
        discount: 0,
        paymentMethod: formData.paymentMethod.toUpperCase(),
        orderDate: new Date(),
        expectedDeliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      };

      console.log("Sending order request:", orderRequest);
      const response = await placeOrderAPI(orderRequest);
      console.log("Order API Response:", response);
      

      if (
        formData.paymentMethod.toLowerCase() === 'card' &&
        response?.credentials?.client_secret
      ) {
        localStorage.setItem("orderId", response.id);
        navigate(`/stripe-payment?clientSecret=${response.credentials.client_secret}`);
      } else {
        alert('Order placed successfully!');
        clearCart();
        navigate('/thank-you');
      }
    } catch (error) {
      console.error("Order failed:", error);
      alert('Failed to place order.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Review & Payment</h2>

      <form onSubmit={handleSubmit} className="space-y-8">

        <div className="bg-white shadow-md rounded-md p-6">
          <h3 className="text-xl font-semibold mb-4">Select Payment Method</h3>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          >
            <option value="card">Card (Stripe)</option>
            <option value="cod">Cash on Delivery</option>
          </select>
        </div>

        <div className="bg-white shadow-md rounded-md p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Order Summary</h3>
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item, index) => (
              <li key={index} className="py-4 flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-700">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity} | ₹{item.price.toFixed(2)} each
                  </p>
                </div>
                <p className="font-medium text-gray-800">
                  ₹{(item.quantity * item.price).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
          <div className="text-right mt-4">
            <h3 className="text-xl font-bold text-gray-800">Total: ₹{getTotal()}</h3>
          </div>
        </div>

        {userAddress && (
          <div className="bg-white shadow-md rounded-md p-6 mt-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Delivery Address</h3>
            <div className="space-y-2 text-gray-700">
              <p><strong>Name:</strong> {userAddress.name}</p>
              <p><strong>Street:</strong> {userAddress.street}</p>
              <p><strong>City:</strong> {userAddress.city}</p>
              <p><strong>State:</strong> {userAddress.state}</p>
              <p><strong>Zip Code:</strong> {userAddress.zipCode}</p>
              <p><strong>Phone:</strong> {userAddress.phoneNumber}</p>
            </div>
          </div>
        )}

        <div className="text-right">
          <button
            type="submit"
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-medium"
          >
            Confirm & Proceed
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentPage;








