/** @format */

import { IPlayer } from "./player";
import { Id, IImage } from "./shared";

export interface IRaffle {
  userId: Id;
  name: string;
  tags: string[];
  description: string;
  drawDate: string;
  totalPrice: number;
  tickets: string[];
  players: IPlayer[];
  images: IImage[];
}
