/** @format */

import { Router } from "express";
import * as loginCtr from "../controllers/auth.controller";
import {
  loginMiddleware,
  loginValidatorMiddleware,
} from "../middlewares/auth.middleware";
import { tokenMiddleware } from "../middlewares/user.middleware";

const router = Router();

router.post("/login", loginMiddleware, loginCtr.loginController);
router.post(
  "/validate-login",
  loginValidatorMiddleware,
  loginCtr.validateLoginController
);
router.post(
  "/reset-token",
  loginValidatorMiddleware,
  loginCtr.resetTokenController
);
router.post(
  "/logout",
  tokenMiddleware,
  loginValidatorMiddleware,
  loginCtr.logoutController
);

export default router;
