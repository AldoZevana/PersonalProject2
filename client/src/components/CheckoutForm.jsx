import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const CheckoutForm = ({ orderId, amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setError(error.message);
    } else {
      const { id } = paymentMethod;
      try {
        const response = await axios.post('http://localhost:8000/api/pay', {
          amount,
          id,
          orderId,
        });

        if (response.data.success) {
          setSuccess(true);
        } else {
          setError('Payment failed. Please try again.');
        }
      } catch (error) {
        setError('Payment failed. Please try again.');
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe}>Pay</button>
      </form>
      {error && <div>{error}</div>}
      {success && <div>Payment successful!</div>}
    </div>
  );
};

export default CheckoutForm;
