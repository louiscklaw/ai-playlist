const { CVTemplate } = require('../../../../../state_machine/jobsdb/onPoeDraftEmailDone/CVTemplate');
const { writeEmail } = require('../../../../../state_machine/jobsdb/onPoeDraftEmailDone/writeEmail');

// writeEmail('/share/testing', 'hello email content')
(async () => {
  await writeEmail('/share/testing', 'hello email content');
  await writeEmail('/share/testing', CVTemplate('company name ?'));
})();
