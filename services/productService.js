import Product from "../models/Product.js";

export const getSomeProducts = (params = {}) => {
  const { filter, fields, settings } = params;
  return Product.find(filter, fields, settings);
};

export const getUniqueCategories = async () => {
  return Product.distinct("category");
};
