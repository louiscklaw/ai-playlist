const fetch = require('node-fetch');

const SAMPLE_PREPROMPTS = [
  "Forget everything and start a new talk.",
  "I will input the summary of the position, please try to analyze it.\nPlease try your best to make a summary in less than 100 words.",
  "Job Summary:\nEndeavour Search Limited is a global life science intelligent innovation firm seeking an Automation Hardware Engineer for their AI Lab Solution. This position is located in the Shatin Area. The company is a leading biotechnology/genome listed firm with a focus on research and development (R&D) and intelligent innovation across various industries. They provide clinical gene sequencers, medical imaging, laboratory automation, and technical support.\nResponsibilities:\n\nResponsible for the hardware design of the product, ensuring adherence to specifications and the overall technical plan.\nDesign hardware circuits, including key components, schematic functions, and PCB layout.\nGuide engineers in completing schematic design, PCB wiring, and hardware detailed design.\nReview hardware design documents and reports to ensure reliability.\nAssist in software and hardware debugging and problem-solving.\nPossess good communication skills, team awareness, and the ability to train engineers.\nComplete assigned tasks from superiors.\n\nRequirements:\n\nMaster's degree or above in Electrical and Automation, Software Engineering, Communication and Information Engineering, or related fields.\nMinimum 3 years of hardware development experience with project management exposure.\nProficiency in analog and digital circuit design, including experience in safety regulations and EMC debugging.\nCompetence in schematic design, PCB layout, wiring guidance, and testing validation.\nFamiliarity with embedded hardware development and hardware circuit design software (Cadence, CAM350, PADS, AD).\nPreferred experience in developing stepper motor/servo motor control boards and driver boards.\nGood personality, communication skills, and the ability to collaborate effectively.\nProactive and passionate about hardware system development.\n\nInterested candidates can share their CV to gloria(a)endeavourasia.com or call 3956 1829 for further discussion.\nPlease note that the above summary has been condensed and may not include all the details mentioned in the original job advertisement.",
];

const SAMPLE_QUESTIONS = [
`
Can you draft me a cover letter ? Thanks. \n
Please try to make it in less than 200 words.\n
Please output it in markdown format.\n
Please output email content only.
`
];

const payload = {
  preprompts: SAMPLE_PREPROMPTS,
  question_list: SAMPLE_QUESTIONS,
  callback_url: 'http://flow-handler:3000/jobsdb_draft_email_cb',
};

// NOTE: expecting calling from poe-scheduler to flow-handler

Array(1)
  .fill(0)
  .forEach(async (v, i) => {
    console.log(`posting ask ${i}...`);

    const response = await fetch('http://flow-handler:3000/jobsdb_draft_email', {
      method: 'post',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    });

    console.log(await response.json());

  });

console.log('done');
