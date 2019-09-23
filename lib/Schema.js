/* import and use validators */
const validator = require('./validator');
const errors = require('./errors');

class SchemaValidator {
  /**
   * Create a model schema
   * @param {object} schema - the schema to apply to models
   */
  constructor(schema) {
    this.schema = schema;
  }

  /**
   * Run validation on the supplied model 
   * @param {object} model - the model to validate
   * @throws {ModelError} throws if model does not conform to schema
   * @returns {object} - validated data record
   */

  validate(model) {
    const returnObject = {};

    try {
      const schemaKeys = Object.entries(this.schema);
      for(let i = 0; i < schemaKeys.length; i++) {
        const keys = schemaKeys[i];
        console.log(keys);
        const caster = validator.getCaster(keys[1].type);
        returnObject[keys[0]] = caster(model[keys[0]]);
      }
      return returnObject;
    }
    catch(error) {
      throw new errors.ModelError(error);
    }
  }
}

module.exports = SchemaValidator;