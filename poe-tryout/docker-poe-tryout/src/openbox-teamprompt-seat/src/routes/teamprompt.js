const express = require('express');
// const { teampromptSolver } = require('../worker/teamprompt/helloworld');
const { ask } = require('../worker/teamprompt/ask');

const router = express.Router();

router.post('/ask', async (req, res) => {
  var req_body = req.body;
  var { question } = req_body;

  // teampromptSolver("1+10");
  var gpt_reply = await ask(question);

  //   console.log({ req_body });

  res.send({ gpt_reply });
});

router.get('/helloworld', (req, res) => {
  res.send('openbox-teamprompt-seat, Hello World!');
});

module.exports = router;
