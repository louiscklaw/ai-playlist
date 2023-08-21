const fetch = require('node-fetch');

const { myLogger } = require('../../utils/myLogger');

const body = {
  jobs_id: 'blablabla',
  job_post: 'we are employing a teacher',
  preprompts: ['we are employing a teacher, understand ?'],
  question_list: ['what is the post employing?'],
};

Array(1)
  .fill(0)
  .forEach(async (v, i) => {
    myLogger.info(`hw-telegram page-handler ${i}...`);

    const response = await fetch('http://page-handler:3000/hw-telegram');

    const res_text = await response.text();
    myLogger.info('%o', { res_text });
  });

console.log('hw-telegram');
