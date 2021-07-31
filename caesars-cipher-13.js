/**
 * Caesars Cipher
 *
 *
 * freecodecamp.org - JavaScript Algorithms and Data Structures
 * Request: Write a function which takes a ROT13 (the values of the letters are shifted by 13 places) encoded string as input and returns a decoded string.
 * Link to test: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/caesars-cipher
 *
 *
 * Author: Mihai Calin Simion
 * E-mail: simion.mihai.calin@gmail.com
 * Website: http://www.smcstylus.com
 * Date: 2021
 *
 */

/* Caesar cipher adapted to 13 steps */
const rot13 = (str) => {
  // Set 2 array , 1 starting from A-z , another from 13th position
  const letters = {
    in: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ],
    out: [
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
    ],
  };
  // Check if is a letter and return the converted letter, or return the character
  const getS = (l) => {
    let reg = /[A-Z]/g;
    if (reg.test(l)) {
      return letters.out[letters.in.indexOf(l)];
    }
    return l;
  };
  // Convert str to uppercase, make an array, convert letters, convert back to string and return
  return str
    .toUpperCase()
    .split("")
    .map((v) => getS(v))
    .join("");
};

// console.log(rot13("SERR CVMMN!")); // should return: FREE PIZZA!
