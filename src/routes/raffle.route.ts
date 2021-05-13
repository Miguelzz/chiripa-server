/** @format */

import { Router } from "express";
import * as raffleCtrl from "../controllers/raffle.controller";
import { imagesMiddleware } from "../middlewares/images.middleware";
import { tokenMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", tokenMiddleware, raffleCtrl.getRaffle);
router.get("/search/", tokenMiddleware, raffleCtrl.searchRaffle);
router.post("/buy/", tokenMiddleware, raffleCtrl.buyTicket);
router.get("/bets/", tokenMiddleware, raffleCtrl.getBets);
//router.get("/draws/", tokenMiddleware, raffleCtrl.getBets);
router.post(
  "/",
  tokenMiddleware,
  imagesMiddleware.array("files"),
  raffleCtrl.createRaffle
);

export default router;
