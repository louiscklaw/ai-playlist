const fetch = require('node-fetch');

const body = {
  jobs_id: 'blablabla',
  job_post: 'we are employing a teacher',
  preprompts: ['we are employing a teacher, understand ?'],
  question_list: ['what is the post employing?'],
};

Array(1)
  .fill(0)
  .forEach(async (v, i) => {
    console.log(`telegram-send-message page-handler ${i}...`);

    const response = await fetch('http://page-handler:3000/telegram-send-message');

    const res_text = await response.text();
    console.log({ res_text });
  });
