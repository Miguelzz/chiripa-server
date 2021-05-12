/** @format */

import { Tag } from "../../repositories/tag.repository";
import animals from "./animals";
import brants from "./brants";
import colors from "./colors";
import materials from "./materials";
import products from "./products";
import sports from "./sports";

export const formatString = (value: string) => {
  const works = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w]+/g, " ")
    .replace(/\s+/g, " ")
    .toLowerCase()
    .trim();

  const worksSingular = works.split(" ").map((x) => {
    if (/as$/.test(x)) x = x.replace(/as$/, "a");
    if (/os$/.test(x)) x = x.replace(/os$/, "o");
    if (/ces$/.test(x)) x = x.replace(/ces$/, "z");
    return x;
  });

  return [...new Set(worksSingular)].join(" ");
};

const all = [
  ...new Set<string>([
    ...animals,
    ...colors,
    ...materials,
    ...products,
    ...sports,
    ...brants,
  ]),
].map(formatString);

const words: string[] = [];
const sentences: string[] = [];

let excludes: string[] = [];

export const addExclude = (tags: string[]) => {
  if (excludes.length > 500) {
    excludes.forEach(async (x) => {
      const tag = await Tag.findOne({ grandpa: "", tag: x });
      if (!tag) await new Tag({ grandpa: "", tag: x }).save();
    });
    excludes = [];
  }
  excludes.push(...tags);
};

while (all.length) {
  if (all[0].split(" ").length >= 2) sentences.push(all[0]);
  else words.push(all[0]);
  all.shift();
}

export const tagsWords = words.sort();
export const tagsSentences = sentences.sort();
