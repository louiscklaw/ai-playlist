const fs = require('fs');
const { myLogger } = require('../../../utils/myLogger');

async function getJobInfo(working_dir) {
  var output = {};

  try {
    if (!working_dir){
      myLogger.info('working_dir not defined, default to /share/testing')
      working_dir = '/share/testing'
    }

    const extract_result = await fs.readFileSync(`${working_dir}/100_extract_result.json`, { encoding: 'utf8' });
    const extract_result_json = JSON.parse(extract_result);
    // console.log(extract_result_json)

    const { companyName, jobAddress, jobTitle } = extract_result_json;
    output = { companyName, jobAddress, jobTitle };
  } catch (error) {
    myLogger.error('error during getting job info');
    myLogger.error(JSON.stringify(error));
    console.log(error)
    output = { companyName: '', jobAddress: '', jobTitle: '' };
  }

  return output;
}

module.exports = { getJobInfo };
