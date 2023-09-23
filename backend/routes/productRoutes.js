import express from "express";
import { protect } from "../middlerware/authMiddleware.js";
import { getAllProduct, getProductById, postProduct,getUserProduct,postOffer,getoffer } from "../controllers/productController.js";
const router = express.Router();

router
.post("/",postProduct);
router
.get("/allproduct",getAllProduct);
router.get("/:id",getProductById);
router.get("/userproducts/:id",getUserProduct);
router.post("/offer/:id",postOffer);
router.get("/offer/:id",getoffer);
export default router;