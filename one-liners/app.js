// 1. find day of the year where date falls
const dayOfYear = (date) =>
  Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

// 2. time formatting
const timeToHHmmss = (date) => date.toTimeString().slice(0, 8);

// 3. capialize first letter of a string
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// 4. random string
const randomString = () => Math.random().toString(36).slice(2);

// 5. remove duplicates from an array
const uniqueSet = (arr) => [...new Set(arr || [])];
const uniqueIndexOf = (array) =>
  (array || []).filter((item, index) => array.indexOf(item) === index);
const uniqueSortFilter = (array) =>
  (array || [])
    .sort()
    .filter((item, index, _arr) => !index || item !== _arr[index - 1]);
const uniqueMap = (array) => {
  const map = new Map();

  return (array || []).filter((item) => !map.has(item) && map.set(item, 1));
};
const uniqueObject = (array) => {
  const obj = {};
  (array || []).forEach((item) => (obj[item] = item));
  return Object.values(obj);
};
const uniqueReduce = (array) =>
  (array || []).reduce(
    (prev, next) => (prev.includes(next) ? prev : [...prev, next]),
    []
  );

// 6. convert RGB format to hex
const rgbToHex = ([red = 0, green = 0, blue = 0] = []) =>
  `#${((red << 16) | (green << 8) | blue).toString(16)}`;
const rgbToHex2 = (r, g, b) =>
  "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

// convert hex to rgb
const hexToRgb = (hex) => {
  hex = hex.replace(/^#?([0-9a-f]{6})$/i, "$1");
  console.log({ hex });
  hex = Number(`0x${hex}`);
  console.log({ hex });

  return [(hex >> 16) & 0xff, (hex >> 8) & 0xff, hex & 0xff];
};

// 7. get random hex color
const randomHex = () =>
  `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padEnd(6, "0")}`;

// 8. get selected text
const getSelectedText = () => window.getSelection().toString();

// 9. detect if currently in dark mode
const isDarkMode =
  window.matchMedia && window.matchMedia("prefers-color-scheme: dark").matches;

// 10. pages scroll smootly to the top
window.scrollTo({ left: 0, top: 0, behavior: "smooth" });

// 11. is the page at the bottom?
const isPageInBottom = () =>
  document.documentElement.clientHeight + window.scrollY >=
  document.documentElement.scrollHeight;

// 12. accurately determin Javascript data types
const toType = (obj) =>
  Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();

// convert decimal to binary
const dec2bin = (dec) => (dec >>> 0).toString(2);

// convert binary to decimal
const bin2dec = (bin) => parseInt(bin, 2).toString(10);

const LIST_FRACTION = 0x1; //1 << 0
const LIST_UNIQUE = 0x2; //1 << 1
const LIST_SORTED = 0x4; //1 << 2
const LIST_ALL = LIST_FRACTION | LIST_SORTED | LIST_UNIQUE;
const LIST_DEFAULT = LIST_ALL ^ LIST_UNIQUE;
const normalizeList = (list, flag = LIST_DEFAULT) => {
  if (flag & LIST_FRACTION) {
    const max = Math.max(...list);
    list = list.map((value) => Number((value / max).toFixed(2)));
  }
  if (flag & LIST_UNIQUE) {
    list = [...new Set(list)];
  }
  if (flag & LIST_SORTED) {
    list = list.sprt((a, b) => a - b);
  }

  return list;
};
