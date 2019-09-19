const validator = require('../lib/validator.js');

describe('validator module', () => {

  const str = 'yes';
  const num = 1;
  const arr = ['a'];
  const obj = { x: 'y' };
  const func = () => { };
  const bool = false;

  describe('performs basic validation of', () => {

    it('strings', () => {
      expect(validator.isString(str)).toBeTruthy();
      expect(validator.isString(num)).toBeFalsy();
      expect(validator.isString(arr)).toBeFalsy();
      expect(validator.isString(obj)).toBeFalsy();
      expect(validator.isString(func)).toBeFalsy();
      expect(validator.isString(bool)).toBeFalsy();
    });

    it('numbers', () => {
      expect(validator.isNumber(str)).toBeFalsy();
      expect(validator.isNumber(num)).toBeTruthy();
      expect(validator.isNumber(arr)).toBeFalsy();
      expect(validator.isNumber(obj)).toBeFalsy();
      expect(validator.isNumber(func)).toBeFalsy();
      expect(validator.isNumber(bool)).toBeFalsy();
    });

    it('arrays', () => {
      expect(validator.isArray(str)).toBeFalsy();
      expect(validator.isArray(num)).toBeFalsy();
      expect(validator.isArray(arr)).toBeTruthy();
      expect(validator.isArray(obj)).toBeFalsy();
      expect(validator.isArray(func)).toBeFalsy();
      expect(validator.isArray(bool)).toBeFalsy();
    });

    it('objects', () => {
      expect(validator.isPlainObject(str)).toBeFalsy();
      expect(validator.isPlainObject(num)).toBeFalsy();
      expect(validator.isPlainObject(arr)).toBeFalsy();
      expect(validator.isPlainObject(obj)).toBeTruthy();
      expect(validator.isPlainObject(func)).toBeFalsy();
      expect(validator.isPlainObject(bool)).toBeFalsy();
    });

    it('booleans', () => {
      expect(validator.isBoolean(str)).toBeFalsy();
      expect(validator.isBoolean(num)).toBeFalsy();
      expect(validator.isBoolean(arr)).toBeFalsy();
      expect(validator.isBoolean(obj)).toBeFalsy();
      expect(validator.isBoolean(func)).toBeFalsy();
      expect(validator.isBoolean(bool)).toBeTruthy();
    });

    it('functions', () => {
      expect(validator.isFunction(str)).toBeFalsy();
      expect(validator.isFunction(num)).toBeFalsy();
      expect(validator.isFunction(arr)).toBeFalsy();
      expect(validator.isFunction(obj)).toBeFalsy();
      expect(validator.isFunction(func)).toBeTruthy();
      expect(validator.isFunction(bool)).toBeFalsy();
    });
  });

  describe('performs array validation of', () => {

    const arrayOfStrings = ['a', 'b', 'c'];
    const arrayOfNumbers = [1, 2, 3];
    const arrayOfObjects = [{}, {}, {}];
    const arrayOfBooleans = [true, false, true];

    it('strings', () => {
      expect(validator.isArrayOfStrings(arrayOfStrings)).toBeTruthy();
      expect(validator.isArrayOfStrings(arrayOfNumbers)).toBeFalsy();
      expect(validator.isArrayOfStrings(arrayOfObjects)).toBeFalsy();
      expect(validator.isArrayOfStrings(arrayOfBooleans)).toBeFalsy();
    });

    it('numbers', () => {
      expect(validator.isArrayOfNumbers(arrayOfStrings)).toBeFalsy();
      expect(validator.isArrayOfNumbers(arrayOfNumbers)).toBeTruthy();
      expect(validator.isArrayOfNumbers(arrayOfObjects)).toBeFalsy();
      expect(validator.isArrayOfNumbers(arrayOfBooleans)).toBeFalsy();
    });

    it('objects', () => {
      expect(validator.isArrayOfObjects(arrayOfStrings)).toBeFalsy();
      expect(validator.isArrayOfObjects(arrayOfNumbers)).toBeFalsy();
      expect(validator.isArrayOfObjects(arrayOfObjects)).toBeTruthy();
      expect(validator.isArrayOfObjects(arrayOfBooleans)).toBeFalsy();
    });

    it('booleans', () => {
      expect(validator.isArrayOfBooleans(arrayOfStrings)).toBeFalsy();
      expect(validator.isArrayOfBooleans(arrayOfNumbers)).toBeFalsy();
      expect(validator.isArrayOfBooleans(arrayOfObjects)).toBeFalsy();
      expect(validator.isArrayOfBooleans(arrayOfBooleans)).toBeTruthy();
    });
  });

  describe('get validator for', () => {

    it('strings', () => {
      // TODO: pass getValidator the rules
      expect(validator.getValidator('string')).toBe(validator.isString);
    });

    it('numbers', () => {
      expect(validator.getValidator('number')).toBe(validator.isNumber);
    });

    it('arrays', () => {
      expect(validator.getValidator('array')).toBe(validator.isArray);
    });

    it('objects', () => {
      expect(validator.getValidator('object')).toBe(validator.isPlainObject);
    });

    it('booleans', () => {
      expect(validator.getValidator('boolean')).toBe(validator.isBoolean);
    });

    it('functions', () => {
      expect(validator.getValidator('function')).toBe(validator.isFunction);
    });

    it('array of strings', () => {
      expect(validator.getValidator('string')).toBe(validator.isString);
    });

    it('array of numbers', () => {
      expect(validator.getValidator('numbers')).toBe(validator.isArrayOfNumbers);
    });

    it('array of objects', () => {
      expect(validator.getValidator('objects')).toBe(validator.isArrayOfObjects);
    });

    it('array of booleans', () => {
      expect(validator.getValidator('booleans')).toBe(validator.isArrayOfBooleans);
    });

  });



  describe('string caster', () => {
    const str = '1';
    const num = 1;
    const arr = ['a'];
    const date = new Date();

    it('returns a string if input is string', () => {
      expect(validator.castString(str)).toBe(str);
    });
    it('returns a string if input is number or date', () => {
      expect(validator.castString(num)).toBe('1');
    });
    it('throws an error if input is object or array', () => {
      expect(() => {
        validator.checkStringValidate(obj);
        validator.checkStringValidate(arr);
        validator.checkStringValidate(date);
      }).toThrow(validator.NoStringError);
    });
  });
});


