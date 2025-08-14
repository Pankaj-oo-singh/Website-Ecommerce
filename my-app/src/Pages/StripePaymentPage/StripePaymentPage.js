// import React, { useEffect, useState } from 'react';
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import { loadStripe } from '@stripe/stripe-js';
// import {
//   Elements,
//   CardElement,
//   useStripe,
//   useElements
// } from '@stripe/react-stripe-js';

// const stripePromise = loadStripe('YOUR_PUBLISHABLE_KEY'); // Replace with your real key

// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [searchParams] = useSearchParams();
//   const clientSecret = searchParams.get('clientSecret');
//   const navigate = useNavigate();
//   const [isProcessing, setIsProcessing] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements || !clientSecret) return;

//     setIsProcessing(true);

//     const result = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: elements.getElement(CardElement),
//       }
//     });

//     if (result.error) {
//       alert(result.error.message);
//       setIsProcessing(false);
//     } else {
//       if (result.paymentIntent.status === 'succeeded') {
//         alert('Payment successful!');
//         navigate('/thank-you');
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded shadow">
//       <h2 className="text-2xl font-bold mb-4 text-center">Card Payment</h2>
//       <CardElement className="p-4 border border-gray-300 rounded-md mb-6" />
//       <button
//         type="submit"
//         disabled={!stripe || isProcessing}
//         className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded font-semibold"
//       >
//         {isProcessing ? 'Processing...' : 'Pay Now'}
//       </button>
//     </form>
//   );
// };

// const StripePaymentPage = () => {
//   const [searchParams] = useSearchParams();
//   const clientSecret = searchParams.get('clientSecret');

//   if (!clientSecret) {
//     return <p className="text-center text-red-600 mt-10">Missing client secret</p>;
//   }

//   const options = {
//     clientSecret,
//     appearance: {
//       theme: 'flat',
//     },
//   };

//   return (
//     <div className="container mx-auto px-4 py-10">
//       <Elements stripe={stripePromise} options={options}>
//         <CheckoutForm />
//       </Elements>
//     </div>
//   );
// };

// export default StripePaymentPage;


// import React, { useEffect, useState } from 'react';
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import { loadStripe } from '@stripe/stripe-js';
// import {
//   Elements,
//   CardElement,
//   useStripe,
//   useElements
// } from '@stripe/react-stripe-js';

// const stripePromise = loadStripe('YOUR_PUBLISHABLE_KEY'); // Replace with real Stripe publishable key

// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const [isProcessing, setIsProcessing] = useState(false);
//   const clientSecret = searchParams.get('clientSecret');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements || !clientSecret) return;

//     setIsProcessing(true);

//     const result = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: elements.getElement(CardElement),
//       },
//     });

//     if (result.error) {
//       alert(result.error.message);
//       setIsProcessing(false);
//     } else if (result.paymentIntent.status === 'succeeded') {
//       alert('Payment successful!');
//       navigate('/thank-you');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded shadow">
//       <h2 className="text-2xl font-bold mb-4 text-center">Card Payment</h2>
//       <CardElement className="p-4 border border-gray-300 rounded-md mb-6" />
//       <button
//         type="submit"
//         disabled={!stripe || isProcessing}
//         className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded font-semibold"
//       >
//         {isProcessing ? 'Processing...' : 'Pay Now'}
//       </button>
//     </form>
//   );
// };

// const StripePaymentPage = () => {
//   const [searchParams] = useSearchParams();
//   const clientSecret = searchParams.get('clientSecret');

//   const options = {
//     clientSecret,
//     appearance: {
//       theme: 'flat',
//     },
//   };

//   if (!clientSecret) {
//     return <p className="text-center text-red-600 mt-10">Missing client secret</p>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-10">
//       <Elements stripe={stripePromise} options={options}>
//         <CheckoutForm />
//       </Elements>
//     </div>
//   );
// };

