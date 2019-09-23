const errors = require('./errors');
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

// casting functions

/**
 * Is this a string?
 * @param input 
 * @returns {string}
 */
const castString = (input) => {
  if(typeof input === 'string') {
    return input;
  }
  else if(typeof input === 'number') {
    return input.toString();
  }
  else if(input === Date())
    return Date(input);
  else {
    throw new errors.CastError;
  }
};

class NoStringError extends Error {
  constructor(input) {
    super(`${input} cannot be a string`);
    this.input = input;
  }
}

const checkStringValidate = (input) => {
  try {
    castString(input);
  }
  catch(err) {
    throw new NoStringError;
  }
};


/**
 * Is this a number?
 * @param input 
 * @returns {number}
 */
const castNumber = (input) => {
  if(typeof input === 'number') {
    return input;
  }
  else if(typeof input === 'string') {
    return parseInt(input);
  }
  else if(typeof Date.parse(input) === 'number' && !isNaN(Date.parse(input))) {
    return Date.parse(input);
  }
  else {

    throw new errors.CastError;
  }
};

class NoNumberError extends Error {
  constructor(input) {
    super(`${input} cannot be a number`);
    this.input = input;
  }
}

const checkNumberValidate = (input) => {
  try {
    castNumber(input);
  }
  catch(err) {
    throw new NoNumberError;
  }
};


/**
 * Is this a boolean?
 * @param input 
 * @returns {boolean}
 */
const castBoolean = (input) => {
  if(typeof input === 'boolean') {
    return Boolean(input);
  }
  else if(typeof input === 'number') {
    return Boolean(input);
  }
  else if(isString(input)) {
    if(input === 'true') {
      return true;
    }
    if(input === 'false') {
      return false;
    }
  } else {
    throw new errors.CastError;
  }
};

class NoBooleanError extends Error {
  constructor(input) {
    super(`${input} cannot be a boolean`);
    this.input = input;
  }
}

const checkBooleanValidate = (input) => {
  try {
    castBoolean(input);
  }
  catch(err) {
    throw new NoBooleanError;
  }
};

/**
 * Is this an object?
 * @param input 
 * @returns {object}
 */
const castObject = (input) => {
  if(Object.prototype.toString.call(input) === '[object Object]')
    return input;
  else {
    throw new errors.CastError;
  }
};

class NoObjectError extends Error {
  constructor(input) {
    super(`${input} cannot be an object`);
    this.input = input;
  }
}

const checkObjectValidate = (input) => {
  try {
    castObject(input);
  }
  catch(err) {
    throw new NoObjectError;
  }
};


/**
 * Is this an Array?
 * @param input 
 * @returns {array}
 */
const castArray = (input) => {
  if(Array.isArray(input))
    return input;
  else {
    throw Error;
  }
};

class NoArrayError extends Error {
  constructor(input) {
    super(`${input} cannot be an array`);
    this.input = input;
  }
}

const checkArrayValidate = (input) => {
  try {
    castArray(input);
  }
  catch(err) {
    throw new NoArrayError;
  }
};

/**
 * Is this a Date?
 * @param input 
 * @returns {date}
 */

const castDate = (input) => {
  if(typeof Date.parse(input) === 'number' && !isNaN(Date.parse(input)))
    return input;
};

class NoDateError extends Error {
  constructor(input) {
    super(`${input} cannot be a date`);
    this.input = input;
  }
}

const checkDateValidate = (input) => {
  try {
    castArray(input);
  }
  catch(err) {
    throw new NoDateError;
  }
};

const getCaster = (input) => {
  const casterObject = {
    string: castString,
    number: castNumber,
    boolean: castBoolean,
    date: castDate
  };
  return casterObject[input];
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

  getValidator,
  getCaster,
  castString,
  checkStringValidate,
  NoStringError,
  castNumber,
  checkNumberValidate,
  NoNumberError,
  castBoolean,
  checkBooleanValidate,
  NoBooleanError,
  castObject,
  NoObjectError,
  checkObjectValidate,
  castArray,
  checkArrayValidate,
  NoArrayError,
  castDate,
  checkDateValidate,
  NoDateError,
};


