const { getAddedLink } = require('../../util/getAddedLink');

const message = [
  '(into)       "/hk/en/job/actuarial-intern-valuation-2024-jan-jun-100003010532402?token=0~c7001e72-05f1-43f0-a9e0-ed4ded06b90f§ionRank=25&jobId=jobsdb-hk-job-100003010532402"',
  '(added)       "/hk/en/job/actuarial-intern-valuation-2024-jan-jun-100003010532402?token=0~c7001e72-05f1-43f0-a9e0-ed4ded06b90f§ionRank=25&jobId=jobsdb-hk-job-100003010532402"',
  '(added)       "/hk/en/job/actuarial-intern-valuation-2024-jan-jun-100003010532402"',
  '(into)         "/hk/en/job/job-job-job-11111111508987",\n',
  '(into)         "/hk/en/job/automation-hardware-engineer-ai-lab-508987-100003010505170"',
  '(into)         "/hk/en/job/automation-hardware-engineer-ai-lab-508987-100003010505170'
];

var result = getAddedLink(message);

console.log({ result });
