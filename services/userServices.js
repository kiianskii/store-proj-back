import User from "../models/User.js";
import Product from "../models/Products.js";

export const findUser = (filter) => User.findOne(filter).populate("cart");

export const updateUser = (filter, data) =>
  User.findOneAndUpdate(filter, data).populate("cart");

export const signup = (data) => User.create(data);

export const addToCart = (userId, productId) => {
  return User.findByIdAndUpdate(
    userId,
    { $addToSet: { cart: productId } },
    { new: true }
  ).populate("cart");
};

export const removeFromCart = async (userId, productId) => {
  return User.findByIdAndUpdate(
    userId,
    { $pull: { cart: productId } },
    { new: true }
  ).populate("cart");
};

export const clearCart = async (userId) => {
  return User.findByIdAndUpdate(userId, { cart: [] }, { new: true }).populate(
    "cart"
  );
};
