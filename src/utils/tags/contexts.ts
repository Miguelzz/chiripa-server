/** @format */

var result = [""]
  .map((x) => {
    x = x
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, " ")
      .trim();
    if (/as$/.test(x)) return x.replace(/as$/, "a");
    if (/os$/.test(x)) return x.replace(/os$/, "o");
    if (/ces$/.test(x)) return x.replace(/ces$/, "z");
    if (/[bdfghjklmnpqrstvwxys]es/gi.test(x))
      return x.replace(/([bdfghjklmnpqrstvwxys])es/, "$1e");
    else return x;
  })
  .sort(function (a, b) {
    var n = a.toLocaleLowerCase().localeCompare(b.toLocaleLowerCase());
    return n === 0 && a !== b ? b.localeCompare(a) : n;
  });

JSON.stringify([...new Set(result)]);
