const fetch = require('node-fetch');
const { myLogger } = require('../../utils/myLogger');
var jobDescription =
  'Responsibilities:\n\n\n\n\n\n\n\n Perform routine process validation sampling and testing activities with reference to approved protocol.\n\n\n\n\n\n\n\n Ensures the process validation sampling activities are conducted on a timely manner.\n\n\n\n\n\n\n\n Work closely with cross functional departments (i.e., Production/ QA/ QC).\n\n\n\n\n\n\n\n Assists in ad-hoc task assigned by supervisor.\nQualifications:\n\n\n\n\n\n\n\n DSE/ F.5 or above in Engineering/ Pharmaceutical/ Food/ Chemistry or related discipline.\n\n\n\n\n\n\n\n Knowledge of MS Office (Excel and Word).\n\n\n\n\n\n\n\n Preferably but not required to have knowledge of GMP and other regulatory requirements.\n\n\n\n\n\n\n\n Good command of spoken and written Chinese and English.\n\n\n\n\n\n\n\n Hardworking, cooperative, self-motivated and willing to learn.\n\n\n\n\n\n\n\n Willing to work overtime.\n \n \n \n \nFresh graduates are also welcomeWe offer attractive remuneration package including medical scheme, discretionary year-end bonus etc. Interested parties please send\nfull resume\nwith\nsalary expectation\nand\navailability\nby click "Apply Now". Only shortlisted candidates will be interviewed.Synco (H.K.) Ltd\nis an Equal Opportunities Employer. Personal data provided by job applicants will be used strictly in accordance with our personal data policy and for recruitment purposes only. We aim to respond to successful applicants within 8 weeks and related information will be kept in our file for up to 12 months for other suitable vacancies in our organization and thereafter destroyed.\n';

// jobDescription = jobDescription.replace(/\n+/g, '\n');
jobDescription = jobDescription.replace(/\n +/g, ' ');
jobDescription = jobDescription.replace(/\n\n+/g, '\n');

const body = {
  preprompts: [
    'Hi, please help to understand the text below',
    `title: Validation Assistant,
company name: SYNCO (H.K.) Ltd,
company address: Tai Po Area,
post date: 4-Aug-2023,
job highlight: DSE / F.5 or above, GMP, Tai Po,
description: ${jobDescription}
`.trim(),
  ],
  question_list: ['What is the title of the job ?'],
  callback_url: 'http://poe-scheduler-api:3002/done',
};

Array(1)
  .fill(0)
  .forEach(async (v, i) => {
    myLogger.info(`posting ask ${i}...`);

    const url = 'http://poe-scheduler-api:3002/ask_jobsdb_post';
    // const url = 'http://poe-scheduler-api:3002/helloworld';
    const response = await fetch(url, {
      method: 'post',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });

    const res_json = await response.json();
    myLogger.info('%o', { res_json });
  });
