const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");

admin.initializeApp();
const db = admin.firestore();

// GST Calculation Helper Function
const calculateGST = (amount) => {
  const gstRate = 18;
  const gstAmount = (amount * gstRate) / 100;
  return {
    IGST: gstAmount / 2,
    SGST: gstAmount / 4,
    CGST: gstAmount / 4,
  };
};

// Firestore Trigger Function
exports.processGSTInvoice = functions.firestore
  .document("bookings/{bookingId}")
  .onUpdate(async (change, context) => {
    const beforeValue = change.before.data();
    const newValue = change.after.data();

    if (beforeValue.status === "Finished" || newValue.status !== "Finished")
      return;

    const { name, totalBookingAmount } = newValue;
    const gstDetails = calculateGST(totalBookingAmount);

    try {
      //----------------------------------------------------

      // I wanted to use MasterGST API but, it needs 10 days to process my request to give me the access of the testing environment and sandbox so i couldn't completely implement it in this application as of now, but will implement it as soon as i get the access for learning purposes

      //----------------------------------------------------

      const response = await axios.post(
        "https://api.mastergst.com/file",
        {
          name,
          totalBookingAmount,
          gstDetails,
          //user gst details
        },
        {
          headers: { Authorization: `Bearer api key` },
        }
      );

      console.log("GST Filing Response:", response.data);
      await db.collection("bookings").doc(context.params.bookingId).update({
        gstFiled: true,
      });
    } catch (error) {
      console.error("Error filing GST:", error);
    }
  });
