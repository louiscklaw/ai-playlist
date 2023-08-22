const Joi = require('joi');

const urlSchema = Joi.string().uri();

// const validationResult = urlSchema.validate(inputUrl);
// if (validationResult.error) {
//   console.log("Invalid URL");
//   console.log(validationResult.error.details);
// } else {
//   console.log("Valid URL");
//   console.log(validationResult.value);
// }

module.exports = {urlSchema}