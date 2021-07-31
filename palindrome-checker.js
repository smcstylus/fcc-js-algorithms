/**
 * Palindrome Checker
 *
 *
 * freecodecamp.org - JavaScript Algorithms and Data Structures
 * Request: Return true if the given string is a palindrome. Otherwise, return false.
 * Link to test: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/palindrome-checker
 *
 *
 * Author: Mihai Calin Simion
 * E-mail: simion.mihai.calin@gmail.com
 * Website: http://www.smcstylus.com
 * Date: 2021
 *
 */

/* Palindrome checker */
const palindrome = (str) => {
  let res = false;
  let as,
    ae = [];

  const regex = /[^a-z0-9]|\s+|\r?\n|\r/gim;
  let ns = str.toLowerCase().replace(regex, "");
  let c = ns.length;
  let m = "";
  let rest = c % 2;
  let div = Math.floor(c / 2);
  let end = div;
  let aer;
  if (c === 1) {
    r = true;
  } else {
    if (rest === 1) {
      end = div + 1;
    }
    as = ns.substr(0, div).split("");
    ae = ns.substr(end, c).split("");
    aer = ae.reverse();
    for (let i = 0; i < div; i++) {
      if (as[i] != ae[i]) {
        res = false;
        break;
      }
      res = true;
    }
  }
  return res;
};

// console.log(palindrome("eye")); // should return: true
// console.log(palindrome("eyes")); // should return: false
