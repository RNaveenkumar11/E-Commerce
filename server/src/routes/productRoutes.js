import express from "express";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductById
} from "../controllers/productController.js";

import authorizeRoles from '../middlewares/roleMiddleware.js'
import verifyToken from "../middlewares/authMiddleware.js";


const router = express.Router();


router.get("/", getProducts);
router.get("/:id", getProductById);


router.post(
  "/",
  verifyToken,
  authorizeRoles("admin"),
  
  createProduct
);

router.put(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  
  updateProduct
);

router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  deleteProduct
);

export default router;