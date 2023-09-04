const fs = require('fs');

// TODO: remove me
// path = require('path');
// const { askPoePrepromptQuestion } = require('../../../fetch/askPoePrepromptQuestion');
// const { DRAFT_EMAIL_PREPROMPT } = require('./constants');

const { myLogger } = require('../../../utils/myLogger');
const { createDirIfNotExists } = require('../../../utils/createDirIfNotExists');
const { calculateMD5 } = require('../../../utils/calculateMD5');

const { CVTemplateMarkdown } = require('./CVTemplateMarkdown');

const ERROR_LOG_DIR = __dirname.replace('/app', '/logs/error');

// TODO: remove me
// const { checkInput } = require('./checkInput');
// const { loadJson } = require('../../../utils/loadJson');

async function writeEmailMarkdown(working_dir, email_content) {
  output = { state: 'init', debug: { working_dir, email_content, error: '' } };
  try {
    if (!working_dir) {
      myLogger.info('writeEmailMarkdown: working_dir undefined, default to /share/testing')
      working_dir = '/share/testing'
    }

    createDirIfNotExists(working_dir);

    var email_content_with_template = CVTemplateMarkdown(email_content);

    const email_md_filename = `${working_dir}/401_email.md`;
    myLogger.info(`writing content into ${email_md_filename}`);
    await fs.writeFileSync(email_md_filename, email_content_with_template, { encoding: 'utf8' });
  } catch (error) {
    console.log(error);
    output = { ...output, state: 'error', error: JSON.stringify(error) };

    myLogger.error('error during write email...');

    await createDirIfNotExists(ERROR_LOG_DIR);

    var filename = `${ERROR_LOG_DIR}/${calculateMD5(error)}.json`;
    await fs.writeFileSync(filename, JSON.stringify(output), { encoding: 'utf8' });
  }
}

module.exports = { writeEmailMarkdown };
