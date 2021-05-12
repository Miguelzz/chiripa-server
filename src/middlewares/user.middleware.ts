/** @format */
import jwt from "jsonwebtoken";
import env from "../env";
import { IUser } from "../models/user";
import { ErrorMessage, RouteParams } from "../utils/types";
import { Validator } from "fluentvalidation-ts";
import { isValid, listErrors, mapperProps } from "../utils/methods";

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

export type UserInput = {
  names: string;
  surnames: string;
  email: string;
  address: string;
  birthday: Date;
};

class AuthValidator extends Validator<UserInput> {
  constructor() {
    super();

    this.ruleFor("names")
      .notEmpty()
      .withMessage("there was an error in the value");

    this.ruleFor("surnames")
      .notEmpty()
      .withMessage("there was an error in the value");

    this.ruleFor("email")
      .emailAddress()
      .withMessage("there was an error in the value");

    this.ruleFor("birthday")
      .notNull()
      //.must((x) => x <= new Date())
      .withMessage("there was an error in the value");
  }
}

export const userMiddleware: RouteParams<UserInput> = async (
  req,
  res,
  next
) => {
  console.log(req.body);
  const result = mapperProps(
    new AuthValidator().validate(req.body),
    "names",
    "surnames",
    "email",
    "birthday"
  );

  if (isValid(result)) {
    try {
      const { names, surnames, email, address, birthday } = req.body;
      req.body = {
        names: names?.replace(/\s/, " ").trim(),
        surnames: surnames?.replace(/\s/, " ").trim(),
        email: email?.replace(/\s/, " ").trim(),
        address: address?.replace(/\s/, " ").trim(),
        birthday,
      };

      next();
    } catch (err) {
      res.status(500).send({
        message: err.toString(),
      } as ErrorMessage);
    }
  } else
    res.status(403).send({
      message: "Invalid data !",
      errors: listErrors(result),
    } as ErrorMessage);
};
