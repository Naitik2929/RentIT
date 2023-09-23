import mongoose from "mongoose";
import User from "./userModel.js";
import Category from "./categoryModel.js";
const productSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
        
      },
      category: {
        type: String,
      },
      image: {
        type: String,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      price: {
        type: Number,
        required: true,
      },
      offers: {
        type: [{user: mongoose.Schema.Types.ObjectId, offerprice: Number,username: String}]
      }
    }
  );
  
  const Product = mongoose.model("Product", productSchema);
export default Product;