// export default StripePaymentPage;














// // src/pages/StripePaymentPage.js
// import React, { useEffect, useState } from 'react';
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import { useCart } from '../../context/CartContext';
// // import CheckoutForm from '../components/CheckoutForm';


// const stripePromise = loadStripe('pk_test_YOUR_PUBLIC_KEY'); // Replace with your key

// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const { clearCart } = useCart();

//   const clientSecret = searchParams.get('clientSecret');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handlePayment = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements || !clientSecret) return;

//     setLoading(true);

//     const result = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: elements.getElement(CardElement),
//       },
//     });

//     setLoading(false);

//     if (result.error) {
//       setError(result.error.message);
//     } else {
//       if (result.paymentIntent.status === 'succeeded') {
//         clearCart();
//         // navigate('/thankyou');
//       }
//     }
//   };

//   return (
//     <form onSubmit={handlePayment} className="max-w-md mx-auto p-6 bg-white shadow rounded">
//       <h2 className="text-xl font-bold mb-4">Enter Card Details</h2>
//       <CardElement className="border p-3 rounded mb-4" />
//       {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
//       <button
//         type="submit"
//         disabled={!stripe || loading}
//         className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
//       >
//         {loading ? 'Processing...' : 'Pay Now'}
//       </button>
//     </form>
//   );
// };

// const StripePaymentPage = () => {
//   const [searchParams] = useSearchParams();
//   const clientSecret = searchParams.get('clientSecret');

//   if (!clientSecret) {
//     return (
//       <div className="text-center mt-10">
//         <p className="text-red-600 text-lg">Missing or invalid payment session.</p>
//       </div>
//     );
//   }

//   return (
//     <Elements stripe={stripePromise} options={{ clientSecret }}>
//       <CheckoutForm />
//     </Elements>
//   );
// };

// export default StripePaymentPage;




import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../../components/CheckoutForm/CheckoutForm'; // Adjust the path if needed

// Load your Stripe public key
const stripePromise = loadStripe('pk_test_51RFaENCvpDkgoYWyPlRGJX35QOX0vNyxATUgcMJnie41MLJT1B3Nvb5driqcVzB0NdWFMlZ0jV6bjSpkWDqg1aPf00SrzkmNUG'); // Replace with your Stripe publishable key

const StripePaymentPage = () => {
  const [searchParams] = useSearchParams();
  const clientSecret = searchParams.get('clientSecret');

  const options = {
    clientSecret,
    appearance: {
      theme: 'flat',
    },
  };

  if (!clientSecret) {
    return (
      <div className="text-center text-red-600 mt-10">
        Missing Stripe Client Secret. Please try again.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-8">
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default StripePaymentPage;



// import React from 'react';
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import CheckoutForm from '../../components/CheckoutForm/CheckoutForm';

// const stripePromise = loadStripe('pk_test_51RFaENCvpDkgoYWyPlRGJX35QOX0vNyxATUgcMJnie41MLJT1B3Nvb5driqcVzB0NdWFMlZ0jV6bjSpkWDqg1aPf00SrzkmNUG'); // Your publishable key

// const StripePaymentPage = () => {
//   const clientSecret = new URLSearchParams(window.location.search).get('clientSecret');

//   const options = {
//     clientSecret,
//     appearance: {
//       theme: 'flat',
//       variables: {
//         colorPrimary: '#1a73e8',
//         fontFamily: 'Inter, sans-serif',
//         spacingUnit: '4px',
//         borderRadius: '8px',
//       },
//     },
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
//       <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6">
//         <h2 className="text-2xl font-bold text-center mb-4">Secure Payment</h2>
//         <p className="text-sm text-gray-500 text-center mb-6">
//           Enter your card details to complete your purchase.
//         </p>

//         {clientSecret && (
//           <Elements stripe={stripePromise} options={options}>
//             <CheckoutForm />
//           </Elements>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StripePaymentPage;
