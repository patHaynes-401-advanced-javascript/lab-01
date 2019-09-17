# lab-01

# LAB: Node Ecosystem

Time to get hands on with Test Driven Development (TDD) and Continuous Integration (CI). For this lab, you will be writing a fully tested validation module and shepherd it through a CI pipeline.

## Before you begin

Refer to *Getting Started*  in the [lab submission instructions](../../../reference/submission-instructions/labs/README.md) for complete setup, configuration, deployment, and submission instructions.

## Getting Started

In the `starter_code` folder, there is a partial implementation of a "validator" module

In the `root` of that folder, you'll find a file called `index.js` that wires in the validator module and attempts to run functions imported from it.

In the `__tests__` folder, you'll find a file called `validator.test.js` that has the shells for the basic tests you need to write and make pass. See below for testing requirements.

In the `lib` folder, you'll find a file called `validator.js` that wires in the validator module, sets up some testing (optimistically) but contains no test code

## Requirements

### Developer Implementation

**USE TDD Practices**

Write an object validation module that exports a object with validate methods (functions) that can, based on the inputs, validate whether or not an entity is satisfactory. 

Things we want to be able to validate:

* Is the input itself the right type (string, array, object, function etc)?
* Is an array of inputs the right type (both that it is an array, and all elements of the array are of the specfied type)

We also want to be able to get the right validation function given a corresponding "rule". This lab has you figure out you want to specify the "rule". For now, the rule needs to indicate the `type`, but ideally design the rule to also have additional aspects like if the value is `required` or not.

### STRETCH GOAL

Change the tests and code to test if the input value _could_ be used as the specified type (coerced).

### Testing

*Validation Module* 
* Validate that validation is reliable (works for correct values, fails for incorrect values)
* Also consider:
    * Test each function for proper/improper use (required params)
* Feel free to add other test cases (for example, does an empty array pass `isArrayOfStrings`?)

### Documentation

All exported functions and methods need to have meaningful JSDocs comments. JSDocs need to be built
into docs folder for submission.

---

### End User Implementation
* Use the `index.js` file to validate objects using the imported functions from the module
* `console.log()` the return values


### Assignemnt Submission Instructions

Refer to the the [lab submission instructions](../../../reference/submission-instructions/labs/README.md) for the complete lab submission process and expectations