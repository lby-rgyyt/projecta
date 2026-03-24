import express from "express";
import "dotenv/config"
import connectDB from "./src/config/db.js";

import authRouter from "./src/routes/auth.routes.js";
import userRouter from "./src/routes/user.routes.js";
import productRouter from "./src/routes/product.routes.js";
import cartRouter from "./src/routes/cart.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("api/carts",cartRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
