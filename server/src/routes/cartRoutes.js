import express from "express";
import {
  getCart,
  addToCart,
  updateCart,
  removeFromCart
} from "../controllers/cartController.js";

import verifyToken from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getCart);
router.post("/", verifyToken, addToCart);
router.put("/", verifyToken, updateCart);
router.delete("/:productId", verifyToken, removeFromCart);

export default router;