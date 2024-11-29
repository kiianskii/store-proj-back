import ctrlWrapper from "../helpers/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import {
  addToCart,
  clearCart,
  removeFromCart,
  updateProductQuantity,
} from "../services/userServices.js";

const addProduct = async (req, res) => {
  const user = req.user;
  const { productId } = req.body;

  if (!productId) {
    throw HttpError(404, "productId is missing in request body");
  }

  const result = await addToCart(user._id, productId);

  res.status(201).json({
    cart: result.cart,
  });
};

const removeProduct = async (req, res) => {
  const { _id } = req.user;
  const { productId } = req.params;

  if (!productId) {
    throw HttpError(404, "productId is missing in request body");
  }

  const result = await removeFromCart(_id, productId);

  res.status(201).json({
    cart: result.cart,
  });
};

const removeAllProducts = async (req, res) => {
  const { _id } = req.user;

  const result = await clearCart(_id);

  res.status(201).json({
    cart: result.cart,
  });
};

const changeQuantity = async (req, res) => {
  const { _id } = req.user;
  const { productId } = req.params;
  const { quantity } = req.body;

  const result = await updateProductQuantity(_id, productId, quantity);

  res.status(201).json({
    cart: result.cart,
  });
};

export default {
  addProduct: ctrlWrapper(addProduct),
  removeProduct: ctrlWrapper(removeProduct),
  removeAllProducts: ctrlWrapper(removeAllProducts),
  changeQuantity: ctrlWrapper(changeQuantity),
};
