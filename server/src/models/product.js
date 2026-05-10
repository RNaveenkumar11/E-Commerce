import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: {
  type: String,
  required: true
},
  description: {
    type: String,
    default: ""
  }
});

export default mongoose.model("Product", productSchema);