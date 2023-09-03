// const fetch = require('node-fetch');
const Joi = require('joi');
const fs = require('fs'),
  path = require('path');
const { createDirIfNotExists } = require('../../../utils/createDirIfNotExists');
const { calculateMD5 } = require('../../../utils/calculateMD5');
const { myLogger } = require('../../../utils/myLogger');
const ERROR_LOG_DIR = `/logs/error/${path.basename(__filename).replace('.js', '')}`;

const INPUT_INVALID = 'input is invalid';

function checkInput(in_o) {
  var output = { output: 'init', debug: in_o, error: '' };

  try {
    const itemSchema = Joi.object({
      question: Joi.string().required(),
      answer: Joi.object({
        reply: Joi.string().required(),
        md_reply: Joi.array().items(Joi.string()),
      })
        .required()
        .unknown(),
    });

    const jobSchema = Joi.object({
      chat_history: Joi.object({
        q_and_a: Joi.object({
          history: Joi.array().items(itemSchema).min(1).required(),
        }).unknown(),
      }),
    }).unknown();

    // const { error } = jobSchema.validate(in_o);
    // if (error) throw new Error(INPUT_INVALID);
  } catch (error) {
    output = { ...output, state: 'error', error: JSON.stringify(error) };
    console.error(JSON.stringify(error));

    createDirIfNotExists(ERROR_LOG_DIR);

    var filename = `${ERROR_LOG_DIR}/${calculateMD5(error)}.json`;
    fs.writeFileSync(filename, JSON.stringify(output), { encoding: 'utf8' });
    myLogger.error(filename);

    console.error(JSON.stringify(output));

    throw error;
  }
}

module.exports = { checkInput };