describe('number caster', () => {
  const str = '1';
  const num = 1;
  const obj = { x: 'y' };
  const arr = ['a'];
  const bool = false;
  const date = new Date();

  it('returns a number if input is number', () => {
    expect(validator.castNumber(1)).toBe(num);
  });
  it('returns a number if input is a string', () => {
    expect(validator.castNumber(str)).toBe(num);
  });
  it('returns a number if input is a date', () => {
    expect(validator.castNumber(date)).toEqual(expect.any(Number));
  });
  it('throws an error if input is boolean, object, or array', () => {
    expect(() => {
      validator.checkNumberValidate(obj);
      validator.checkNumberValidate(arr);
      validator.checkNumberValidate(bool);
    }).toThrow(validator.NoNumberError);
  });
});


describe('boolean caster', () => {
  // const str = '1';
  const num = 1;
  const bool = true;
  const boolFalse = false;
  const boolString = 'true';
  const boolStringFalse = 'false';
  const obj = { x: 'y' };
  const arr = ['a'];
  const date = new Date();

  it('returns a boolean if input is true boolean', () => {
    expect(validator.castBoolean(bool)).toBe(true);
  });
  it('returns a boolean if input is false boolean', () => {
    expect(validator.castBoolean(boolFalse)).toBe(false);
  });
  it('returns a boolean if input is true string', () => {
    expect(validator.castBoolean(boolString)).toBe(true);
  });
  it('returns a boolean if input is false string', () => {
    expect(validator.castBoolean(boolStringFalse)).toBe(false);
  });
  it('returns a boolean if input is a number', () => {
    expect(validator.castBoolean(num)).toBe(bool);
  });
  it('throws an error if input is object, array or date', () => {
    expect(() => {
      validator.checkBooleanValidate(obj);
      validator.checkBooleanValidate(arr);
      validator.checkBooleanValidate(date);
    }).toThrow(validator.NoBooleanError);
  });
});


describe('Object caster', () => {
  const str = '1';
  const num = 1;
  const bool = true;
  const obj = { x: 'y' };
  const arr = ['a'];
  const date = new Date();

  it('returns an object if input is an object', () => {
    expect(validator.castObject(obj)).toBe(obj);
  });
  it('throws an error if input array, string, number, or boolean', () => {
    expect(() => {
      validator.checkObjectValidate(str);
      validator.checkObjectValidate(num);
      validator.checkObjectValidate(bool);
      validator.checkObjectValidate(arr);
      validator.checkObjectValidate(date);
    }).toThrow(validator.NoObjectError);
  });
});


describe('Array caster', () => {
  const arr = ['a'];
  const str = '1';
  const num = 1;
  const bool = true;
  const obj = { x: 'y' };
  const date = new Date();

  it('returns an array if input is an array', () => {
    expect(validator.castArray(arr)).toBe(arr);
  });
  it('throws an error if input array, string, number, or boolean', () => {
    expect(() => {
      validator.checkArrayValidate(str);
      validator.checkArrayValidate(num);
      validator.checkArrayValidate(bool);
      validator.checkArrayValidate(obj);
      validator.checkArrayValidate(date);
    }).toThrow(validator.NoArrayError);
  });
});


describe('Date caster', () => {
  const arr = ['a'];
  const str = '1';
  const num = 1;
  const bool = true;
  const obj = { x: 'y' };
  const date = new Date();

  it('returns a date if input is an date', () => {
    expect(validator.castDate(date)).toBe(date);
  });
  it('throws an error if string, number, boolean, object or array', () => {
    expect(() => {
      validator.checkArrayValidate(str);
      validator.checkArrayValidate(num);
      validator.checkArrayValidate(bool);
      validator.checkArrayValidate(obj);
      validator.checkArrayValidate(arr);
    }).toThrow(validator.NoArrayError);
  });
});