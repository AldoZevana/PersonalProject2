// server/controllers/payment.controller.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const processPayment = async (req, res) => {
  const { amount, id, orderId } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      description: `Order ${orderId}`,
      payment_method: id,
      confirm: true,
    });

    if (payment.status === 'succeeded') {
      // Update the order status to "Paid"
      // Assuming you have an order model and method to update order status
      await Order.findByIdAndUpdate(orderId, { status: 'Paid' });

      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ success: false, message: 'Payment failed' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { processPayment };
