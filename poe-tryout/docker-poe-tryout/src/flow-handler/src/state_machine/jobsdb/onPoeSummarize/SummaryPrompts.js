

class SummaryPrompts {
  constructor(job_summary) {
    this.job_summary = job_summary;

    if (Object.keys(job_summary,'reply')>-1){
      this.job_summary = job_summary.reply;
    }
  }

  getSampleQuestions() {
    return [
      `
Can you draft me a cover letter ? Thanks. 
Please try to make it in less than 200 words.
Please output it in markdown format.
Please output email content only.
`.trim(),
    ];
  }

  getSamplePreprompts() {
    return [
      'Forget everything and start a new talk.',
      `
I will input the summary of the position, please try to analyze it.
Please try your best to make a summary in less than 100 words. 
`.trim(),
      this.job_summary,
    ];
  }
}

module.exports = SummaryPrompts;
