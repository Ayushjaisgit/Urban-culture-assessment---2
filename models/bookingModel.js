const db = require("../db");

const createBooking = async (bookingData) => {
  const bookingRef = db.collection("bookings").doc();
  await bookingRef.set(bookingData);
  return { id: bookingRef.id, ...bookingData };
};

const updateBookingStatus = async (bookingId, status) => {
  const bookingRef = db.collection("bookings").doc(bookingId);
  await bookingRef.update({ status });
  return { id: bookingId, status };
};

const updateUserGstDetailsStatus = async (userId, data) => {
  const userRef = db.collection("users").doc(userId);
  await userRef.update({ ...data });
  return { userRef };
};

module.exports = {
  createBooking,
  updateBookingStatus,
  updateUserGstDetailsStatus,
};
