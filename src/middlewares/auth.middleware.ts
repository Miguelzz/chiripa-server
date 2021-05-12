/** @format */
import jwt from "jsonwebtoken";
import env from "../env";
import { ErrorMessage, RouteParams } from "../utils/types";

export const tokenMiddleware: RouteParams = async (req, res, next) => {
  try {
    const token = req.headers["x-token"] as string;
    const decoded = jwt.verify(token, env.jwtSecret!) as any;
    req.userId = decoded.id;
    next();
  } catch (e) {
    res.status(403).send({
      message: "invalid token",
    } as ErrorMessage);
  }
};

export const urlMiddleware: RouteParams = async (req, res, next) => {
  res.status(404).json({
    message: `url "${req.url}" does not exist.`,
  } as ErrorMessage);
};
