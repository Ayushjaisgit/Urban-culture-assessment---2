const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// User Registration
const userRegistration = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const usersRef = db.collection("users");
    const userSnapshot = await usersRef.where("email", "==", email).get();

    if (!userSnapshot.empty) {
      return res.status(400).json({ error: "The entry has already been created" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(password, salt);

    // Create user
    const newUserRef = usersRef.doc(); // Auto-generate an ID
    await newUserRef.set({
      name,
      email,
      password: securePassword,
    });

    // Generate Token
    const getToken = await generateAuthToken(newUserRef.id, name, email);
    return res.status(200).json({ token: getToken, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// User Login
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const usersRef = db.collection("users");
    const userSnapshot = await usersRef.where("email", "==", email).get();

    if (userSnapshot.empty) {
      return res.status(400).json({ error: "Invalid email. Please try again" });
    }

    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();

    // Verify password
    const verifyPassword = await bcrypt.compare(password, userData.password);

    if (!verifyPassword) {
      return res.status(400).json({ error: "Incorrect Password. Please try again" });
    }

    // Generate Token
    const getToken = await generateAuthToken(userDoc.id, userData.user_name, userData.email);
    return res.status(200).json({ token: getToken, success: true });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
};

// Generate JWT Token
const generateAuthToken = async (userId, user_name, email) => {
  try {
    const data = {
      user: {
        _id: userId,
        user_name,
        email,
      },
    };

    return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "1h" });
  } catch (error) {
    console.error(error);
    throw new Error("Token generation failed");
  }
};

module.exports = { userRegistration, userLogin };
