const { myLogger } = require('../../utils/myLogger');
const { storeJson } = require('../../utils/storeJson');
const { createDirIfNotExists } = require('../../utils/createDirIfNotExists');

const {postTelegramMessage} = require('../../utils/postTelegramMessage');

const fs = require('fs')

async function getJobInfo(working_dir){
  var output = {}

  try {
    const extract_result = await fs.readFileSync(`${working_dir}/extract_result.json`,{encoding:'utf8'})
    const extract_result_json = JSON.parse(extract_result)
    // console.log(extract_result_json)
  
    const {companyName, jobAddress, jobTitle} = extract_result_json
    output = {companyName, jobAddress, jobTitle} 
    
  } catch (error) {
    myLogger.error('error during getting job info')
    myLogger.error(error.message)
    output = {companyName:'', jobAddress:"", jobTitle:""}
  }

  return output
}


function onReportJobComplete() {
    return new Promise(async (res, rej) => {
      try {
        myLogger.info('report job complete...');
        const { working_dir } = this.context;
        // myLogger.info(this.context);
        myLogger.info(working_dir);

        const {companyName, jobAddress, jobTitle} = await getJobInfo(working_dir)
//
// 
        var message = 
`
✔️ job email prepared in dir: ${working_dir} :

\`\`\`javascript
${JSON.stringify({companyName, jobAddress, jobTitle}, null, 2)}
\`\`\`
`.trim();
        await postTelegramMessage(message)

        res();
      } catch (error) {
        myLogger.error('error during report job complete...');
        myLogger.error(error.message);

        rej();
      }
    });
  }


module.exports = {onReportJobComplete}