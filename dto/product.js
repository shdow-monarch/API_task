const Joi = require("joi");

module.exports = Joi.object({
  model: Joi.string().required(),
  processor: Joi.string().required(),
  cost: Joi.number().required(),
});
