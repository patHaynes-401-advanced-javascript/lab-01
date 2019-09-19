class CastError extends Error {
  constructor(expectedType, providedValue) {
    super(`Data cannot be persuaded!`);
    this.expectedType = expectedType;
    this.providedValue = providedValue;
  }
}

class ModelError extends Error {
  constructor(input) {
    super(`This model cannot be persuaded because of ${input}`);
  }
}

module.exports = {
  CastError,
  ModelError
};