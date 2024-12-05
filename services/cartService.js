import Cart from "../models/Cart.js";

export const addToCart = async (userId, productId, quantity = 1) => {
  let cart = await Cart.findOne({ owner: userId });

  if (!cart) {
    cart = await Cart.create({ owner: userId, items: [] });
  }

  const existingItem = cart.items.find(
    (item) => item.productId.toString() === productId
  );
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }

  await cart.save();
  return cart.populate("items.productId");
};

export const removeFromCart = async (userId, productId) => {
  const cart = await Cart.findOne({ owner: userId });

  if (!cart) {
    throw new Error("Cart not found for the user");
  }

  cart.items = cart.items.filter(
    (item) => item.productId.toString() !== productId
  );

  await cart.save();

  return cart.populate("items.productId");
};

export const clearCart = async (userId) => {
  const cart = await Cart.findOne({ owner: userId });

  if (!cart) {
    throw new Error("Cart not found for the user");
  }

  cart.items = [];

  await cart.save();

  return cart;
};

export const updateProductQuantity = async (userId, productId, quantity) => {
  if (quantity < 1) throw new Error("Quantity must be at least 1");

  const cart = await Cart.findOne({ owner: userId });

  if (!cart) {
    throw new Error("Cart not found for the user");
  }

  const productInCart = cart.items.find(
    (item) => item.productId.toString() === productId
  );

  if (!productInCart) {
    throw new Error("Product not found in cart");
  }
  productInCart.quantity = quantity;

  await cart.save();

  return cart.populate("items.productId");
};

export const getCartByUserId = async (userId) => {
  return Cart.findOne({ owner: userId }).populate("items.productId");
};
