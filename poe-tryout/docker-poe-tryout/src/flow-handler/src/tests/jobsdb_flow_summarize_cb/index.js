const fetch = require('node-fetch');

// NOTE: simulate the response from poe-scheduler

var payload = {
  "state": "ASK_DONE",
  "input": {
    "preprompts": ["Forget everything and start a new talk."],
    "question_list": [
      "I will pass you a job advertisement, \nplease try to summarize it in around 200 words.",
      "company name: CL Technical Services Ltd.\njob title: Application Support (VBA / JavaScript, over $40K, Multiple vacancies)\njob addess: Cheung Sha Wan\npost date: Posted 19 hours ago\njob highlight: Cheung Sha WanJavaScript / MYSQL / VBA /Government Project\n\njob description (markdown):\n```\n<p>Job Description:</p>\n\n- To provide technical support for the full implementation and rollout\n\n- To assist in coordinating with department regarding the rollout schedule, customization and preparation work\n\n- To assist in coordinating with users, contractors, project stakeholders and other related parties for the implementation of system and its deployment to department\n\n- To develop test cases and conduct UAT\n\n- To assist in reviewing project deliverables\n\n- To maintain and support system encryption module\n\n<p>Requirement Details:</p>\n\n- Higher Diploma or above\n\n- At least have 2 years’ experience in IT experience\n\n- Experience in client software deployment tool for Windows operating system such as ZenWorks\n\n- Experience in using Visual Basic for Applications / MySQL to validate the data and format in Excel spreadsheet\n\n- Priority will be given to candidate who is willing to learn and proactive, possesses  analytical, problem solving, communication and inter-personal skills\n```"
    ]
  },
  "error": "",
  "chat_history": {
    "q_and_a": {
      "preprompts": [
        {
          "question": "Forget everything and start a new talk.",
          "answer": "Sure! Let's start a new conversation. What topic or question would you like to discuss?"
        }
      ],
      "history": [
        {
          "question": "I will pass you a job advertisement, \nplease try to summarize it in around 200 words.",
          "answer": "Certainly! Please provide me with the job advertisement, and I'll do my best to summarize it for you within approximately 200 words."
        },
        {
          "question": "company name: CL Technical Services Ltd.\njob title: Application Support (VBA / JavaScript, over $40K, Multiple vacancies)\njob addess: Cheung Sha Wan\npost date: Posted 19 hours ago\njob highlight: Cheung Sha WanJavaScript / MYSQL / VBA /Government Project\n\njob description (markdown):\n```\n<p>Job Description:</p>\n\n- To provide technical support for the full implementation and rollout\n\n- To assist in coordinating with department regarding the rollout schedule, customization and preparation work\n\n- To assist in coordinating with users, contractors, project stakeholders and other related parties for the implementation of system and its deployment to department\n\n- To develop test cases and conduct UAT\n\n- To assist in reviewing project deliverables\n\n- To maintain and support system encryption module\n\n<p>Requirement Details:</p>\n\n- Higher Diploma or above\n\n- At least have 2 years’ experience in IT experience\n\n- Experience in client software deployment tool for Windows operating system such as ZenWorks\n\n- Experience in using Visual Basic for Applications / MySQL to validate the data and format in Excel spreadsheet\n\n- Priority will be given to candidate who is willing to learn and proactive, possesses  analytical, problem solving, communication and inter-personal skills\n```",
          "answer": "CL Technical Services Ltd. is currently seeking candidates for the position of Application Support, offering a salary of over $40,000. The job is located in Cheung Sha Wan, and there are multiple vacancies available. The job advertisement was posted 19 hours ago.\nThe main highlights of the job include working with JavaScript, MySQL, VBA (Visual Basic for Applications), and participating in a government project. The successful candidate will be responsible for providing technical support throughout the implementation and rollout process. This involves coordinating with various departments, users, contractors, and project stakeholders. The role also includes developing test cases, conducting user acceptance testing (UAT), reviewing project deliverables, and maintaining the system's encryption module.\nThe requirements for the position include a Higher Diploma or above and a minimum of 2 years of IT experience. Candidates should have experience with client software deployment tools for Windows operating systems, such as ZenWorks. Proficiency in using Visual Basic for Applications and MySQL to validate data and format Excel spreadsheets is also necessary. Preference will be given to candidates who demonstrate a willingness to learn, are proactive, and possess strong analytical, problem-solving, communication, and interpersonal skills.\nOverall, CL Technical Services Ltd. is seeking qualified individuals to join their team as Application Support professionals, contributing to a government project and utilizing their technical expertise in VBA, JavaScript, MySQL, and more."
        }
      ]
    }
  },
  "json_input": {
    "preprompts": ["Forget everything and start a new talk."],
    "question_list": [
      "I will pass you a job advertisement, \nplease try to summarize it in around 200 words.",
      "company name: CL Technical Services Ltd.\njob title: Application Support (VBA / JavaScript, over $40K, Multiple vacancies)\njob addess: Cheung Sha Wan\npost date: Posted 19 hours ago\njob highlight: Cheung Sha WanJavaScript / MYSQL / VBA /Government Project\n\njob description (markdown):\n```\n<p>Job Description:</p>\n\n- To provide technical support for the full implementation and rollout\n\n- To assist in coordinating with department regarding the rollout schedule, customization and preparation work\n\n- To assist in coordinating with users, contractors, project stakeholders and other related parties for the implementation of system and its deployment to department\n\n- To develop test cases and conduct UAT\n\n- To assist in reviewing project deliverables\n\n- To maintain and support system encryption module\n\n<p>Requirement Details:</p>\n\n- Higher Diploma or above\n\n- At least have 2 years’ experience in IT experience\n\n- Experience in client software deployment tool for Windows operating system such as ZenWorks\n\n- Experience in using Visual Basic for Applications / MySQL to validate the data and format in Excel spreadsheet\n\n- Priority will be given to candidate who is willing to learn and proactive, possesses  analytical, problem solving, communication and inter-personal skills\n```"
    ]
  },
  "working_dir": "/share/100003010564679"
}


Array(1)
  .fill(0)
  .forEach(async (v, i) => {
    console.log(`posting ask ${i}...`);

    const response = await fetch('http://flow-handler:3000/jobsdb_flow_summarize_cb', {
      method: 'post',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    });

    console.log(await response.text());

    // const res_json = await response.json();
    // console.log({ res_json });
    console.log('helloworld');
  });

console.log('done');
