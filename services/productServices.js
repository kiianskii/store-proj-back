import Product from "../models/Products.js";

export const getAllProducts = () => Product.find();
