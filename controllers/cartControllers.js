import ctrlWrapper from "../helpers/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import {
  addToCart,
  clearCart,
  removeFromCart,
  updateProductQuantity,
} from "../services/cartService.js";

const addProduct = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.body;

  if (!productId) {
    throw HttpError(400, "productId is missing in request body");
  }

  const cart = await addToCart(userId, productId);

  res.status(201).json({ cart });
};

const removeProduct = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.params;

  if (!productId) {
    throw HttpError(400, "productId is missing in request parameters");
  }

  const cart = await removeFromCart(userId, productId);

  res.status(200).json({ cart });
};

const removeAllProducts = async (req, res) => {
  const userId = req.user._id;

  const cart = await clearCart(userId);

  res.status(200).json({ cart });
};

const changeQuantity = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.params;
  const { quantity } = req.body;

  if (!quantity || quantity < 1) {
    throw HttpError(400, "Invalid quantity value");
  }

  const cart = await updateProductQuantity(userId, productId, quantity);

  res.status(200).json({ cart });
};

export default {
  addProduct: ctrlWrapper(addProduct),
  removeProduct: ctrlWrapper(removeProduct),
  removeAllProducts: ctrlWrapper(removeAllProducts),
  changeQuantity: ctrlWrapper(changeQuantity),
};
