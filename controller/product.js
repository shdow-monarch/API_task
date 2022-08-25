const Product = require("../model/product");
const _ = require("lodash");

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
    try {
      const product = await Product.findById(req.params.id);
      if (product !== null) {
        resp.status(200).json(product);
      } else {
        resp.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      resp.status(500).json({ message: error.message });
    }
  }

  async createProduct(req, resp) {
    let product;
    try {
      product = await Product.find({ model: req.body.model });
      const isExist = !_.isEmpty(product) ? true : false;
      if (!isExist) {
        let newProduct = Product(req.body);
        let result = await newProduct.save();
        resp.status(201).json(result);
      } else {
        return resp.status(400).json({ message: "Product already exist" });
      }
    } catch (error) {
      return resp.status(500).json({ message: error.message });
    }
  }

  async updateProduct(req, resp) {
    try {
      const checkProduct = await Product.findById(req.params.id);
      if (checkProduct !== null) {
        const product = await Product.find({ model: req.body.model });
        const isExist = !_.isEmpty(product) ? true : false;
        if (!isExist) {
          await Product.findByIdAndUpdate(req.params.id, req.body);
          resp.status(200).json(await Product.findById(req.params.id));
        } else {
          return resp.status(400).json({ message: "Product already exist" });
        }
      } else {
        return resp.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      return resp.status(500).json({ message: error.message });
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

module.exports = new ProductController();
