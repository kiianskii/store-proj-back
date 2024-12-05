import { Schema, model } from "mongoose";
import { handleError, setSettings } from "./hooks.js";

const cartItemSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
  quantity: { type: Number, required: true, default: 1 },
});

const cartSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
    },
    items: [cartItemSchema],
  },
  { timestamps: true }
);

cartSchema.post("save", handleError);

cartSchema.pre("findOneAndUpdate", setSettings);

cartSchema.post("findOneAndUpdate", handleError);

const Cart = model("cart", cartSchema);

export default Cart;
