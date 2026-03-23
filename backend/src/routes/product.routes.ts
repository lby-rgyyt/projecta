import { authentication, authorize } from "../middleware/auth.middleware.js";
import {
  createProduct,
  getListProducts,
  updateProduct,
  deleteProduct,
  getProduct,
} from "../controllers/product.controller.js";
import { Router } from "express";

const router = Router();

router.post("/", authentication, authorize("vendor"), createProduct);
router.get("/", getListProducts);
router.get("/:id", getProduct);
router.put("/:id", authentication, authorize("vendor"), updateProduct);
router.delete("/:id", authentication, authorize("vendor"), deleteProduct);

export default router;
