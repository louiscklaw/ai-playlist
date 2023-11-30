// TODO: remove me
// const puppeteer = require('puppeteer-extra');
// const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
// puppeteer.use(AdblockerPlugin({ blockTrackers: true }));
// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// puppeteer.use(StealthPlugin());
// require('dotenv').config();
// const { SRC_ROOT, UTILS_ROOT, WORKER_ROOT } = require('../../config');
// const { chatGPTSolver, testLanding } = require(`${WORKER_ROOT}/poe/chatGPT`);

const { myLogger } = require('../../utils/myLogger');
const { checkInput } = require('./checkInput');
const { reportOffline } = require('../../utils/reportPoeSeatOffline');
const { DONE, ERROR, ASK_INIT, ASK_DONE, NO_QUESTION_FOUND, QUESTION_LIST_NOT_FOUND } = require('../../constants');

const { chatGPTSolver, testLanding } = require('../../worker/poe/chatGPT');


module.exports = (router) =>{
  router.post('/ask', async (req, res) => {
    var json_input = req.body;
    var output = {
      state: ASK_INIT,
      input: json_input,
      error: '',
      chat_history: { q_and_a: { preprompts: [], history: [] } },
    };
  
    try {
      console.log(json_input)
      
      checkInput(json_input);
  
      var { question_list, preprompts } = json_input;
      // res.send(question_list)
      // TODO: check using schema
      if (!question_list) throw new Error(QUESTION_LIST_NOT_FOUND);
      if (question_list?.length < 1) throw new Error(NO_QUESTION_FOUND);
      // NOTE: question list valid after this line
  
      var temp_history = await chatGPTSolver(question_list, preprompts);
      var { state, preprompts, history } = temp_history;
      if (state != 'done') throw new Error('error during ask ChatGPT');
  
      output = {
        ...output,
        state: ASK_DONE,
        json_input,
        chat_history: { q_and_a: { preprompts, history } },
      };
    } catch (error) {
      myLogger.error(JSON.stringify(error));
      output = { ...output, state: ERROR, error: JSON.stringify(error) };

      reportOffline();

      console.log(error);
      throw error;
    }
  
    res.send(output);
  });
};
