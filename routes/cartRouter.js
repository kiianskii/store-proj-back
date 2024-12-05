import express from "express";

import authenticate from "../middlewares/authenticate.js";
import isEmptyBody from "../middlewares/emptyBodyCheck.js";
import cartControllers from "../controllers/cartControllers.js";

const cartRouter = express.Router();

cartRouter.use(authenticate);

cartRouter.post("/", isEmptyBody, cartControllers.addProduct);
cartRouter.delete("/:productId", cartControllers.removeProduct);
cartRouter.post("/all", cartControllers.removeAllProducts);
cartRouter.post("/:productId", isEmptyBody, cartControllers.changeQuantity);

export default cartRouter;
