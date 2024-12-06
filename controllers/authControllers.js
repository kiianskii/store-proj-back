import HttpError from "../helpers/HttpError.js";
import bcrypt from "bcrypt";

import * as authService from "../services/userService.js";
import * as cartService from "../services/cartService.js";
import { createToken } from "../helpers/jwt.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { JWT_SECRET } = process.env;

const signUp = async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.findUser({ email });

  if (user) {
    throw HttpError(409, "User with this email already exist");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await authService.signup({
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

  const user = await authService.findUser({ email });

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

  await authService.updateUser({ _id: user._id }, { token });

  const cart = await cartService.getCartByUserId(user._id);

  res.json({
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      cart: cart?.items || [],
    },
  });
};

const signout = async (req, res) => {
  const { _id } = req.user;
  await authService.updateUser({ _id }, { token: "" });

  res.json({
    message: "Logout success",
  });
};

const refresh = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw HttpError(401, "Authorization header is missing or invalid");
  }

  const token = authHeader.split(" ")[1];

  let decoded;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      decoded = jwt.decode(token);
      if (!decoded || !decoded.id) {
        throw HttpError(401, "Invalid token");
      }
    } else {
      throw HttpError(401, "Invalid token");
    }
  }

  const userId = decoded.id;

  const user = await authService.findUser({ _id: userId });
  if (!user) {
    throw HttpError(404, "User not found");
  }

  const newToken = createToken({ id: user._id });

  await authService.updateUser({ _id: user._id }, { token: newToken });

  const cart = await cartService.getCartByUserId(user._id);

  res.json({
    token: newToken,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      cart: cart?.items || [],
    },
  });
};

export default {
  signUp: ctrlWrapper(signUp),
  signIn: ctrlWrapper(signIn),
  signout: ctrlWrapper(signout),
  refresh: ctrlWrapper(refresh),
};
