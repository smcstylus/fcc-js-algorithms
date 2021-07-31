/**
 * Cash Register
 *
 *
 * freecodecamp.org - JavaScript Algorithms and Data Structures
 * Request: Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.
 * Link to test: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/cash-register
 *
 *
 * Author: Mihai Calin Simion
 * E-mail: simion.mihai.calin@gmail.com
 * Website: http://www.smcstylus.com
 * Date: 2021
 *
 */

/**
 * checkCashRegister()
 * @param {*} price
 * @param {*} cash
 * @param {*} cid
 *
 * Use for instead of forEach for speed ,
 * Don't declare all at beggining. only after each step of return if needed. Js work from up in down so don't waste time with non used code.
 */
const checkCashRegister = (price, cash, cid) => {
  /**
   * Function: Fix decimals
   * @param {*} n - number to fix
   * @param {*} d - nr of decimal to fix
   */
  const fixDec = (n, d = 2) => (n === 0 ? 0 : parseFloat(n.toFixed(d)));

  // Set cash-in-drawer object
  let cashInDrawer = {
    cashTypes: 9,
    cashName: [
      "PENNY",
      "NICKEL",
      "DIME",
      "QUARTER",
      "ONE",
      "FIVE",
      "TEN",
      "TWENTY",
      "ONE HUNDRED",
    ],
    cashVal: [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100],
    cashCount: [],
    cashSum: [],
    total: 0,
    emptyDrawer: [
      ["PENNY", 0],
      ["NICKEL", 0],
      ["DIME", 0],
      ["QUARTER", 0],
      ["ONE", 0],
      ["FIVE", 0],
      ["TEN", 0],
      ["TWENTY", 0],
      ["ONE HUNDRED", 0],
    ],
  };

  /**
   * Function: Update drawer
   * @param {*} arr
   */
  const updateDrawer = (arr) => {
    // Reset total
    cashInDrawer.total = 0;
    for (let i = 0; i < cashInDrawer.cashTypes; i++) {
      // Set sum for each cash type
      cashInDrawer.cashSum[i] = arr[i][1];
      // Set cash count for each cash type
      cashInDrawer.cashCount[i] = fixDec(arr[i][1] / cashInDrawer.cashVal[i]);
      // Calc total
      cashInDrawer.total += arr[i][1];
    }
  };
  /**
   * Function: Set the output
   * @param {} status  - drawer status
   * @param {*} change - change
   */
  const setOutput = (status, change) => {
    return {
      status,
      change,
    };
  };

  /*            start          */
  // Update cash in drawer object
  updateDrawer(cid);

  // Calc the change
  let change = fixDec(cash - price);

  // 1) Check if founds are equal with the change
  if (change == cashInDrawer.total) return setOutput("CLOSED", cid);

  // 2) Check for insuficient founds if change is bigger than total cash inside cid
  if (change > cashInDrawer.total) return setOutput("INSUFFICIENT_FUNDS", []);

  // 3) Check for other changes
  /**
   * Function: Find position in array. Function as findIndex, but findIndex can trow error.
   * @param {*} arr   - array where to search
   * @param {*} v     - val to search
   */
  const findPos = (arr, v, i = 0) => {
    for (i; i < arr.length; ++i) {
      if (arr[i] == v) return i;
    }
    return -1;
  };

  // 3.a) Return if change is sum of some cash type. Count from the bigger
  let checkSumR = [].concat(cashInDrawer.cashSum).reverse();
  let checkInside = findPos(checkSumR, change);
  if (checkInside !== -1) {
    let resultIndex = cashInDrawer.cashTypes - 1 - checkInside;
    if (change < cashInDrawer.total) {
      return setOutput("OPEN", [cashInDrawer.cashName[resultIndex], change]);
    } else {
      cashInDrawer.cashSum[checkPonint] = 0;
      return setOutput("CLOSED", [cashInDrawer.cashSum]);
    }
  }

  // 3.b) Return if change is from multiple vals
  const findBlocks = () => {
    let aSum = checkSumR;
    // Use [].concat(array) to buld new array to not affect the original one by reverse() function
    let aVal = [].concat(cashInDrawer.cashVal).reverse();
    let aCount = [].concat(cashInDrawer.cashCount).reverse();
    let aName = [].concat(cashInDrawer.cashName).reverse();
    let checkVal = 0;
    let cVal = 0;
    let posI = -1;
    // Define output
    let res = {
      dif: change,
      index: [],
      change: [],
    };

    // let r = 0; //- for future use
    for (let i = 0; i < cashInDrawer.cashTypes; i++) {
      // Sum bigger than 0 and cash value < change
      if (aSum[i] > 0 && aVal[i] < change) {
        checkVal = parseInt(fixDec(res.dif / aVal[i]));
        if (checkVal >= aCount[i]) {
          cVal = aSum[i];
          res.dif = fixDec(res.dif - cVal);
          //r += aSum[i]; //- for future use
        } else {
          cVal = fixDec(aVal[i] * checkVal);
          res.dif = fixDec(res.dif - cVal);
          // r += fixDec(aVal[i] * cD); //- for futur use;
        }

        // Stop if diffrence is less than 0
        if (res.dif < 0) break;

        //Add only if count is bigger than 0
        posI = cashInDrawer.cashTypes - i;
        if (checkVal != 0) {
          res.index.push(posI);
          res.change.push([aName[i], cVal]);
        }
      }
    }
    // Return: change, index of used cash, diffrence between change and what customer give
    return [res.change, res.index, res.dif];
  };
  const checkBlocks = findBlocks();
  if (checkBlocks[2] == 0) {
    return setOutput("OPEN", checkBlocks[0]);
  }
  return setOutput("INSUFFICIENT_FUNDS", []);
};

/*
console.log(
  checkCashRegister(19.5, 20, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100],
  ])
);
*/
//should return {status: "OPEN", change: [["QUARTER", 0.5]]}.

/*
console.log(
  checkCashRegister(3.26, 100, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100],
  ])
);
*/
//should return {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}.

/*
console.log(
  checkCashRegister(19.5, 20, [
    ["PENNY", 0.01],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0],
  ])
);
*/
//should return {status: "INSUFFICIENT_FUNDS", change: []}.

/*
console.log(
  checkCashRegister(19.5, 20, [
    ["PENNY", 0.01],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 1],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0],
  ])
);
*/
//should return {status: "INSUFFICIENT_FUNDS", change: []}.

/*
console.log(
  checkCashRegister(19.5, 20, [
    ["PENNY", 0.5],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0],
  ])
);
*/
//should return {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}.
