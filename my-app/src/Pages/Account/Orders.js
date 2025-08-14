
import React, { useEffect, useState } from 'react';

import { fetchOrderAPI,cancelOrderAPI } from '../../Api/UserInfo';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await fetchOrderAPI();
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };
    fetchOrders();
  }, []);

  const toggleDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const handleCancel = async (orderId) => {
    setLoading(true);
    try {
      await cancelOrderAPI(orderId);
      setOrders(prev =>
        prev.map(order =>
          order.id === orderId ? { ...order, orderStatus: 'CANCELLED' } : order
        )
      );
    } catch (err) {
      console.error("Cancel failed:", err);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-indigo-700 mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">You have no orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border p-4 rounded-md shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="text-sm text-gray-500">Order ID: {order.id}</p>
                  <p className="text-sm text-gray-500">Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.orderStatus === 'DELIVERED'
                    ? 'bg-green-100 text-green-700'
                    : order.orderStatus === 'CANCELLED'
                    ? 'bg-red-100 text-red-600'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {order.orderStatus}
                </span>
              </div>

              <ul className="text-sm text-gray-700 mb-2">
                {order.orderItems.slice(0, 2).map((item, idx) => (
                  <li key={idx}>• {item.productName} × {item.quantity}</li>
                ))}
                {order.orderItems.length > 2 && <li>...and more</li>}
              </ul>

              <p className="text-right font-semibold text-indigo-600 mb-2">Total: ₹{order.totalAmount}</p>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => toggleDetails(order.id)}
                  className="text-indigo-600 hover:underline text-sm"
                >
                  {expandedOrderId === order.id ? 'Hide Details' : 'View Details'}
                </button>

                {order.orderStatus !== 'CANCELLED' && (
                  <button
                    onClick={() => handleCancel(order.id)}
                    disabled={loading}
                    className="text-red-600 hover:underline text-sm"
                  >
                    {loading ? 'Cancelling...' : 'Cancel Order'}
                  </button>
                )}
              </div>

              {expandedOrderId === order.id && (
                <div className="mt-3 text-sm bg-gray-50 p-3 rounded">
                  <p><strong>Address ID:</strong> {order.addressId}</p>
                  <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                  <p><strong>Discount:</strong> ₹{order.discount}</p>
                  <p><strong>Expected Delivery:</strong> {order.expectedDeliveryDate ? new Date(order.expectedDeliveryDate).toLocaleDateString() : 'N/A'}</p>
                  <p><strong>Tracking Number:</strong> {order.shipmentTrackingNumber || 'N/A'}</p>
                  <div className="mt-2">
                    <strong>Items:</strong>
                    <ul className="ml-4 list-disc">
                      {order.orderItems.map((item, idx) => (
                        // <li key={idx}>
                        //   {item.productName} (Variant ID: {item.productVariantId}) - Qty: {item.quantity}, Price: ₹{item.itemPrice}
                        // </li>
                        <li key={idx}>
  {item.productName} (Variant ID: {item.productVariantId}) - Qty: {item.quantity},Price:₹{order.totalAmount}
</li>

                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
