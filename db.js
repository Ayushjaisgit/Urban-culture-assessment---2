const admin = require("firebase-admin");

// Load Firebase credentials
const serviceAccount = require("./urban-culture-assessment-ayush-firebase-adminsdk-fbsvc-1a6e03ba72.json"); // 🔹 Ensure this file exists!

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// 🔹 Test Firestore connection
(async () => {
  try {
    await db.collection("test").doc("connectionTest").set({ status: "connected", timestamp: new Date() });
    console.log("✅ Firestore connection established successfully!");
  } catch (error) {
    console.error("❌ Firestore connection failed:", error);
  }
})();

module.exports = db;
