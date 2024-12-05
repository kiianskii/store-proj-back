import { Schema, model } from "mongoose";
import { handleError, setSettings } from "./hooks.js";

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    sale: { type: Boolean, required: true, default: false },
  },
  { versionKey: false }
);

productSchema.post("save", handleError);

productSchema.pre("findOneAndUpdate", setSettings);

productSchema.post("findOneAndUpdate", handleError);

const Product = model("product", productSchema);

export default Product;
