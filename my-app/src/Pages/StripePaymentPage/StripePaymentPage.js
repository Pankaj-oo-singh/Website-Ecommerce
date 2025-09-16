

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


