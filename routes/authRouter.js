import express from "express";
import authControllers from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";
import isEmptyBody from "../middlewares/emptyBodyCheck.js";
import { authSigninSchema, authSignUpSchema } from "../schemas/authSchemas.js";
import authenticate from "../middlewares/authenticate.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  isEmptyBody,
  validateBody(authSignUpSchema),
  authControllers.signUp
);

authRouter.post(
  "/login",
  isEmptyBody,
  validateBody(authSigninSchema),
  authControllers.signIn
);

authRouter.post("/refresh", authControllers.refresh);

authRouter.post("/logout", authenticate, authControllers.signout);

export default authRouter;
