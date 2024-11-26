import express from "express";

import authenticate from "../middlewares/authenticate.js";
import isEmptyBody from "../middlewares/emptyBodyCheck.js";
import userControllers from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.use(authenticate);

userRouter.post("/cart", isEmptyBody, userControllers.addProduct);
userRouter.delete("/cart/:productId", userControllers.removeProduct);
userRouter.post("/cart/all", userControllers.removeAllProducts);

export default userRouter;
