const Joi = require("joi");

const gstValidationSchema = Joi.object({
  gstin: Joi.string()
    .length(15)
    .pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/)
    .required()
    .messages({
      "string.pattern.base": "Invalid GSTIN format",
      "string.length": "GSTIN must be exactly 15 characters long",
      "any.required": "GSTIN is required",
    }),

  pan: Joi.string()
    .length(10)
    .pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)
    .required()
    .messages({
      "string.pattern.base": "Invalid PAN format",
      "string.length": "PAN must be exactly 10 characters long",
      "any.required": "PAN is required",
    }),

  businessName: Joi.string().min(3).max(100).required().messages({
    "string.empty": "Business name is required",
    "string.min": "Business name must be at least 3 characters",
    "string.max": "Business name must be at most 100 characters",
  }),

  businessType: Joi.string()
    .valid("Sole Proprietorship", "Partnership", "LLP", "Private Limited", "Public Limited", "Other")
    .required()
    .messages({
      "any.only": "Invalid business type",
      "any.required": "Business type is required",
    }),

  taxpayerType: Joi.string()
    .valid("Regular", "Composition Scheme", "Casual Taxpayer")
    .required()
    .messages({
      "any.only": "Invalid taxpayer type",
      "any.required": "Taxpayer type is required",
    }),
});

module.exports = gstValidationSchema;
