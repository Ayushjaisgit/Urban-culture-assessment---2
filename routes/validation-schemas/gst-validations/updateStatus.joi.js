const Joi = require("joi");

const gstStatusSchema = Joi.object({
  Status: Joi.string().valid("Finished", "Cancelled").required().messages({
    "any.only": "Invalid Status type",
    "any.required": "Business type is required",
  }),
});

module.exports = gstStatusSchema;
