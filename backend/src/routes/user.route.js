import { Router } from "express";
import { loginUser, registeredUser, logoutUser } from "../controllers/user.controller.js";

const router = Router();


router.route("/register").post(registeredUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);

export default router;