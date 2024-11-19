import HttpError from "../helpers/HttpError.js";
import bcrypt from "bcrypt";

import * as authServices from "../services/userServices.js";
import { createToken } from "../helpers/jwt.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const signUp = async (req, res) => {
  const { email, password } = req.body;
  const user = await authServices.findUser({ email });

  if (user) {
    throw HttpError(409, "User with this email already exist");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await authServices.signup({
    ...req.body,
    password: hashPassword,
  });
  res.status(201).json({
    id: newUser._id,
    username: newUser.username,
    email: newUser.email,
  });
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await authServices.findUser({ email });

  if (!user) {
    throw HttpError(401, "User not found");
  }

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) {
    throw HttpError(401, "Email or password is invalid");
  }

  const payload = {
    id: user._id,
  };

  const token = createToken(payload);

  await authServices.updateUser({ _id: user._id }, { token });

  res.json({
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      cart: user.cart,
    },
  });
};

const getCurrent = (req, res) => {
  const { email, username, _id } = req.user;

  res.json({
    id: _id,
    username,
    email,
  });
};

const signout = async (req, res) => {
  const { _id } = req.user;
  await authServices.updateUser({ _id }, { token: "" });

  res.json({
    message: "Logout success",
  });
};

export default {
  signUp: ctrlWrapper(signUp),
  signIn: ctrlWrapper(signIn),
  getCurrent: ctrlWrapper(getCurrent),
  signout: ctrlWrapper(signout),
};
