const hex = Array.from({ length: 15 }, (_, i) => {
  if (i + 1 > 9) {
    return String.fromCharCode(65 + (i - 9));
  } else {
    return i + 1;
  }
});

const getRandomNumber = () => Math.floor(Math.random() * hex.length);

const btn = document.getElementById("btn");
const color = document.querySelector(".color");

btn.addEventListener("click", () => {
  let hexColor = "#";
  for (let i = 0; i < 6; i++) {
    hexColor += hex[getRandomNumber()];
  }

  document.querySelector(".container").style.backgroundColor = hexColor;
  color.textContent = hexColor;
  color.style.color = hexColor;
  btn.style.backgroundColor = hexColor;
});

let hexColor = "#";
for (let i = 0; i < 6; i++) {
  hexColor += hex[getRandomNumber()];
}

document.querySelector(".container").style.backgroundColor = hexColor;
color.textContent = hexColor;
color.style.color = hexColor;
btn.style.backgroundColor = hexColor;
