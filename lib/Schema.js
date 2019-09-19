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
      const schemaKeys = Object.keys(this.schema);
      for(let i = 0; i < schemaKeys.length; i ++) {
        const caster = validator.getCaster(this.schema[schemaKeys[i]].type);
        returnObject[schemaKeys[i]] = caster(model[schemaKeys[i]]);
      }
      return returnObject;
    }
    catch(error) {
      throw new errors.ModelError(error);
    }
  }
}

module.exports = SchemaValidator;