/**
 * Telephone Number Validator
 *
 *
 * freecodecamp.org - JavaScript Algorithms and Data Structures
 * Request: Return true if the passed string looks like a valid US phone number.
 * Link to test: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/telephone-number-validator
 *
 *
 * Author: Mihai Calin Simion
 * E-mail: simion.mihai.calin@gmail.com
 * Website: http://www.smcstylus.com
 * Date: 2021
 *
 */

const telephoneCheck = (str) => {
  str = str.trim();
  let strCount = str.replace(/\D/gim, "").length;
  if (strCount < 10) return false;
  const reg = {
    //5555555555
    n1: /^([0-9]{10})$/,
    // 555-555-5555 , 555 555 5555
    n2: /^((1 |)?[0-9]{3})?(([ ]?[0-9]{3}[ ])|([-]?[0-9]{3}[-]))?([0-9]{4})$/,
    // (555) 555-5555, (555)555-5555, 1 (555) 555-5555, 1 (555)555-5555
    n3: /^((1 \(|1\(|\()?([0-9]{3})\))?( |)?([0-9]{3}(-))?([0-9]{4})$/,
    n4: /^([0-9]{1})?([ ][0-9]{3})?(([ ]?[0-9]{3}[ ]))?([0-9]{4})$/,
  };

  if (str.match(reg.n1)) {
    return true;
  } else if (str.match(reg.n2)) {
    return true;
  } else if (str.match(reg.n3)) {
    return true;
  } else if (str.match(reg.n4)) {
    return true;
  }

  return false;
};

// console.log(telephoneCheck("555-555-5555")); // should return: true
// console.log(telephoneCheck("1 5555555555")); // should return: false
