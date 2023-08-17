const fetch = require('node-fetch');

const body = {
  jobs_id: 'blablabla',
  job_post: 'we are employing a teacher',
  preprompts: ['we are employing a teacher, understand ?'],
  question_list: ['what is the post employing?'],
};

// 'https://hk.jobsdb.com/hk/en/job/validation-assistant-100003010509868'
// http://flow-handler:3005/jobsdb_flow_poe_callback

Array(1)
  .fill(0)
  .forEach(async (v, i) => {
    console.log(`posting ask ${i}...`);

    const response = await fetch('http://flow-handler:3000/jobsdb_flow_poe_callback', {
      method: 'post',
      body: JSON.stringify({
        state: 'ASK_DONE',
        json_input: {
          jobs_id: 'blablabla',
          preprompts: ['Summarze the below text for me.'],
          question_list: ['Louis is a boy.\nLouis eat apple.\nLouis is a good guy.'],
        },
        chat_history: {
          q_and_a: {
            session_id: 'blablabla',
            history: [
              {
                question: 'Louis is a boy.\nLouis eat apple.\nLouis is a good guy.',
                answer: 'Louis is a good boy who eats apples.',
              },
            ],
          },
        },
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    const res_json = await response.json();
    console.log({ res_json });
  });

console.log('done');
