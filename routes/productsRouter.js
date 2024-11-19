import express from "express";
import productsControllers from "../controllers/productsControllers.js";
import authenticate from "../middlewares/authenticate.js";

const productsRouter = express.Router();

productsRouter.use(authenticate);

productsRouter.get("/", productsControllers.getProducts);

export default productsRouter;
