/**
 * Roman Numeral Converter
 *
 *
 * freecodecamp.org - JavaScript Algorithms and Data Structures
 * Request: Convert the given number into a roman numeral. All roman numerals answers should be provided in upper-case.
 * Link to test: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/roman-numeral-converter
 *
 *
 * Author: Mihai Calin Simion
 * E-mail: simion.mihai.calin@gmail.com
 * Website: http://www.smcstylus.com
 * Date: 2021
 *
 */

/* isInteger() polyfill*/
Number.isInteger =
  Number.isInteger ||
  function (value) {
    return (
      typeof value === "number" &&
      isFinite(value) &&
      Math.floor(value) === value
    );
  };

/* convert arab numbers to roman numbers */
const convertToRoman = (num) => {
  // Check for integer input
  if (!Number.isInteger(num)) return "Please use just numbers!";
  // Check for positive number
  if (num < 0) return "Please use positive numbers!";
  // Check for numbers  > than 0
  if (num == 0) return 0;
  // Check for numbers bigger than 9999
  if (num > 9999) return "The number is to big to display!";

  let cent = 0,
    tens = 0,
    ord = 0;
  let rCent = "",
    rTens = "",
    rOrd = "",
    res;
  const aNr = {
    base: [1, 5, 10, 50, 100, 500, 1000],
    low: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    mid: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90],
    big: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900],
  };
  const rNr = {
    base: ["I", "V", "X", "L", "C", "D", "M"],
    low: ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
    mid: ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"],
    big: ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"],
  };

  // Get the character between 1 to 9  of given number
  const getOrds = (num) => {
    return rNr.low[aNr.low.indexOf(num % 10)];
  };
  // Get and convert the character of tens of given number
  const getTens = (num) => {
    return rNr.mid[aNr.mid.indexOf(Math.floor((num % 100) / 10) * 10)];
  };
  // Get and convert the character of cents of given number
  const getCents = (num) => {
    return rNr.big[aNr.big.indexOf(Math.floor((num % 1000) / 100) * 100)];
  };
  // Get and convert the 1st number for thousands
  const getThounds = (num) => {
    let m = (num + "")[0];
    let r = "";
    for (let i = 1; i <= m; i++) {
      r += "M";
    }
    return r;
  };
  // Set the result variable
  if (num < 10) {
    // Convert number between 1-9
    res = rNr.low[aNr.low.indexOf(num)];
  } else if (num > 9 && num < 100) {
    res = getTens(num) + getOrds(num);
  } else if (num > 99 && num < 1000) {
    res = getCents(num) + getTens(num) + getOrds(num);
  } else if (num > 999) {
    res = getThounds(num) + getCents(num) + getTens(num) + getOrds(num);
  }
  // Display the result variable
  return res;
};

// console.log(convertToRoman(1982)); // should return: MCMLXXXII
// console.log(convertToRoman(2021)); // should return: MMXXI
