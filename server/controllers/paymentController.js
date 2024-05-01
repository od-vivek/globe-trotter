const mongoose = require('mongoose');
const stripe = require("stripe")("sk_test_51Mqyu9SBO8rd4wslMRnYi0qXZN5es4PtubnJ8uyUFUhDBIsf7nVHG9wwtNQUEasEuPCAjYoTwgU1zj2NmXgbCdq500q4vepKOe");

const Booking = require('../models/Booking');

exports.createCheckoutSession = async (req, res) => {
  const { packageDetails, userDetails, formDetails } = req.body;

  // Create a booking object
  const newBooking = new Booking({
    package: packageDetails.name,
    user: userDetails.id, // Assuming you have a username in userDetails
    numberOfMembers: formDetails.numberOfMembers,
    selectedDate: formDetails.selectedDate, // You might want to adjust this based on the actual date selection logic
    totalAmount: formDetails.totalAmount
  });

  try {
    // Save the booking to the database
    await newBooking.save();

    // Create line items for Stripe
    const lineItems = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: packageDetails.name,
          },
          unit_amount: packageDetails.price * 100,
        },
        quantity: formDetails.numberOfMembers,
      },
    ];

    // Create a checkout session with Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/failure"
    });

    // Send the session ID and booking ID to the frontend
    res.json(session.id);
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
