const fetch = require('node-fetch');

var temp = {
  preprompts: [
    'Forget everything and start a new talk.',
    'I will input the summary of the position, please try to analyze it.\nPlease try your best to make a summary in less than 100 words.',
    {
      reply:
        "Endeavour Search Limited is currently seeking an Automation Hardware Engineer (AI Lab Solution) for a global life science intelligent innovation firm located in the Shatin Area. The company is a world-leading biotechnology/genome listed firm with a strong focus on research and development and intelligent innovation in the fields of medicine, agriculture, and healthcare. The position was posted on August 3, 2023.\nThe responsibilities of the role include:\n\nDesigning the hardware of the product based on the overall technical plan, ensuring it meets specifications.\nHandling hardware circuit design, including key component design, schematic function design, and PCB layout design.\nGuiding engineers in completing schematic detailed design, PCB wiring design, and hardware detailed design.\nReviewing hardware design documents and reports to ensure reliability.\nAssisting software and hardware engineers in debugging and problem-solving.\nDemonstrating good communication skills, teamwork, and the ability to train engineers.\nCompleting other tasks assigned by superiors.\n\nThe requirements for the position are:\n\nA master's degree or above in Electrical and Automation, Software Engineering, Communication and Information Engineering, or related fields.\nOver 3 years of experience in hardware development, including project management.\nAbility to independently handle hardware system design, device selection, and interface design.\nProficiency in analog and digital circuit design, including experience in hardware product development, safety regulations, and EMC debugging.\nCompetence in schematic function design, detailed design, PCB layout and wiring guidance, and testing validation.\nFamiliarity with embedded hardware development and hardware circuit design software such as Cadence, CAM350, PADS, and AD.\nExperience in developing stepper motor/servo motor control boards and driver boards is preferred.\nGood personality, communication skills, and a proactive attitude towards hardware system development.\n\nInterested candidates are encouraged to share their CV to gloria(a)endeavourasia.com or call 3956 1829 for further discussion. Non-local and IANG candidates are welcome to apply.",
      md_reply: [],
    },
  ],
  question_list: [
    'Can you draft me a cover letter ? Thanks. \nPlease try to make it in less than 200 words.\nPlease output it in markdown format.\nPlease output email content only.',
  ],
  callback_url: 'http://flow-handler:3000/jobsdb_draft_email_cb',
};

const payload = temp;

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
