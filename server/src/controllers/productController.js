import Product from "../models/product.js";
import fs from "fs";
import path from "path";


export const createProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;

    const newProduct = new Product({
      name,
      price,
      description,
      image: req.file?.filename
    });

    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: "Error creating product" });
  }
};


export const getProducts = async (req, res) => {
  try {
    const { q } = req.query; 

    let filter = {};

    if (q) {
      filter = {
        name: { $regex: q, $options: "i" } 
      };
    }

    const products = await Product.find(filter);

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products" });
  }
};


export const updateProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;

    const updatedData = {
      name,
      price,
      description
    };

    if (req.file) {
      updatedData.image = req.file.filename;
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating product" });
  }
};


export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product?.image) {
    fs.unlink(path.join("uploads", product.image), () => {});
  }
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted successfully" });
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Error fetching product" });
  }
};