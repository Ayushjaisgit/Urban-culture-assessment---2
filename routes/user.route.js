const express = require("express");
const router = express.Router();
const userService = require("../service/user.service");
const validateRequest = require("../middleware/validateRequest");
const registerSchema = require("./validation-schemas/users/signupSchema.joi");
const loginSchema = require("./validation-schemas/users/loginSchema.joi");

router.post(
  "/register",
  validateRequest(registerSchema),
  userService.userRegistration
);

router.post("/login", validateRequest(loginSchema), userService.userLogin); 

module.exports = router;
