import express from "express";
import productsControllers from "../controllers/productsControllers.js";
import authenticate from "../middlewares/authenticate.js";

const productsRouter = express.Router();

productsRouter.use(authenticate);

productsRouter.get("/", productsControllers.getProducts);

productsRouter.get("/:category", productsControllers.getProductsByCategory);

productsRouter.get("/categories", productsControllers.getAllCategories);

export default productsRouter;
