const express = require("express");

const bookingRouter = express.Router();
const { BookingModel } = require("../models/booking.model");
const { FlightModel } = require("../models/flight.model");

bookingRouter.post("/:id", async (req, res) => {
  const id = req.params.id;
  const flight = await FlightModel.findOne({ _id: id });
  const booking = new BookingModel(flight);
  await booking.save();
  res.send("Flight has been Booked");
});

bookingRouter.get("/dashboard", async (req, res) => {
  const bookings = await BookingModel.find();
  res.send(bookings);
});
module.exports = { bookingRouter };
