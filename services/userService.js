import User from "../models/User.js";

export const findUser = (filter) =>
  User.findOne(filter).populate("cart.productId");

export const updateUser = (filter, data) =>
  User.findOneAndUpdate(filter, data).populate("cart.productId");

export const signup = (data) => User.create(data);

export const addToCart = (userId, productId, quantity = 1) => {
  return User.findByIdAndUpdate(
    userId,
    { $addToSet: { cart: { productId, quantity } } },
    { new: true }
  ).populate("cart.productId");
};

export const removeFromCart = async (userId, productId) => {
  return User.findByIdAndUpdate(
    userId,
    { $pull: { cart: { productId } } },
    { new: true }
  ).populate("cart.productId");
};

export const clearCart = async (userId) => {
  return User.findByIdAndUpdate(userId, { cart: [] }, { new: true });
};

export const updateProductQuantity = async (userId, productId, quantity) => {
  if (quantity < 1) throw new Error("Quantity must be at least 1");

  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const productInCart = user.cart.find(
    (item) => item.productId.toString() === productId
  );
  if (!productInCart) throw new Error("Product not found in cart");

  productInCart.quantity = quantity;

  await user.save();
  return user.populate("cart.productId");
};
