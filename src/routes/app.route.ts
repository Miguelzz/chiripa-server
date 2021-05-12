/** @format */

import { Router } from "express";
import * as appCtrl from "../controllers/app.controller";
import { imagesMiddleware } from "../middlewares/images.middleware";
import { tokenMiddleware } from "../middlewares/auth.middleware";

const router = Router();
//, tokenMiddleware
router.get("/search/one", appCtrl.searchDemo);
router.get("/search/tow", tokenMiddleware, appCtrl.searchDemo);
router.get("/search/three", tokenMiddleware, appCtrl.searchDemo);
router.post(
  "/search/create",
  imagesMiddleware.array("files", 5),
  appCtrl.createDemo
);

export default router;
