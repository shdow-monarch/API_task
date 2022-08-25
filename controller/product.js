const ObjectID = require("mongodb").ObjectID;
const _ = require("lodash");
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
    const isIdValid = ObjectID.isValid(req.params.id);
    try {
      if (isIdValid) {
        const product = await Product.findById(req.params.id);
        if (product !== null) {
          resp.status(200).json(product);
        } else {
          resp.status(404).json({ message: "Product not found" });
        }
      } else {
        return resp.status(422).json({ message: "ObjectId is not valid" });
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
    const isIdValid = ObjectID.isValid(req.params.id);
    try {
      if (isIdValid) {
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
      } else {
        return resp.status(422).json({ message: "ObjectId is not valid" });
      }
    } catch (error) {
      resp.status(500).json({ message: error.message });
    }
  }

  async deleteProduct(req, resp) {
    const isIdValid = ObjectID.isValid(req.params.id);
    try {
      if (isIdValid) {
        const product = await Product.findById(req.params.id);
        if (product === null) {
          return resp.status(404).json({ message: "Product not found" });
        }
        await Product.findByIdAndDelete(req.params.id);
        resp.status(200).json({ message: "Product deleted successfully" });
      } else {
        return resp.status(422).json({ message: "ObjectId is not valid" });
      }
    } catch (error) {
      resp.status(500).json({ message: error.message });
    }
  }
}

module.exports = new ProductController();
