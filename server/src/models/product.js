import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: {
    type: String,
    default: ""
  }
});

export default mongoose.model("Product", productSchema);