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

    token: String,
  },
  { versionKey: false }
);

userSchema.post("save", handleError);

userSchema.pre("findOneAndUpdate", setSettings);

userSchema.post("findOneAndUpdate", handleError);

const User = model("user", userSchema);

export default User;
