const express = require("express");
const { connection } = require("./configs/db");
const { userRouter } = require("./router/user.router");
const { flightRouter } = require("./router/flight.router");
const { bookingRouter } = require("./router/booking.router");
const { authenticate } = require("./middleware/authenticate");
const app = express();
const cors = require("cors");
require("dotenv").config();
app.use(cors());
app.use(express.json());

app.get("/home", (req, res) => {
  res.send("Getting Data");
});

app.use("/users", userRouter);
app.use("/flights", authenticate, flightRouter);
app.use("/bookings", authenticate, bookingRouter);
app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log("Getting Error while connecting to database");
  }
  console.log(`Server is running at port ${process.env.port}`);
});
