const { postHelloworld } = require('../../../fetch/postHelloworld');
const { poeSchedulerHellworld, poeProcessNewJobPost } = require('../../../utils/fetchOpenboxSeat');

module.exports = {
  onAskPoe: function () {
    return new Promise(async (res, rej) => {
      // poe-scheduler-api
      const result = await poeProcessNewJobPost({
        jobs_id: 'blablabla',
        question_list: ["say 'hello 1' to me", "say 'hello 2' to me", "say 'hello 3' to me"],
        callback_url: 'http://flow-handler:3000/jobsdb_flow_poe_callback',
      });
      const res_json = await result.json();
      console.log({ res_json });

      console.log('asking poe, ');
      // console.log({ context });
      res();
    });
  },
  onAskPoeDone: function () {
    return new Promise(async (res, rej) => {
      console.log('ask poe done, post_id:' + this.context.post_id);
      res();
    });
  },
};
