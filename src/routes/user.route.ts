/** @format */

import { Router } from "express";
import * as userCtrl from "../controllers/user.controller";
import { imagesMiddleware } from "../middlewares/images.middleware";
import {
  tokenMiddleware,
  userMiddleware,
} from "../middlewares/user.middleware";

const router = Router();

router.get("/", tokenMiddleware, userCtrl.getUser);

router.post(
  "/photo",
  tokenMiddleware,
  imagesMiddleware.single("photo"),
  userCtrl.uploadPhoto
);

router.put("/names", tokenMiddleware, userCtrl.uploadNames);
router.put("/surnames", tokenMiddleware, userCtrl.uploadSurnames);
router.put("/email", tokenMiddleware, userCtrl.uploadEmail);
router.put("/address", tokenMiddleware, userCtrl.uploadAddress);
router.put("/birthday", tokenMiddleware, userCtrl.uploadBirthday);

export default router;
