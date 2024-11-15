import ctrlWrapper from "../helpers/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import { getSomeProducts } from "../services/productServices.js";

const getProducts = async (req, res) => {
  const filter = {};
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const settings = { skip, limit };

  const products = await getSomeProducts({ filter, settings });

  if (!products) {
    throw HttpError(404, "Products not found");
  }

  res.json(products);
};

export default { getProducts: ctrlWrapper(getProducts) };
