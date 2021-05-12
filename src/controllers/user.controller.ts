/** @format */

import { User } from "../repositories/user.repository";
import { ErrorMessage, RouteParams } from "../utils/types";
import isEmail from "validator/lib/isEmail";
import isDate from "validator/lib/isDate";
import { cloudinary } from "../connections/cloundinary";
import { IUser } from "../models/user";
import { IImage } from "../models/demo";

const formatValue = (value: string = "") =>
  value.toLowerCase().replace(/\s+/g, " ").trim();

export const getUser: RouteParams = async (req, res) => {
  const user = await User.findById(req.userId);
  res.json(user);
};

export const uploadPhoto: RouteParams = async (req, res) => {
  const user = (await User.findById(req.userId)) as IUser;

  if (!user)
    res.status(500).send({
      message: "user not find",
    } as ErrorMessage);
  else {
    if (user.photo) {
      await cloudinary.uploader.destroy(user.photo.public_id, (result) => {
        console.log(result);
      });
    }

    const newImage = await new Promise<IImage>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ format: "jpg" }, (err, res) => {
          if (err) reject(err);
          else resolve(res as any);
        })
        .end(req.file.buffer);
    });

    await User.findOneAndUpdate({ _id: req.userId }, { photo: newImage });
    res.json(newImage.secure_url);
  }
};

export const uploadNames: RouteParams = async (req, res) => {
  const names = formatValue(req.body.names);
  await User.findOneAndUpdate({ _id: req.userId }, { names });
  res.json(true);
};

export const uploadSurnames: RouteParams = async (req, res) => {
  const surnames = formatValue(req.body.surnames);
  await User.findOneAndUpdate({ _id: req.userId }, { surnames });
  res.json(true);
};

export const uploadEmail: RouteParams = async (req, res) => {
  const email = formatValue(req.body.email);
  if (isEmail(email)) {
    await User.findOneAndUpdate({ _id: req.userId }, { email });
    res.json(true);
  } else {
    res.status(403).send({
      message: "Invalid email!",
    } as ErrorMessage);
  }
};

export const uploadAddress: RouteParams = async (req, res) => {
  const address = formatValue(req.body.address);
  await User.findOneAndUpdate({ _id: req.userId }, { address });
  res.json(true);
};

export const uploadBirthday: RouteParams = async (req, res) => {
  const birthday = req.body.birthday;
  if (isDate(birthday)) {
    await User.findOneAndUpdate({ _id: req.userId }, { birthday });
    res.json(true);
  } else {
    res.status(403).send({
      message: "Invalid birthday!",
    } as ErrorMessage);
  }
};

export const createUser: RouteParams = (req, res) => {
  res.json("phone");
};
