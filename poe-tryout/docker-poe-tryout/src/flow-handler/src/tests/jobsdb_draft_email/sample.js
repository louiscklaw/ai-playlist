
const SAMPLE_PREPROMPTS = [
    'Forget everything and start a new talk.',
    `
  I will input the summary of the position, 
  can you draft me a cover letter ? 
  Please try to make your summary in less than 100 words.
  `.trim(),
    `
  Louislabs company is hiring a validation engineer. 
  The key responsibilities include assisting in planning and executing qualification and validation activities, 
  as well as preparing qualification protocols and reports for production equipment, facilities, and utilities. 
  The desired qualification is a bachelor's degree in Engineering, Pharmaceutical, or a related science discipline, 
  and fresh graduates are welcome to apply.
  `.trim(),
  ];
  
  const SAMPLE_QUESTIONS = [
  `
  Please help to draft a email describing where do you live. in less than 50 words.\n
  Please try to output it in Markdown format.
  `
  ];

module.exports = {SAMPLE_PREPROMPTS, SAMPLE_QUESTIONS}