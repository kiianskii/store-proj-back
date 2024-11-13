import ctrlWrapper from "../helpers/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import { getAllProducts } from "../services/productServices.js";

const getProducts = async (req, res) => {
  const products = await getAllProducts();

  if (!products) {
    throw HttpError(404, "Products not found");
  }

  res.json(products);
};

export default { getProducts: ctrlWrapper(getProducts) };
