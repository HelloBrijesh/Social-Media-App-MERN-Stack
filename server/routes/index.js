import express from "express";
import { loginController, logoutController, registerController, userController } from "../controller";
import auth from "../middleware/auth";
const router = express.Router();

router.post("/login", loginController.login);
router.post("/register", registerController.register);
router.post("/user", auth, userController.user);
router.post("/logout", auth, logoutController.logout);

export default router;
