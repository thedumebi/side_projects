const hex = Array.from({ length: 15 }, (_, i) => {
  if (i + 1 > 9) {
    return String.fromCharCode(65 + (i - 9));
  } else {
    return i + 1;
  }
});

const getRandomNumber = () => Math.floor(Math.random() * hex.length);

const randomHex = () => `#${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0")}`;
const hexToRgb = (hex) => {
  hex = hex.replace(/^#?([0-9a-f]{6})$/i, "$1");
  hex = Number(`0x${hex}`);
  return [(hex >> 16) & 0xff, (hex >> 8) & 0xff, hex & 0xff];
};

const btn = document.getElementById("btn");
const color = document.querySelector(".color");
const colorRGB = document.querySelector('.color-rgb')

btn.addEventListener("click", () => {
  const hexColor = randomHex();
  const rgbColor = `rgb(${hexToRgb(hexColor)})`

  document.querySelector(".container").style.backgroundColor = hexColor;
  color.textContent = hexColor;
  color.style.color = hexColor;
  colorRGB.textContent = rgbColor;
  colorRGB.style.color = rgbColor;
  btn.style.backgroundColor = hexColor;
});

const hexColor = randomHex();
const rgbColor = `rgb(${hexToRgb(hexColor)})`

document.querySelector(".container").style.backgroundColor = hexColor;
color.textContent = hexColor;
color.style.color = hexColor;
colorRGB.textContent = rgbColor;
colorRGB.style.color = rgbColor;
btn.style.backgroundColor = hexColor;
