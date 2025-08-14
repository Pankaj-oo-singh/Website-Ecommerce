// components/CheckoutForm.js
import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useNavigate, useSearchParams } from 'react-router-dom';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const clientSecret = searchParams.get('clientSecret');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setIsProcessing(true);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      alert(result.error.message);
      setIsProcessing(false);
    } else if (result.paymentIntent.status === 'succeeded') {
      alert('Payment successful!');
      navigate('/thank-you'); // You can change the route if needed
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Card Payment</h2>

      <CardElement className="p-3 border border-gray-300 rounded mb-6" />

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-indigo-600 text-white py-2 rounded font-semibold hover:bg-indigo-700"
      >
        {isProcessing ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};

export default CheckoutForm;




