//Rutas de productos
import { Router } from "express";

const router = Router();

import * as ProductController from "../controllers/products.controller.js";

router.get("/", ProductController.getAllProducts);

router.get("/:id", ProductController.getProductById);

router.post("/create", ProductController.createProduct);

router.delete("/:id", ProductController.deleteProduct);

router.get("/search/:name", ProductController.searchProduct);

export default router;