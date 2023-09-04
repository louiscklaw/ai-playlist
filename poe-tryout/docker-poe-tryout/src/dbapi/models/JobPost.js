const mongoose = require('mongoose');

module.exports = mongoose.model(
  'JobPost',
  new mongoose.Schema(
    {
      job_link: { type: String, required: true },
      position: { type: String },
      description: { type: String },
      state: { type: String, required: true },
      chatgpt_summarize_res_json: {
        json_input: {
          jobs_id: { type: String },
          question_list: [String],
        },
        chat_history: {
          q_and_a: {
            session_id: { type: String },
          },
          history: [
            {
              question: { type: String },
              answer: { type: String },
            },
          ],
        },
      },
    },
    {
      collection: 'job-post',
      timestamps: true,
    },
  ),
);
