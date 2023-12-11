// controllers/paymentController.js
const stripe = require('stripe')('sk_test_51Mqyu9SBO8rd4wslMRnYi0qXZN5es4PtubnJ8uyUFUhDBIsf7nVHG9wwtNQUEasEuPCAjYoTwgU1zj2NmXgbCdq500q4vepKOe');

const paymentController = {
  createCheckoutSession: async (req, res) => {
    try {
      const { numberOfMembers, memberDetails, selectedDate, totalAmount } = req.body;

      // You can use the received data to customize the line items in the checkout session
      const lineItems = [
        {
          price_data: {
            currency: 'usd', // Replace with your desired currency code
            product_data: {
              name: 'Booking', // Replace with your product name
            },
            unit_amount: totalAmount * 100, // Stripe expects the amount in cents
          },
          quantity: 1,
        },
      ];

      // Create a checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: 'http://localhost:3000/thank-you', // Replace with your success URL
        cancel_url: 'http://localhost:3000/cancel', // Replace with your cancel URL
      });

      res.json({ id: session.id });
    } catch (error) {
      console.error('Error creating checkout session:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = paymentController;
