import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRouter from "./routes/authRouter.js";
import productRouter from "./routes/productRouter.js";
import cartRouter from "./routes/cartRouter.js";

dotenv.config();

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/cart", cartRouter);
app.use("/api/products", productRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

const { DB_HOST, PORT } = process.env;
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
