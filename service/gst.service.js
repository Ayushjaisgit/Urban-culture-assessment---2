const {
  createBooking,
  updateBookingStatus,
  updateUserGstDetailsStatus,
} = require("../models/bookingModel");
require("dotenv").config({ path: ".env" });

// create gst bookings
const gstBooking = async (req, res) => {
  try {
    const { name, totalBookingAmount } = req.body;

    const newBooking = await createBooking({
      name: name,
      totalBookingAmount: totalBookingAmount,
      status: "Pending",
    });

    return res.status(201).json({ success: true, data: newBooking });
  } catch (error) {
    res.status(500).json({ error: "Failed to create booking" });
  }
};

exports.gstBooking = gstBooking;

// updating user gst status
const updateGstBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    const updatedBooking = await updateBookingStatus(bookingId, status);

    return res.status(200).json({ success: true, data: updatedBooking });
  } catch (error) {
    res.status(500).json({ error: "Failed to update booking status" });
  }
};
exports.updateGstBookingStatus = updateGstBookingStatus;

// updating user gst details
const addGstDetails = async (req, res) => {
  try {
    const { gstin, pan, businessName, businessType, taxpayerType } = req.body;

    const updatedBooking = await updateUserGstDetailsStatus(req.user._id, {
      gstin,
      pan,
      businessName,
      businessType,
      taxpayerType,
      profileCompleted:true
    });

    return res.status(200).json({ success: true, data: updatedBooking });

  } catch (error) {
    res.status(500).json({ error: "Failed to update user data" });
  }
};
exports.addGstDetails = addGstDetails;
