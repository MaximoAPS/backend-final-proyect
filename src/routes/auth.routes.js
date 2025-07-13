//Rutas de autenticación
import { Router } from "express";
import { requireAuth, requireNoAuth } from "../middlewares/auth.middleware.js";
import * as AuthController from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", requireNoAuth, AuthController.registerUser);

router.post("/login", requireNoAuth, AuthController.loginUser);

router.post("/logout", requireAuth, AuthController.logoutUser);

router.delete("/:id", requireAuth, AuthController.deleteUser);

export default router;
