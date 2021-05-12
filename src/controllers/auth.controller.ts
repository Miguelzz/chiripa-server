/** @format */

import jwt from "jsonwebtoken";
import env from "../env";
import { LoginInput } from "../middlewares/auth.middleware";
import { State, TypeRegister } from "../models/user";
import { App } from "../repositories/app.repository";
import { City, Country } from "../repositories/country.repository";
import { User } from "../repositories/user.repository";
import { ErrorMessage, RouteParams } from "../utils/types";

export const loginController: RouteParams<LoginInput> = async (req, res) => {
  const { prefix, phone, code, appName } = req.body;
  const isUser = await User.findOneAndUpdate({ phone, prefix }, { code });

  if (isUser === null) {
    const app = await App.findOne({ name: appName });
    const country = await Country.findOne({ callingCodes: prefix });
    const city = await City.findOne({ iso3: country?.cioc || "" });

    await new User({
      typeRegister: TypeRegister.PHONE,
      phone,
      prefix,
      state: State.BEFORE_ACTIVE,
      code,
      country: country?.id,
      city: city?.id,
      apps: [app?.id],
    }).save();
  }

  res.json(true);
};

export const logoutController: RouteParams<LoginInput> = async (req, res) => {
  const { prefix, phone, code } = req.body;

  await User.findOneAndUpdate(
    { phone, prefix, previousCode: code },
    { code: 0, previousCode: 0 }
  );

  res.json(true);
};

export const validateLoginController: RouteParams<LoginInput> = async (
  req,
  res
) => {
  const { prefix, phone, code } = req.body;

  const user = await User.findOne({ phone, prefix, code });

  if (!user || code === 0)
    res.status(500).json({
      message: "código incorrecto!",
    } as ErrorMessage);
  else {
    let token = jwt.sign({ id: user.id }, env.jwtSecret, {
      expiresIn: "5m",
    });
    await User.updateOne(
      { _id: user.id },
      {
        authenticated: true,
        state: State.ACTIVE,
        code: 0,
        previousCode: code,
      }
    );

    res.json({ token, expiresAt: 60 * 5 });
  }
};

export const resetTokenController: RouteParams<LoginInput> = async (
  req,
  res
) => {
  const { prefix, phone, code } = req.body;

  const user = await User.findOne({ phone, prefix, previousCode: code });

  if (!user)
    res.status(500).json({
      message: "código incorrecto!",
    } as ErrorMessage);
  else {
    let token = jwt.sign({ id: user.id }, env.jwtSecret, {
      expiresIn: "2h",
    });

    res.json({ token, expiresAt: 60 * 60 * 2 });
  }
};
