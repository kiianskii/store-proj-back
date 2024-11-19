import User from "../models/User.js";

export const findUser = (filter) => User.findOne(filter);

export const updateUser = (filter, data) => User.findOneAndUpdate(filter, data);

export const signup = (data) => User.create(data);

export const addToCart = (userId, productId) => {
  return User.findByIdAndUpdate(
    userId,
    { $addToSet: { cart: productId } },
    { new: true }
  );
};

export const removeFromCart = async (userId, productId) => {
  return User.findByIdAndUpdate(
    userId,
    { $pull: { cart: productId } },
    { new: true }
  );
};

export const clearCart = async (userId) => {
  return User.findByIdAndUpdate(userId, { cart: [] }, { new: true });
};
