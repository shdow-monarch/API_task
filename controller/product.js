const Product = require("../model/product");

class ProductController {
  async getAllProduct(_, resp) {
    try {
      const products = await Product.find();
      resp.status(200).json(products);
    } catch (error) {
      resp.status(500).json({ message: error.message });
    }
  }

  async getProduct(req, resp) {
    await findProduct(req, resp);
    const product = await Product.findById(req.params.id);
    resp.status(200).json(product);
  }

  async createProduct(req, resp) {
    let newProduct = Product(req.body);
    let result = await newProduct.save();
    resp.status(201).json(result);
  }

  async updateProduct(req, resp) {
    await findProduct(req, resp);
    try {
      await Product.findByIdAndUpdate(req.params.id, req.body);
      resp.status(200).json(await Product.findById(req.params.id));
    } catch (error) {
      return resp.status(400).json({ message: error.message });
    }
  }

  async deleteProduct(req, resp) {
    try {
      const product = await Product.findById(req.params.id);
      if (product === null) {
        return resp.status(404).json({ message: "Product not found" });
      }
      await Product.findByIdAndDelete(req.params.id);
      resp.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      resp.status(500).json({ message: error.message });
    }
  }
}

async function findProduct(req, resp) {
  let product;
  try {
    product = await Product.findById(req.params.id);
    if (product === null) {
      return resp.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    return resp.status(500).json({ message: error.message });
  }
}

module.exports = new ProductController();
