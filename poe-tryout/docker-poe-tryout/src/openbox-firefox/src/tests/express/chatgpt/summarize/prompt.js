const PREAMBLE = ``;
const END_WITH_YES = `If you understand, no need to reply me details. Reply me with "YES" only.`;

const helloworld_louis_paragraph = () =>
  `
Louis is a boy.
Louis eat apple.
`
    .trim()
    .replace(/\n/g, '');

const post_hardware_engineer_sample = () =>
  `
Senior Engineer - Electronics
Computime Ltd
Shatin Area
Posted on 24-Jul-23
Senior Engineer - Electronics
Computime Ltd
Job Highlights

Listed Global Company in Hong Kong
5-Day Work Week, Excellent Career Development Path

    Group Medical, Double Pay & Year-End Bonus

Job Description

Major Responsibilities

    Design and develop wireless consumer/industrial electronic products
    Prepare schematic and conduct subsystem circuit design
    Prepare subsystem test plan, perform design validation and draft test report
`
    .trim()
    .replace(/\n\n  /g, '\n');

// Requirements
//     Bachelor's degree in Electronics Engineering
//     At least 3 years’ experience
//     Knowledge in circuit design theory and circuit simulation
//     Knowledge in any of the following disciplines:
//         Antenna and transmission line
//         RF subsystems, e.g. WiFi, BLE, Zigbee, ZWave, LTE
//         Display and touch panel technology
//         Power electronics, motor control theory (e.g. AC motor, Brushless motor)
//         AC/DC conversion, DC/DC conversion, battery charging, wireless charging
//         Well know the requirement of regulatory test
//     Good command of spoken Cantonese, English and Putonghua
//     Strong problem solving skills, quick learner and good team player
// Interested parties, please apply together with a detailed resume, stating current and expected salary, and send it via APPLY NOW.  Attractive remuneration will be offered in commensurate with qualification and experience.
// All personal information received will be treated in strict confidence for employment purpose only.  Your application can be considered as unsuccessful if you have not been reached within 3 months.  On the other hand, it may be transferred to other companies of our group for job openings.  Unsuccessful applications will be destroyed for a period not more than 12 months.

const post_medical_sample = () =>
  `
Validation Assistant
SYNCO(H.K.) Ltd
Tai Po Area
Posted on 28 - Jul - 23
Job Highlights

DSE / F.5 or above
GMP
Tai Po

Job Description

Responsibilities:

Perform routine process validation sampling and testing activities with reference to approved protocol.
Ensures the process validation sampling activities are conducted on a timely manner.
Work closely with cross functional departments(i.e., Production / QA / QC).
Assists in ad - hoc task assigned by supervisor.

  Qualifications:

DSE / F.5 or above in Engineering / Pharmaceutical / Food / Chemistry or related discipline.
Knowledge of MS Office(Excel and Word).
Preferably but not required to have knowledge of GMP and other regulatory requirements.
Good command of spoken and written Chinese and English.
  Hardworking, cooperative, self - motivated and willing to learn.
Willing to work overtime.
Fresh graduates are also welcome

We offer attractive remuneration package including medical scheme, discretionary year - end bonus etc.Interested parties please send full resume with salary expectation and availability by click "Apply Now".Only shortlisted candidates will be interviewed.

  Synco(H.K.) Ltd is an Equal Opportunities Employer.Personal data provided by job applicants will be used strictly in accordance with our personal data policy and for recruitment purposes only.We aim to respond to successful applicants within 8 weeks and related information will be kept in our file for up to 12 months for other suitable vacancies in our organization and thereafter destroyed. 
`.trim();

const TASK_DESCRIPTION = () =>
  `
Please,
you will understand and help me to summarize text I inputted.
`.trim();

function helloworld() {
  console.log('helloworld from prompt');
  return 'helloworld';
}

module.exports = {
  helloworld,
  post_medical_sample,
  post_hardware_engineer_sample,
  TASK_DESCRIPTION,
  END_WITH_YES,
  helloworld_louis_paragraph,
};
