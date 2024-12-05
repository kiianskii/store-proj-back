import { Schema, model } from "mongoose";
import { handleError, setSettings } from "./hooks.js";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      required: [true, "Email is required"],
      unique: true,
    },
    cart: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    token: String,
  },
  { versionKey: false }
);

userSchema.post("save", handleError);

userSchema.pre("findOneAndUpdate", setSettings);

userSchema.post("findOneAndUpdate", handleError);

const User = model("user", userSchema);

export default User;
