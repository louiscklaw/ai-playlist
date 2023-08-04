const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const restify = require('express-restify-mongoose');
const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(methodOverride());

mongoose.connect('mongodb://mongo:27017/database');

restify.serve(
  router,
  mongoose.model(
    'JobPost',
    new mongoose.Schema({
      job_link: { type: String, required: true },
      position: { type: String },
      description: { type: String },
      state: { type: String, required: true },
      chatgpt_summarize_res_json: {
        json_input: {
          jobs_id: { type: String },
          question_list: [String]
        },
        chat_history: {
          q_and_a: {
            session_id: { type: String },
          },
          history: [{
            question: { type: String },
            answer: { type: String }
          }]
        }
      }
    }, { timestamps: true }),
  ),
);

app.use(router);

var PORT = 3001;

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
