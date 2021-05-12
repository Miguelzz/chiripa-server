/** @format */
import fetch from "node-fetch";

import { Profile } from "../repositories/profile.repository";
import { ErrorMessage, RouteParams } from "../utils/types";
import { cloudinary } from "../connections/cloundinary";
import { IUser } from "../models/user";
import { IImage } from "../models/shared";
import { IProfile } from "../models/profile";
export const getProfile: RouteParams = async (req, res) => {
  const user = await Profile.findById(req.userId);
  res.json(user);
};

// export const uploadPhoto: RouteParams = async (req, res) => {
//   const user = (await User.findById(req.userId)) as IUser;

//   if (!user)
//     res.status(500).send({
//       message: "user not find",
//     } as ErrorMessage);
//   else {
//     if (user.photo) {
//       await cloudinary.uploader.destroy(user.photo.public_id, (result) => {
//         console.log(result);
//       });
//     }

//     const newImage = await new Promise<IImage>((resolve, reject) => {
//       cloudinary.uploader
//         .upload_stream({ format: "jpg" }, (err, res) => {
//           if (err) reject(err);
//           else resolve(res as any);
//         })
//         .end(req.file.buffer);
//     });

//     await User.findOneAndUpdate({ _id: req.userId }, { photo: newImage });
//     res.json(newImage.secure_url);
//   }
//};

const getUser = async (token: string) => {
  const response = await fetch(
    "https://identityapptest.herokuapp.com/api/user",
    {
      headers: { "x-token": token },
    }
  );

  return (await response.json()) as IUser;
};

export const createProfile: RouteParams = async (req, res) => {
  console.log(req.userId, req.headers["x-token"]);

  const user = await getUser(req.headers["x-token"] as string);

  if (user) {
    const profile = (await Profile.findById(req.userId)) as IProfile;
    if (!profile) {
      await new Profile({
        _id: req.userId,
      }).save();
    }
  }

  res.json(true);
};
