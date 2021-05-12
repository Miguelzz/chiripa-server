/** @format */

import { Router } from "express";
import * as profileCtrl from "../controllers/profile.controller";
import { imagesMiddleware } from "../middlewares/images.middleware";
import { tokenMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", tokenMiddleware, profileCtrl.getProfile);
router.post("/", tokenMiddleware, profileCtrl.createProfile);

// router.post(
//   "/photo",
//   tokenMiddleware,
//   imagesMiddleware.single("photo"),
//   profileCtrl.uploadPhoto
// );

export default router;
