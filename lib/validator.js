
/**
 * Is this a string?
 * @param input
 * @returns {boolean}
 */
const isString = input => {
  return typeof input === 'string';
};

/** 
 * Is this a Number?
 * @param input
 * @returns {boolean}
*/
const isNumber = input => {
  return typeof input === 'number';
};

/** 
 * Is this an Array?
 * @param input
 * @returns {boolean}
*/
const isArray = input => {
  return Array.isArray(input);
};

/** 
 * Is this an Object?
 * @param input
 * @returns {boolean}
*/
const isPlainObject = input => {
  return Object.prototype.toString.call(input) === '[object Object]';
};

/** 
 * Is this a Boolean?
 * @param input
 * @returns {boolean}
*/
const isBoolean = input => {
  return typeof input === 'boolean';
};

/** 
 * Is this a Function?
 * @param input
 * @returns {boolean}
*/
function isFunction(input) {
  return input && {}.toString.call(input) === '[object Function]';
}

/**
 * Is this an array of strings?
 * @param {array} input 
 * @returns {boolean}
 */
const isArrayOfStrings = (input) => {
  return input.every(isString);
};

/**
 * Is this an array of numbers?
 * @param {array} input 
 * @returns {boolean}
 */
const isArrayOfNumbers = input => {
  return input.every(isNumber);
};

/**
 * Is this an array of objects?
 * @param {array} input 
 * @returns {boolean}
 */
function isArrayOfObjects(input) {
  return input.every(isPlainObject);
}

/**
 * Is this an array of Booleans?
 * @param {array} input 
 * @returns {boolean}
 */
const isArrayOfBooleans = input => {
  return input.every(isBoolean);
};

/**
 * Based on a set of rules, what is correct validator?
 * TODO: Define the rules ... how do we send them in? How do we identify?
 * @param rules
 * @returns {boolean}
 */
const getValidator = (input) => {
  // CHANGE ME
  const validateList = {
    string: isString,
    strings: isArrayOfStrings,
    number: isNumber,
    numbers: isArrayOfNumbers,
    array: isArray,
    object: isPlainObject,
    objects: isArrayOfObjects,
    boolean: isBoolean,
    booleans: isArrayOfBooleans,
    function: isFunction,
  };
  return validateList[input];
};

module.exports = {
  isString,
  isNumber,
  isArray,
  isPlainObject,
  isBoolean,
  isFunction,
  // moar types...

  isArrayOfStrings,
  isArrayOfNumbers,
  isArrayOfObjects,
  isArrayOfBooleans,
  // moar array types...

  getValidator
};


