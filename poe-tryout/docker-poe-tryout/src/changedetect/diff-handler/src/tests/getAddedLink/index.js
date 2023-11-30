const { getAddedLink } = require('../../utils/getAddedLink');



const message = [
  '(into)       "/hk/en/job/actuarial-intern-valuation-2024-jan-jun-100003010532402?token=0~c7001e72-05f1-43f0-a9e0-ed4ded06b90f§ionRank=25&jobId=jobsdb-hk-job-100003010532402"',
  '(added)       "/hk/en/job/actuarial-intern-valuation-2024-jan-jun-100003010532402?token=0~c7001e72-05f1-43f0-a9e0-ed4ded06b90f§ionRank=25&jobId=jobsdb-hk-job-100003010532402"',
  '(added)       "/hk/en/job/actuarial-intern-valuation-2024-jan-jun-100003010532402"',
  '(into)         "/hk/en/job/job-job-job-11111111508987",\n',
  '(into)         "/hk/en/job/automation-hardware-engineer-ai-lab-508987-100003010505170"',
  '(into)         "/hk/en/job/automation-hardware-engineer-ai-lab-508987-100003010505170',
  '(added)       /hk/en/job/actuarial-intern-valuation-2024-jan-jun-100003010532402',
  '(added)       /hk/en/job/software-automation-qa-engineer%7C-multimedia-100003010533122',
  '(added)       "/hk/en/job/software-automation-qa-engineer%7C-multimedia-100003010533122"',
  '(added)       https://www.glassdoor.com.hk/partner/jobListing.htm?pos=101&ao=1136043&s=58&guid=0000018a69a82afabc45c691bdb2fcc1&src=GD_JOB_AD&t=SR&vt=w&cs=1_a913ff4e&cb=1693989743651&jobListingId=1008854149947&jrtk=5-pdx1-0-1h9kqgaqekolh800-6a9ea41df3db5659',
  '(added)       https://www.glassdoor.com.hk/partner/jobListing.htm?pos=101&ao=1136043&s=58&guid=0019472381741082730947812',
];

// '(added)       "https11://www.glassdoor.com.hk/partner/jobListing.htm?pos=101&ao=1136043&s=58&guid=0000018a69a82afabc45c691bdb2fcc1&src=GD_JOB_AD&t=SR&vt=w&cs=1_a913ff4e&cb=1693989743651&jobListingId=1008854149947&jrtk=5-pdx1-0-1h9kqgaqekolh800-6a9ea41df3db5659\n"'

var result = getAddedLink(message);

console.log({ result });
