const SchemaValidator = require('../lib/Schema');
const errors = require('../lib/errors');

describe('Schema', () => {

  // add a test schema
  const personSchema = {
    firstName: { type: 'string', required: true },
    lastName: { type: 'string', required: true },
    married: { type: 'boolean' },
    age: { type: 'number' }
  };

  const schemaValidator = new SchemaValidator(personSchema);

  const validModel = {
    firstName: 'Pat',
    lastName: 'Haynes',
    married: false,
    age: 33
  };

  const validModelTwo = {
    firstName: 'Pat',
    lastName: 'Haynes',
    married: 'false',
    age: 33
  };

  const invalidModel = {
    firstName: [],
    lastName: 'Haynes',
    married: 'true',
    age: 33
  };


  it('validates a correct model', () => {
    expect(schemaValidator.validate(validModel)).toEqual(validModel);
  });

  it('validates a correct model', () => {
    expect(schemaValidator.validate(validModelTwo)).toEqual(validModel);
  });

  it('throws on invalid model', () => {
    expect(() => {
      schemaValidator.validate(invalidModel);
    }).toThrow(errors.ModelError);
  });
});