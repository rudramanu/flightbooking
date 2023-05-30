const mongoose = require("mongoose");
const bookingSchema = mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "user" },
  flight: { type: mongoose.Types.ObjectId, ref: "flight" },
});

const BookingModel = mongoose.model("booking", bookingSchema);

module.exports = { BookingModel };
