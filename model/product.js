const { model, Schema } = require("mongoose");

const productSchema = new Schema({
  brand: String,
  model: String,
  cost: Number,
});

module.exports = model("product", productSchema);
