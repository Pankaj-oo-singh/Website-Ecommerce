
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useCart } from '../../context/CartContext';

// const CheckoutPage = () => {
//   const { cartItems } = useCart();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     address: '',
//     city: '',
//     zipCode: '',
//     country: '',
//     paymentMethod: 'card', // Default payment method
//   });

//   const getTotal = () =>
//     cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (cartItems.length === 0) {
//       alert('Your cart is empty.');
//       return;
//     }
//     // Proceed with form submission (e.g., save order details, navigate to payment)
//     console.log('Form submitted', formData);
//     navigate('/payment'); // Redirect to the PaymentPage after form submission
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h2 className="text-3xl font-bold mb-6 text-gray-800">Checkout</h2>

//       {cartItems.length === 0 ? (
//         <div className="text-center py-16">
//           <p className="text-gray-600 text-lg mb-4">Your cart is currently empty.</p>
//           <button
//             onClick={() => navigate('/')}
//             className="text-indigo-600 font-medium hover:underline"
//           >
//             Continue Shopping
//           </button>
//         </div>
//       ) : (
//         <div className="space-y-6">
//           <div className="mb-6">
//             <h3 className="text-xl font-semibold text-gray-800">Delivery Address</h3>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               {/* Form Fields (First Name, Last Name, etc.) */}
//               {/* ... */}

//               {/* Payment Method */}
//               <div className="mt-6">
//                 <h3 className="text-lg font-semibold text-gray-800">Payment Method</h3>
//                 <div>
//                   <label className="inline-flex items-center">
//                     <input
//                       type="radio"
//                       name="paymentMethod"
//                       value="card"
//                       checked={formData.paymentMethod === 'card'}
//                       onChange={handleChange}
//                       className="form-radio"
//                     />
//                     <span className="ml-2">Credit/Debit Card</span>
//                   </label>
//                 </div>
//                 <div>
//                   <label className="inline-flex items-center">
//                     <input
//                       type="radio"
//                       name="paymentMethod"
//                       value="cod"
//                       checked={formData.paymentMethod === 'cod'}
//                       onChange={handleChange}
//                       className="form-radio"
//                     />
//                     <span className="ml-2">Cash on Delivery</span>
//                   </label>
//                 </div>
//               </div>

//               <div className="text-right mt-6">
//                 <h3 className="text-xl font-bold text-gray-800">Total: ₹{getTotal()}</h3>
//                 <button
//                   type="submit"
//                   className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-medium transition"
//                 >
//                   Proceed to Payment
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CheckoutPage;
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useCart } from '../../context/CartContext';

// const CheckoutPage = () => {
//   const { cartItems } = useCart();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     address: '',
//     city: '',
//     zipCode: '',
//     country: '',
//     paymentMethod: 'card',
//     cardName: '',
//     cardNumber: '',
//     expiryDate: '',
//     cvv: '',
//   });

//   const getTotal = () =>
//     cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (cartItems.length === 0) {
//       alert('Your cart is empty.');
//       return;
//     }

//     // Validate card fields if card is selected
//     if (formData.paymentMethod === 'card') {
//       if (!formData.cardName || !formData.cardNumber || !formData.expiryDate || !formData.cvv) {
//         alert('Please fill in all card details.');
//         return;
//       }
//     }

//     // Proceed to payment
//     console.log('Form Submitted:', formData);
//     navigate('/payment');
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h2 className="text-3xl font-bold mb-6 text-gray-800">Checkout</h2>

//       {cartItems.length === 0 ? (
//         <div className="text-center py-16">
//           <p className="text-gray-600 text-lg mb-4">Your cart is currently empty.</p>
//         </div>
//       ) : (
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Delivery Info */}
//           <div>
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">Delivery Information</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="input" required />
//               <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="input" required />
//               <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="input" required />
//               <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="input" required />
//               <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="input" required />
//               <input name="city" placeholder="City" value={formData.city} onChange={handleChange} className="input" required />
//               <input name="zipCode" placeholder="ZIP Code" value={formData.zipCode} onChange={handleChange} className="input" required />
//               <input name="country" placeholder="Country" value={formData.country} onChange={handleChange} className="input" required />
//             </div>
//           </div>

//           {/* Payment Method */}
//           <div>
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">Payment Method</h3>
//             <div className="space-y-2">
//               <label className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   name="paymentMethod"
//                   value="card"
//                   checked={formData.paymentMethod === 'card'}
//                   onChange={handleChange}
//                 />
//                 Credit/Debit Card
//               </label>
//               <label className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   name="paymentMethod"
//                   value="cod"
//                   checked={formData.paymentMethod === 'cod'}
//                   onChange={handleChange}
//                 />
//                 Cash on Delivery
//               </label>
//             </div>
//           </div>

//           {/* Card Details - Conditional */}
//           {formData.paymentMethod === 'card' && (
//             <div className="mt-4">
//               <h4 className="text-lg font-medium text-gray-700 mb-2">Card Information</h4>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <input
//                   name="cardName"
//                   placeholder="Cardholder Name"
//                   value={formData.cardName}
//                   onChange={handleChange}
//                   className="input"
//                   required
//                 />
//                 <input
//                   name="cardNumber"
//                   placeholder="Card Number"
//                   value={formData.cardNumber}
//                   onChange={handleChange}
//                   className="input"
//                   required
//                 />
//                 <input
//                   name="expiryDate"
//                   placeholder="MM/YY"
//                   value={formData.expiryDate}
//                   onChange={handleChange}
//                   className="input"
//                   required
//                 />
//                 <input
//                   name="cvv"
//                   placeholder="CVV"
//                   value={formData.cvv}
//                   onChange={handleChange}
//                   className="input"
//                   required
//                 />
//               </div>
//             </div>
//           )}

//           {/* Total and Submit */}
//           <div className="text-right mt-6">
//             <h3 className="text-xl font-bold text-gray-800">Total: ₹{getTotal()}</h3>
//             <button
//               type="submit"
//               className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-medium"
//             >
//               Proceed to Payment
//             </button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// };

// export default CheckoutPage;
