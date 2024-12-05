import express from "express";
import productControllers from "../controllers/productControllers.js";
import authenticate from "../middlewares/authenticate.js";

const productRouter = express.Router();

productRouter.use(authenticate);

productRouter.get("/", productControllers.getProducts);

productRouter.get("/:category", productControllers.getProductsByCategory);

export default productRouter;
