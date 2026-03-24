import { authentication, authorize } from "../middleware/auth.middleware.js";
import { getCart,updateCart } from "../controllers/cart.controller.js";
import { Router } from "express";

const router = Router();

router.get("/", authentication, getCart);
router.put("/",authentication,updateCart);

export default router;