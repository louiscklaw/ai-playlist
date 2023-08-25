class SummaryPrompts {
  constructor(a) {
    this.a = a;
  }

  getSampleQuestions() {
    return [
      `
can you draft me a cover letter ? Thanks. 
please try to make it in less than 100 words
`.trim(),
    ];
  }

  getSamplePreprompts() {
    return [
      'Forget everything and start a new talk.',
      `
I will input the summary of the position, please try to analyze it.
Please try to make your summary in less than 100 words. 
No need to reply me in detail.
`.trim(),
      this.a,
    ];
  }
}

module.exports = SummaryPrompts;
