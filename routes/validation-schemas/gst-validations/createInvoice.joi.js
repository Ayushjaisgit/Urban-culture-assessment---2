const Joi = require("joi");

const gstStatusSchema = Joi.object({
  name: Joi.string()
  .length(20)
  .pattern(/^[A-Z]{5}[a-z]{1}$/)
  .required()
  .messages({
    "string.pattern.base": "Invalid Name format",
    "string.length": "Name must be atleast 3 characters long",
    "any.required": "Name is required",
  }),
  totalBookingAmount: Joi.number()
  .length(10)
  .pattern(/^[0-9]/)
  .required()
  .messages({
    "string.pattern.base": "Invalid Amount format",
    "string.length": "Amount must be atleast 1 number long",
    "any.required": "Amount is required",
  }),
});

module.exports = gstStatusSchema;
