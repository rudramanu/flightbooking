const express = require("express");
const { FlightModel } = require("../models/flight.model");

const flightRouter = express.Router();

flightRouter.get("/", async (req, res) => {
  const flights = await FlightModel.find();
  res.send(flights);
});
flightRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const flight = await FlightModel.find({ _id: id });
  res.send(flight);
});
flightRouter.post("/", async (req, res) => {
  const payload = req.body;
  try {
    const flight = new FlightModel(payload);
    await flight.save();
    res.send("New Flight Has Been Added To The List");
  } catch (error) {
    res.send({ message: "Something went wrong while adding data" });
  }
});
flightRouter.patch("/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  try {
    await FlightModel.findByIdAndUpdate({ _id: id }, payload);
    res.send("Flight Updated");
  } catch (error) {
    res.send("Something went wrong while updating");
  }
});
flightRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await FlightModel.findByIdAndRemove({ _id: id });
    res.send("Flight Deleted");
  } catch (error) {
    res.send("Something went wrong while deleting");
  }
});

module.exports = { flightRouter };
