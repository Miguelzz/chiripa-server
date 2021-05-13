/** @format */
import { Profile } from "../repositories/profile.repository";
import { ErrorMessage, RouteParams } from "../utils/types";
import { cloudinary } from "../connections/cloundinary";
import { IProfile } from "../models/profile";
import { Raffle } from "../repositories/raffle.repository";
import { analyzeQuery } from "../utils/tags/search";
import { addExclude } from "../utils/tags/all";
import { getUser } from "./profile.controller";

const createTickets = (count: number) => {
  const ticket = () => {
    return `x${"x".repeat(count.toString().length)}`
      .replace(/[x]/g, function () {
        return ((Math.random() * 16) | 0).toString(16);
      })
      .toUpperCase();
  };

  return [...Array(count * 5)].map(() => `X${ticket()}`).splice(0, count);
};

export const buyTicket: RouteParams = async (req, res) => {
  const { raffleId, tickets } = req.body;
  const raffle = await Raffle.findOne({
    _id: raffleId,
    tickets: { $all: tickets },
  });

  if (
    raffle &&
    !raffle.players.some(
      (x: any) =>
        x.userId === req.userId &&
        x.tickets.some((t: any) => tickets.includes(t))
    )
  ) {
    // realizar pagos

    const token = req.headers["x-token"] as string;
    const user = await getUser(token);

    await Raffle.findByIdAndUpdate(raffleId, {
      $push: {
        players: {
          userId: req.userId as any,
          photoUser: user.photo?.secure_url || "",
          tickets,
        },
      },
      tickets: raffle.tickets.filter(
        (x: any) => !tickets.some((y: any) => x === y)
      ),
    });
    res.json(true);
  } else {
    res.json(false);
  }
};

export const getBets: RouteParams = async (req, res) => {
  const raffle = await Raffle.find({ "players.userId": req.userId });
  res.json(raffle);
};

export const getRaffle: RouteParams = async (req, res) => {
  const profile = await Profile.findById(req.userId).populate("raffles");
  res.json(profile.raffles);
};

export const searchRaffle: RouteParams = async (req, res) => {
  const query = analyzeQuery(req.query.q as string);
  const page = req.query.page || 0;
  const limit = req.query.limit || 10;
  let filter;
  if (!(req.query.q as string)?.trim())
    filter = await (Raffle as any).paginate({}, { page, limit });
  else
    filter = await (Raffle as any).paginate(
      {
        tags: {
          $all: query.tags.map(
            (x) => new RegExp(`\\b${x.slice(0, x.length - 1)}(a|o)?\\b`)
          ),
        },
      },
      { page, limit }
    );
  res.json(filter);
};

export const createRaffle: RouteParams = async (req, res) => {
  const files = (req.files as Express.Multer.File[]) || [];
  const { drawDate, name, description, numberOfTickets, totalPrice } = req.body;
  console.log({ drawDate, name, description, numberOfTickets });
  const { tags, exclude } = analyzeQuery(`${name} ${description}`);
  const nameRaffle = name.replace(/\s+/g, " ").trim().toUpperCase();
  addExclude(exclude);

  const profile = (await Profile.findById(req.userId)) as IProfile;

  if (profile) {
    if (!profile.raffles.some((x) => x.name === nameRaffle)) {
      const images = await Promise.all(
        files.map(
          async (file) =>
            new Promise((resolve, reject) => {
              cloudinary.uploader
                .upload_stream({ format: "jpg" }, (err, res) => {
                  if (err) reject(err);
                  else resolve(res);
                })
                .end(file.buffer);
            })
        )
      );

      const tickets = createTickets(numberOfTickets);

      const raffle = await new Raffle({
        name: nameRaffle,
        tags,
        description,
        drawDate,
        totalPrice,
        tickets,
        images,
      }).save();

      await Profile.findByIdAndUpdate(req.userId, {
        $push: { raffles: raffle._id },
      });

      res.json(raffle);
    } else {
      res.status(403).send({
        message: "Raffle already exists!",
      } as ErrorMessage);
    }
  } else {
    res.status(403).send({
      message: "Profile not find!",
    } as ErrorMessage);
  }
};
