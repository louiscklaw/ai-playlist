const fetch = require('node-fetch');

require('./prepare');

// NOTE: expecting calling from poe-scheduler to flow-handler

const payload = {
  state: 'ASK_DONE',
  json_input: {
    preprompts: [
      'Forget everything and start a new talk.',
      'I will input the summary of the position, please try to analyze it.\nPlease try to make your summary in less than 100 words.',
      "Job Summary:\nForex Forest Limited, a FinTech company based in Tsim Sha Tsui, is seeking a high-caliber QA Engineer (Automation) to join their R&D team. The position involves supporting FinTech projects in both Hong Kong and Singapore. The company offers an innovative and creative work culture, business expansion opportunities, and a range of benefits including 14 days of annual leave, education subsidies, and bonuses. The working hours are from 10 am to 6 pm.\nJob Description:\nThe QA Engineer (Automation) will be responsible for ensuring that the company's products meet specified quality requirements. This includes creating and optimizing start of production procedures and control plans. The role involves conducting UAT (User Acceptance Testing) for mobile apps, web-based applications, and systems. The QA Engineer will also perform various stages of testing, such as unit tests, integration tests, system tests, and load tests. Additionally, they will plan and implement system automation for improved efficiency. Participation in the planning, design, and testing phases of application development is expected.\nRequirements:\nCandidates should possess a Bachelor's degree or above in Computer Science, Information Technology, or related disciplines. Experience in testing web-based and mobile applications platforms is required. Previous experience in preparing test cases and test plans is advantageous. Knowledge of software test design and testing methodologies is a plus. The ability to think from different perspectives and systematically draft test cases according to user experience journeys is valued. Strong communication skills in both verbal and written English and Cantonese are required, with fluency in Mandarin being an advantage.\nAdditional Qualities:\nThe ideal candidate should have excellent communication and interpersonal skills to interact with stakeholders from diverse backgrounds, including clients, vendors, partners, and offshore teams. Being proactive in learning new technologies and possessing analytical, organizational, and problem-solving skills are important. Adaptability to changing priorities and the ability to work independently as well as part of a team are highly desirable.\nNote: Personal data collected during the recruitment process will be kept confidential and used solely for recruitment purposes. Unsuccessful applications will be retained for a maximum of 24 months.",
    ],
    question_list: ['can you draft me a cover letter ? Thanks. \nplease try to make it in less than 100 words'],
  },
  chat_history: {
    q_and_a: {
      preprompts: [
        {
          question: 'Forget everything and start a new talk.',
          answer:
            "Certainly! Let's start a new conversation. What would you like to talk about? It can be anything you're interested in or curious about.",
        },
        {
          question:
            'I will input the summary of the position, please try to analyze it.\nPlease try to make your summary in less than 100 words.',
          answer:
            "Certainly! Please provide me with the position's summary, and I'll do my best to analyze it and provide a summary in less than 100 words.",
        },
        {
          question:
            "Job Summary:\nForex Forest Limited, a FinTech company based in Tsim Sha Tsui, is seeking a high-caliber QA Engineer (Automation) to join their R&D team. The position involves supporting FinTech projects in both Hong Kong and Singapore. The company offers an innovative and creative work culture, business expansion opportunities, and a range of benefits including 14 days of annual leave, education subsidies, and bonuses. The working hours are from 10 am to 6 pm.\nJob Description:\nThe QA Engineer (Automation) will be responsible for ensuring that the company's products meet specified quality requirements. This includes creating and optimizing start of production procedures and control plans. The role involves conducting UAT (User Acceptance Testing) for mobile apps, web-based applications, and systems. The QA Engineer will also perform various stages of testing, such as unit tests, integration tests, system tests, and load tests. Additionally, they will plan and implement system automation for improved efficiency. Participation in the planning, design, and testing phases of application development is expected.\nRequirements:\nCandidates should possess a Bachelor's degree or above in Computer Science, Information Technology, or related disciplines. Experience in testing web-based and mobile applications platforms is required. Previous experience in preparing test cases and test plans is advantageous. Knowledge of software test design and testing methodologies is a plus. The ability to think from different perspectives and systematically draft test cases according to user experience journeys is valued. Strong communication skills in both verbal and written English and Cantonese are required, with fluency in Mandarin being an advantage.\nAdditional Qualities:\nThe ideal candidate should have excellent communication and interpersonal skills to interact with stakeholders from diverse backgrounds, including clients, vendors, partners, and offshore teams. Being proactive in learning new technologies and possessing analytical, organizational, and problem-solving skills are important. Adaptability to changing priorities and the ability to work independently as well as part of a team are highly desirable.\nNote: Personal data collected during the recruitment process will be kept confidential and used solely for recruitment purposes. Unsuccessful applications will be retained for a maximum of 24 months.",
          answer:
            'Analysis and Summary:\nForex Forest Limited, a FinTech company in Tsim Sha Tsui, is hiring a QA Engineer (Automation) to join their R&D team. The role involves supporting FinTech projects in Hong Kong and Singapore. The company offers a creative work culture, growth opportunities, and benefits like annual leave, education subsidies, and bonuses. The QA Engineer will ensure product quality, conduct various tests, and implement system automation. Candidates need a degree in Computer Science or related fields, experience in testing web and mobile applications, and knowledge of testing methodologies. Strong communication, problem-solving, and teamwork skills are crucial.',
        },
      ],
      history: [
        {
          question: 'can you draft me a cover letter ? Thanks. \nplease try to make it in less than 100 words',
          answer:
            "Dear Hiring Manager,\nI am writing to express my keen interest in the QA Engineer (Automation) position at Forex Forest Limited. With a strong background in testing web and mobile applications, I am confident in my ability to ensure top-quality products. My expertise in creating test cases, conducting various tests, and implementing system automation aligns perfectly with the requirements of the role. I am a proactive learner, possess excellent communication skills, and thrive both independently and as part of a team. I am excited about the opportunity to contribute to Forex Forest Limited's innovative projects. Thank you for considering my application.\nSincerely,\n[Your Name]",
        },
      ],
    },
  },
  working_dir: '/share/100003010533674',
};

Array(1)
  .fill(0)
  .forEach(async (v, i) => {
    console.log(`posting ask ${i}...`);

    // prepare meta json for test
    // /share/100003010533674/meta.json

    const response = await fetch('http://flow-handler:3000/jobsdb_draft_email_cb', {
      method: 'post',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    });

    console.log(await response.json());

    // const res_json = await response.json();
    // console.log({ res_json });
    console.log('helloworld');
  });

console.log('done');
