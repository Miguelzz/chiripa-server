/** @format */
import { binaryEsSearch } from "./methods";
import { tagsWords, tagsSentences, formatString } from "./all";
import exclude from "./exclude";

const revise = {} as { [key: string]: number };

export const analyzeQuery = (query: string) => {
  query = formatString(query);

  exclude.forEach((x) => {
    const reg = new RegExp(`\\b${x}\\b`, "gi");
    query = query.replace(reg, "");
  });

  const searchSentences = tagsSentences.reduce<string[]>((a, x) => {
    const reg = new RegExp(`\\b${x}\\b`, "gi");
    const tag = query.match(reg)?.shift();
    if (tag) {
      query = query.replace(reg, "");
      a.push(tag);
    }
    return a;
  }, []);

  const searchWords = formatString(query)
    .split(" ")
    .reduce<string[]>((a, x) => {
      if (binaryEsSearch(tagsWords, x) != -1) {
        query = query.replace(new RegExp(`\\b${x}\\b`, "gi"), "");
        a.push(x);
      }
      return a;
    }, []);

  formatString(query)
    .split(" ")
    .forEach((x) => {
      if (!revise[x]) revise[x] = 0.005;
      else revise[x] += 0.005;
    });

  return {
    tags: [...searchSentences, ...searchWords],
    exclude: Object.keys(revise),
  };
};
