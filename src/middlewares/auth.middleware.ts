/** @format */

import { Validator } from "fluentvalidation-ts";
import { sendMessage } from "../connections/twilio";
import { isValid, listErrors, mapperProps } from "../utils/methods";
import { ErrorMessage, RouteParams } from "../utils/types";

export type LoginInput = {
  phone: string;
  prefix: string;
  message: string;
  code: number;
};

class AuthValidator extends Validator<LoginInput> {
  constructor() {
    super();

    this.ruleFor("phone")
      .notNull()
      .must((phone) => /^[0-9]{1,14}$/.test(phone!.toString()))
      .withMessage("there was an error in the value");

    this.ruleFor("prefix")
      .notNull()
      .must((prefix) => /^\+?[0-9]{1,4}$/.test(prefix!.toString()))
      .withMessage("there was an error in the value");

    this.ruleFor("message")
      .notNull()
      .withMessage("there was an error in the value");

    this.ruleFor("code")
      .notNull()
      .must((code) => /^[0-9]{1,4}$/.test(code!.toString()))
      .withMessage("there was an error in the value");
  }
}

export const loginMiddleware: RouteParams<LoginInput> = async (
  req,
  res,
  next
) => {
  const result = mapperProps(
    new AuthValidator().validate(req.body),
    "prefix",
    "phone",
    "message"
  );

  if (isValid(result)) {
    try {
      const { prefix, phone, message, app } = req.body;
      const code = Math.floor(Math.random() * 8999 + 1000);
      const messageFull = /\[code\]/.test(message)
        ? message
        : `${message} [code]`;

      req.body = {
        phone: phone.trim(),
        prefix: prefix.replace(/[+\D]/, "").trim(),
        message: messageFull.replace(/\[code\]/, code).trim(),
        code,
        app,
      };

      // console.log("***********");
      // console.log(code);
      // console.log("***********");

      await sendMessage(
        `+${req.body.prefix}${req.body.phone}`,
        req.body.message!
      );
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

export const loginValidatorMiddleware: RouteParams<LoginInput> = async (
  req,
  res,
  next
) => {
  const result = mapperProps(
    new AuthValidator().validate(req.body),
    "prefix",
    "phone",
    "code"
  );

  if (isValid(result)) {
    const { phone, prefix, code } = req.body;
    req.body = {
      phone: phone.trim(),
      prefix: prefix.replace(/[+\D]/, "").trim(),
      code: Number(code),
    };
    next();
  } else
    res.status(403).send({
      message: "Invalid data !",
      errors: listErrors(result),
    } as ErrorMessage);
};

export const urlMiddleware: RouteParams = async (req, res, next) => {
  res.status(404).json({
    message: `url "${req.url}" does not exist.`,
  } as ErrorMessage);
};
