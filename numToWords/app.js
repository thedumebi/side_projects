const input = document.getElementById("input");
const output = document.getElementById("output");

const wordObj = {
  1: "ONE",
  2: "TWO",
  3: "THREE",
  4: "FOUR",
  5: "FIVE",
  6: "SIX",
  7: "SEVEN",
  8: "EIGHT",
  9: "NINE",
  10: "TEN",
  11: "ELEVEN",
  12: "TWELVE",
  13: "THIRTEEN",
  14: "FOURTEEN",
  15: "FIFTEEN",
  16: "SIXTEEN",
  17: "SEVENTEEN",
  18: "EIGHTEEN",
  19: "NINETEEN",
  20: "TWENTY-",
  30: "THIRTY-",
  40: "FORTY-",
  50: "FIFTY-",
  60: "SIXTY-",
  70: "SEVENTY-",
  80: "EIGHTY-",
  90: "NINETY-",
  "000": "THOUSAND",
  "000000": "MILLION",
  "000000000": "BILLION",
  "000000000000": "TRILLION",
  "000000000000000": "QUADRILLION",
};

// hundreds tens and unit checker
const toHundred = (digits) => {
  digits = digits.toString();

  if (digits.length != 3) {
    for (let i = digits.length; i < 3; i++) {
      digits = "0" + digits;
    }
  }

  if (digits[0] != 0 && digits[1] != 0 && digits[2] != 0) {
    return `${wordObj[digits[0]]} HUNDRED AND ${
      digits[1] == 1
        ? wordObj[digits[1] + digits[2]]
        : wordObj[digits[1] + "0"] + wordObj[digits[2]]
    }`;
  } else if (digits[0] != 0 && digits[1] == 0 && digits[2] == 0) {
    return `${wordObj[digits[0]]} HUNDRED`;
  } else if (digits[0] != 0 && digits[1] != 0 && digits[2] == 0) {
    return `${wordObj[digits[0]]} HUNDRED AND ${wordObj[digits[1] + "0"]}`;
  } else if (digits[0] != 0 && digits[1] == 0 && digits[2] != 0) {
    return `${wordObj[digits[0]]} HUNDRED AND ${wordObj[digits[2]]}`;
  } else if (digits[0] == 0 && digits[1] != 0) {
    if (wordObj[digits[1] + "0"].includes("TY")) {
      return `${wordObj[digits[1] + "0"]}${wordObj[digits[2]]}`;
    } else {
      return `${wordObj[digits[1] + digits[2]]}`;
    }
  } else {
    //console.log(digits);
    return wordObj[digits[2]];
  }
};

// cnversion from num to words
const convertToWords = (num) => {
  num = num.toString();
  num = num.replace(/,/g, "");
  let result = "";
  let head = "";
  let body = "";
  let numOfZeros = "";

  if (num.length % 2 != 0) {
    loopCount = Math.floor(num.length / 3) + 1;
  } else {
    loopCount = num.length / 3;
  }

  for (let i = 0; i < loopCount; i++) {
    while (num.startsWith("0")) {
      num = num.replace("0", "");
    }

    head = num;
    while (head.length > 3) {
      head = head.substr(0, head.length - 3);
    }

    numOfZeros = num.length - head.length;

    for (j = 0; j < numOfZeros; j++) {
      body += "0";
    }

    result += toHundred(head) + " ";
    // add zeros words eg. thousands if needed
    result += wordObj[body] + ", ";
    num = num.substr(head.length, num.length);
    body = "";
  }

  result = result.replace(/undefined/g, "");

  while (result.endsWith("-") || result.endsWith(",") || result.endsWith(" ")) {
    result = result.split("").slice(0, -1).join("");
  }

  return result;
};

// format numbers with comma
const format = (num) =>
  num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

input.addEventListener("input", () => {
  // remove invalid strings
  for (let each of input.value) {
    if (isNaN(each)) input.value = input.value.replace(each, "");
  }

  // format value
  input.value = format(input.value);

  const result = convertToWords(input.value);
  output.innerText = result;

  if (input.value == "" || input.value == 0) output.innerText = "ZERO";
});
