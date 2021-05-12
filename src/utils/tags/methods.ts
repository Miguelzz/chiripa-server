/** @format */

export const levDist = function (s: string, t: string): number {
  const d: any = []; //2d matrix

  // Step 1
  const n = s.length;
  const m = t.length;

  if (n == 0) return m;
  if (m == 0) return n;

  //Create an array of arrays in javascript (a descending loop is quicker)
  for (let i = n; i >= 0; i--) d[i] = [];

  // Step 2
  for (let i = n; i >= 0; i--) d[i][0] = i;
  for (let j = m; j >= 0; j--) d[0][j] = j;

  // Step 3
  for (let i = 1; i <= n; i++) {
    const s_i = s.charAt(i - 1);

    // Step 4
    for (let j = 1; j <= m; j++) {
      //Check the jagged ld total so far
      if (i == j && d[i][j] > 4) return n;

      const t_j = t.charAt(j - 1);
      const cost = s_i == t_j ? 0 : 1; // Step 5

      //Calculate the minimum
      let mi = d[i - 1][j] + 1;
      const b = d[i][j - 1] + 1;
      const c = d[i - 1][j - 1] + cost;

      if (b < mi) mi = b;
      if (c < mi) mi = c;

      d[i][j] = mi; // Step 6

      //Damerau transposition
      if (i > 1 && j > 1 && s_i == t.charAt(j - 2) && s.charAt(i - 2) == t_j) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + cost);
      }
    }
  }

  // Step 7
  return d[n][m];
};

var gender = (value: string, value2: string) =>
  new RegExp(`${value.slice(0, value.length - 1)}(a|o)?`, "gi").test(value2);

export const binaryEsSearch = (array: string[], item: string) => {
  var min = 0;
  var max = array.length - 1;

  while (min <= max) {
    var middle = Math.floor((min + max) / 2);
    var guess = array[middle];

    if (gender(array[middle], item)) {
      return middle;
    }

    if (guess > item) {
      max = middle - 1;
    } else {
      min = middle + 1;
    }
  }

  return -1;
};

export const binarySearch = <T>(array: T[], item: T) => {
  var min = 0;
  var max = array.length - 1;

  while (min <= max) {
    var middle = Math.floor((min + max) / 2);
    var guess = array[middle];

    if (guess === item) {
      return middle;
    }

    if (guess > item) {
      max = middle - 1;
    } else {
      min = middle + 1;
    }
  }

  return -1;
};

export const listDist = (list: string[], list2: string[]) => {
  const excluded: string[] = [];

  const includes = list.filter((x) =>
    list2.some((p) => {
      if (p.length <= 5) {
        if (x.slice(0, x.length - 1) === p.slice(0, p.length - 1)) return true;
        excluded.push(p);
        return false;
      } else if (p.length <= 7) {
        if (x.slice(0, x.length - 1) === p.slice(0, p.length - 1)) return true;
        const def = levDist(x, p) === 1;
        if (!def) excluded.push(p);
        return def;
      }
      const def = levDist(x, p) <= 2;
      if (!def) excluded.push(p);
      return def;
    })
  );
  return { excluded, includes };
};
