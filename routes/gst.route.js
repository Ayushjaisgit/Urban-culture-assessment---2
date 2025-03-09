const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/auth");
const validateRequest = require("../middleware/validateRequest");
const bookingService = require("../service/gst.service");
const gstValidationSchema = require("./validation-schemas/gst-validations/addGstDetails.joi");
const gstStatusSchema = require("./validation-schemas/gst-validations/updateStatus.joi");

router.post(
  "/create",
  [fetchUser, validateRequest(gstValidationSchema)],
  bookingService.gstBooking
);

router.patch(
  "/update/:bookingId",
  [fetchUser, validateRequest(gstStatusSchema)],
  bookingService.updateGstBookingStatus
);

router.patch(
  "/user-details",
  [fetchUser, validateRequest(gstValidationSchema)],
  bookingService.updateGstBookingStatus
);

module.exports = router;
