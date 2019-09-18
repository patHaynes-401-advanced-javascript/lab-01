const Schema = require('../lib/Schema');

describe('Schema', () => {

  // add a test schema
  const person = {
    name: 'name',
    age: typeof('number'),
  };

  it('validates a correct model', () => {
    expect(schemaValidator.validate(person)).toEqual(person);
  });

  it('throws on invalid model', () => {

  });

  // more test cases...
});