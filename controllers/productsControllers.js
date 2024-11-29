import ctrlWrapper from "../helpers/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import {
  getSomeProducts,
  getUniqueCategories,
} from "../services/productServices.js";

const getProducts = async (req, res) => {
  const filter = {};
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const settings = { skip, limit };

  const products = await getSomeProducts({ filter, settings });

  const categories = await getUniqueCategories();

  const productsOnSale = await getSomeProducts({ filter: { sale: true } });

  if (!products) {
    throw HttpError(404, "Products not found");
  }

  res.json({
    products: products,
    categories: categories,
    sale: productsOnSale,
  });
};

const getProductsByCategory = async (req, res) => {
  const { category } = req.params;
  const filter = { category };

  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const settings = { skip, limit };

  const products = await getSomeProducts({ filter, settings });

  if (!products) {
    throw HttpError(404, "Products in this category not found");
  }

  const categories = await getUniqueCategories();

  res.json({ products: products, categories: categories });
};

export default {
  getProducts: ctrlWrapper(getProducts),
  getProductsByCategory: ctrlWrapper(getProductsByCategory),
};
