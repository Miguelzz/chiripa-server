/** @format */

import { Demo } from "../../repositories/demo.repository";
import { formatString } from "./all";
import animals from "./animals";
import brants from "./brants";
import colors from "./colors";
import products from "./products";

const _ramdom = (list: string[]) =>
  formatString(list[Math.floor(Math.random() * list.length)]);

export const createAnimals = async (max: number) => {
  const result = await Promise.all(
    [...Array(max)].map(async (x) => {
      const name = _ramdom(animals);
      const entity = {
        title: name,
        tags: [name, _ramdom(colors)],
        image: `https://picsum.photos/300/300`,
      };
      await new Demo(entity).save();
      return true;
    })
  );

  console.log("fin animals");

  return result;
};

export const createProducts = async (max: number) => {
  const result = await Promise.all(
    [...Array(max)].map(async (x) => {
      const name = _ramdom(products);
      const entity = {
        title: name,
        tags: [name, _ramdom(colors), _ramdom(brants)],
        image: `https://picsum.photos/300/300`,
      };
      await new Demo(entity).save();
      return true;
    })
  );

  console.log("fin products");

  return result;
};
