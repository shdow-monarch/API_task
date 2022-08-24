const Joi = require("joi");

module.exports = Joi.object({
  brand: Joi.string().required(),
  model: Joi.string().required(),
  cost: Joi.number().required(),
});
